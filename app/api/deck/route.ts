import dbConnect from '@/lib/dbConnect'
import { Types } from 'mongoose'
import { DeckModel, DeckType } from '@/models/Deck'
import { UserModel, UserType } from '@/models/User'
import { TranslationModel } from '@/models/Translation'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import urlConvert from '@/lib/helpers/urlConvert'
import { Session } from 'next-auth'

type MessageResponse = {
    message?: string,
    error?: string 
}


export async function GET(req: NextRequest) : Promise<NextResponse<DeckType[] | DeckType | MessageResponse>> {
    TranslationModel // Mongoose model needs reference to be compiled
    await dbConnect()

    const session = await getServerSession(authOptions)

    
    // Client wants details on one deck
    if(req.nextUrl.searchParams.has('deck') && req.nextUrl.searchParams.get('deck') != null){
        const deck = DeckModel.findOne( {_id: req.nextUrl.searchParams.get('deck')} )
        if(deck===null){
            return NextResponse.json({ error: 'No deck with that id'}, {status: 404})
        }
        const doc = await deck.populate('translations')
        return NextResponse.json(doc, {status: 200});
    } 

    // Client instead wants list of all decks
    const decks = await DeckModel.find()
    if(decks===null){
        return NextResponse.json({ error: 'No decks in DB'}, {status: 404})
    }

    return NextResponse.json(decks)
}


export async function POST(req: NextRequest): Promise<NextResponse<DeckType[] | DeckType | MessageResponse>> {
    // TODO use some sort of verification for body 
    DeckModel
    TranslationModel // Mongoose model needs reference to be compiled
    await dbConnect()
    // figure out a better way to worry about this
    //
    const session = await getServerSession(authOptions)

    if(!session){
        return NextResponse.json({error: 'No user session'}, {status: 403, statusText: "No User Logged In"})

    }

    if(!req.body){
        return NextResponse.json({error: 'Body Empty'}, {status: 400})
    }

    const body = await req.json()

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

    console.log(`CREATE DECK SESSION ID: ${JSON.stringify( session )}`)


    const deck = new DeckModel({
        _id: new Types.ObjectId,
        title: body.title.trim(),
        value: urlConvert(body.title),
        inlang: body.inlang,
        outlang: body.outlang,
        translations: [],
        owner: session?._id // idk this error, yes it is in next-auth.d.ts
    }) 

    try{
        const saved = await deck.save();
        user.decks.push(saved._id);
        await user.save();
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

