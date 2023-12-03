import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User} from '@/app/lib/definitions';
import {endpoints} from '@/app/lib/globals'
import bcrypt from 'bcrypt';
import {Session} from 'next-auth';

async function getUser(email: string ): Promise<User | undefined> {
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
    providers: [
      Credentials({
        name: 'credentials',
        credentials: {
          email: { label: 'Email', type: 'email' , placeholder: ""},
          password: { label: 'Password', type: 'password' , placeholder: ""},
        },
        async authorize(credentials) {
            console.log("authorizing")
              const { email , password} = credentials as {email: string, password: string};
              const user = await getUser(email);
              console.log(user);
              if (!user) return null;
              console.log(user.password);
              if (user.password == password) return user;
          
          console.log('Invalid credentials');
          return null;
          },
      }),
    ],
    secret : process.env.NEXTAUTH_SECRET,
    debug : process.env.NODE_ENV === "development",

  } ) ;

export const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}
