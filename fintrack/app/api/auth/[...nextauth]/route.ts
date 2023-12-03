import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User} from '@/app/lib/definitions';
import {endpoints} from '@/app/lib/globals'
import bcrypt from 'bcrypt';



async function getUser(email: string): Promise<User | undefined> {
  console.log("trying to get user")
    try {
      const res = await fetch(endpoints.getUser+email)
      const user = await res.json();
      console.log(user);
      return user[0];
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }
export const authOptions = ({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (parsedCredentials.success){
            const { email, password } = parsedCredentials.data;
            const user = await getUser(email);
            console.log(user);
            if (!user) return null;
            console.log(user.password);
            if (user.password == password) return user;
        }
        console.log('Invalid credentials');
        return null;
        },
    }),
  ],
});

export const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}