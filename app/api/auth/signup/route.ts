import { Types } from 'mongoose'
import { UserModel, UserType } from "@/models/User"
import { NextResponse, NextRequest } from "next/server"
import { saltRounds } from '@/lib/auth'

import bcrypt from 'bcrypt'

import dbConnect from "@/lib/dbConnect"
import validatePassword from '@/lib/helpers/validatePassword'

// Make one type in file
type MessageResponse = {
    message?: string,
    error?: string 
}

export async function POST(req : NextRequest): Promise< NextResponse< UserType | MessageResponse > > {
    UserModel

    // probably want to authenticate first
    await dbConnect();

    if(!req.body){
       return NextResponse.json({error: 'Body Empty'}, {status: 400})
    }

    const body = await req.json()

    //TODO: Send verification email

    const veri : Array<UserType> = await UserModel.find({
        email: body.email
    }).exec()


    // Check email not already used
    if(veri.length>0){
        console.log(`Attempt to create ${body.email} failed. User already exists.`)
        return NextResponse.json({error: 'User with that email already exists'}, {status: 409, statusText: 'User with that email already exists'})
    }

    // Check password is valid
    if(!validatePassword(body.password)){
        console.log(`Attempt to create ${body.email} failed. Password invalid.`)
        return NextResponse.json({error: 'Password is invalid'}, {status: 422, statusText: 'Invalid Password'})
    }

    const password_hash = await bcrypt.hash(body.password, saltRounds)
    
    console.log(`Attempt to create ${body.email} Success.`)

    const user = new UserModel({
        _id: new Types.ObjectId,
        email: body.email,
        username: body.email,
        password: password_hash,
        decks: []
    })

    try{
        const saved = await user.save();
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

