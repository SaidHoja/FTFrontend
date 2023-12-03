import bcrypt from 'bcrypt'

import {endpoints} from '@/app/lib/globals'
import {NextResponse} from 'next/server'
export async function POST(request : Request, response: NextResponse){
    let body = await request.json();
    body = body.data;
    const {fname, lname, email, password} = body;
    console.log(body)
    if (!fname || !lname || !email || !password){
        return new NextResponse(
            "Please fill all fields",{status:400});
    }

    // add hashing later

    const addUser = await fetch (endpoints["signUp"], {method : "POST",   headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify(body)});

    return NextResponse.json(addUser);
}