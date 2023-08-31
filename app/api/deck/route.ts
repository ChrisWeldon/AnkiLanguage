import dbConnect from '@/lib/dbConnect'
import { Types } from 'mongoose'
import { DeckModel, DeckType } from '@/models/Deck'
import { TranslationModel } from '@/models/Translation'
import { NextRequest, NextResponse } from 'next/server'

type MessageResponse = {
    message?: string,
    error?: string 
}

const urlConvert = (title: string) => {
    return title.trim().replace(/\s+/g, '-').toLowerCase(); 
}

export async function GET(req: NextRequest) : Promise<NextResponse<DeckType[] | DeckType | MessageResponse>> {
    TranslationModel // Mongoose model needs reference to be compiled
    await dbConnect()
    
    // 63c1833f1ea4c45599badc9f example
    
    // Client wants details on one deck
    if(req.nextUrl.searchParams.has('deck') && req.nextUrl.searchParams.get('deck') != null){
        const deck = DeckModel.findOne( {value: req.nextUrl.searchParams.get('deck')} )
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
    TranslationModel // Mongoose model needs reference to be compiled
    await dbConnect()
    // figure out a better way to worry about this
    //

    if(!req.body){
        return NextResponse.json({error: 'Body Empty'}, {status: 400})
    }

    // body is a streamable. Maybe if requests were larger we could do cool things with this.
    const request = await req.json()
    const body = await request.body

    if(urlConvert(body.title)==="new-deck"){
        return NextResponse.json({ error: `Deck with title ${body.title.trim()} not allowed.` }, {status: 403 })
    }
    
    if(urlConvert(body.title)===""){
        return NextResponse.json({ error: `Deck with empty title not allowed.` }, {status: 403})
    }

    const deckCheck = await DeckModel.find({
        value: urlConvert(body.title.trim())
    }, 'value').exec()

    if(deckCheck.length>0){
        return NextResponse.json({ message: `Deck with title ${body.title.trim()} exists.`})
    }

    const deck = new DeckModel({
        _id: new Types.ObjectId,
        title: body.title.trim(),
        value: urlConvert(body.title),
        inlang: body.inlang,
        outlang: body.outlang,
        translations: [],
    })

    try{
        const saved = await deck.save();
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

