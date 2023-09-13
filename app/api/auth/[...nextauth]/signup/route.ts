
import { Types } from 'mongoose'
import { UserModel, UserType } from "@/models/User"
import { NextResponse, NextRequest } from "next/server"

import urlConvert from "@/lib/helpers/urlConvert"
import dbConnect from "@/lib/dbConnect"

// Make one type in file
type MessageResponse = {
    message?: string,
    error?: string 
}

export async function POST(req: NextRequest): Promise<NextResponse<UserType | MessageResponse>> {
    UserModel // Forces compilation of model
    await dbConnect()

    if(!req.body){
        return NextResponse.json({error: 'Body Empty'}, {status: 400})
    }

    const body = await req.json()

    // Check email not already used
    // Check email is valid address
    // Sent verification email


    if(urlConvert(body.title)==="new-deck"){
        return NextResponse.json({ error: `Deck with title ${body.title.trim()} not allowed.` }, {status: 403 })
    }
    
    if(urlConvert(body.title)===""){
        return NextResponse.json({ error: `Deck with empty title not allowed.` }, {status: 403})
    }

    var user = await UserModel.findOne( {email: session.user.email})

    if(user===null){
        return NextResponse.json({ error: "This User no longer exists"}, {status: 500})
    }

    const new_user = new UserModel({
        _id: new Types.ObjectId,
        email: body.email,
        username: body.username,
        password: body.password,
        decks:[]
    }) 

    try{
        const saved = await new_user.save();
        return NextResponse.json(saved, {status: 203})
    }catch(err){
        if(typeof err === "string"){
            return NextResponse.json({ error: err}, {status: 500})
        }
        else {
            return NextResponse.json({ error: "an error occured"}, {status: 500})
        }
    }

}

