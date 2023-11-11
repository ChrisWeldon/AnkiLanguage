import dbConnect from '@/lib/dbConnect'
import { DeckModel } from '@/models/Deck'
import { UserModel, UserType } from '@/models/User'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

type MessageResponse = {
    message?: string,
    error?: string 
}

export async function GET(req: NextRequest) : Promise<NextResponse<UserType | MessageResponse>> {
    DeckModel // Mongoose model needs reference to be compiled
    UserModel
    await dbConnect()

    // Not yet implemented in app directory yet
    //@ts-ignore
    const session = await getServerSession(authOptions)

    if(session === null){
        // No decks as guest user
        return NextResponse.json({message:"guest"})
    }

    
    if(session.user!=null && session.user.email != null){
        const user = await UserModel.findOne( {email: session.user.email} ).exec()
        if(user===null){
            return NextResponse.json({ error: 'Invalid Session'}, {status: 404})

        }
        const doc = await user.populate('decks')

        return NextResponse.json(doc, {status: 200});
    } 

    return NextResponse.json({error: 'Invalid Session'}, {status: 404})

}
