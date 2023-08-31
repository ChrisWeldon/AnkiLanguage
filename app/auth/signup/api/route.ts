import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { UserModel }  from '@/models/User'
import dbConnect from '@/lib/dbConnect'
import { Types } from 'mongoose'

export async function POST(req : NextRequest){
    const formData = await req.formData()
    // TODO buildout
    // TODO zod validate

    // propbably want to authenticate first
    await dbConnect();


    // TODO verify email_v

    const user = new UserModel({
        _id: new Types.ObjectId,
        email: formData.get('email'),
        username: formData.get('username'),
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
