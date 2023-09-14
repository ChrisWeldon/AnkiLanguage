
import { Types } from 'mongoose'
import { UserModel, UserType } from "@/models/User"
import { NextResponse, NextRequest } from "next/server"
import validateEmail from '@/lib/helpers/validateEmail'

import dbConnect from "@/lib/dbConnect"

// Make one type in file
type MessageResponse = {
    message?: string,
    error?: string 
}

export async function POST(req : NextRequest): Promise< NextResponse< UserType | MessageResponse > > {
    UserModel

    // propbably want to authenticate first
    await dbConnect();

    if(!req.body){
       return NextResponse.json({error: 'Body Empty'}, {status: 400})
    }

    const body = await req.json()

    // Check email not already used
    // Check email is valid address
    // Send errors when it fails
    // Send verification email
    console.log(body)

    const veri : Array<UserType> = await UserModel.find({
        email: body.email
    }).exec()

    if(!validateEmail(email.body)){
        console.log(`Attempt to create ${body.email} failed. Invalid email address.`)
        return NextResponse.json({error: 'User with that email already exists'}, {status: 409, statusText: 'User with that email already exists'})

    }

    if(veri.length>0){
        console.log(`Attempt to create ${body.email} failed. User already exists.`)
        return NextResponse.json({error: 'User with that email already exists'}, {status: 409, statusText: 'User with that email already exists'})
    }


    const user = new UserModel({
        _id: new Types.ObjectId,
        email: body.email,
        username: body.email,
        password: body.password,
        decks: []
    })

    try{
        const saved = await user.save();
        console.log(saved)
        return NextResponse.json(saved);
    }catch(err){
        console.log(err)
        if(typeof err === "string"){
            return NextResponse.json({ error: err})
        }
        else{
            return NextResponse.json({ error: "an error occured"})
        }
    }


}

