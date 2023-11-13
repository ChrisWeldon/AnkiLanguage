import dbConnect from '@/lib/dbConnect'
import { Types } from 'mongoose'
import { TranslationModel, DBTranslation} from '@/models/Translation'
import { DeckModel, DeckType } from '@/models/Deck'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'


type MessageReponse = {
    message: string,
    err?: string | undefined
}

export async function GET(req: NextRequest): Promise<NextResponse<DBTranslation[] | DBTranslation | MessageReponse>>{
    await dbConnect()

    var deck : DeckType | null = null
    if(req.nextUrl.searchParams.has('deck') &&
       req.nextUrl.searchParams.get('deck') != null){
        
        let deckid = req.nextUrl.searchParams.get('deck')

        deck = await DeckModel.findOne({
            $or: [
                { value: deckid },
                { _id: deckid }
            ]
        })
    } 

    if(deck===null){
        return NextResponse.json({ message: 'No deck with that id'}, {status: 404})
    }

    if(deck===null){
        return NextResponse.json({ message: 'Document not found'}, {status: 404})
    }

    deck.populate('translations').then((doc: DeckType)=>{
        // Must check because the real type uses PopulatedDoc
        if(doc.translations == null || (doc.translations.length>0 && doc.translations[0] instanceof ObjectId)){
            throw new Error('Deck not populated properly')
        }
        return NextResponse.json(doc.translations as DBTranslation[], {status: 200})
    })

    return NextResponse.json({ message: 'An unknown server error has occured'}, {status: 500})
}


export async function POST(req: NextRequest): Promise<NextResponse<DBTranslation[] | DBTranslation | MessageReponse>>{

    // Ensuring compilation of the Models
    TranslationModel
    DeckModel

    const body = await req.json()

    var deck : DeckType | null = null
    if(req.nextUrl.searchParams.has('deck') && req.nextUrl.searchParams.get('deck') != null){
        deck = await DeckModel.findOne( {_id: req.nextUrl.searchParams.get('deck')})
    } 

    if(deck===null){
        return NextResponse.json({ message: 'No deck with that id'}, {status: 404})
    }

    // Perform validation and input cleaning
    const translation = new TranslationModel({
        _id: new Types.ObjectId,
        input: {
            ...body.input,
            _id:  new Types.ObjectId,
        },
        target: body.target
    })

    try{
        const saved = await translation.save();
        deck.translations.push(saved._id);
        await deck.save();
        return NextResponse.json(translation, {status: 202})

    }catch(err){
        console.error(err)
        if(typeof err === "string"){
            return NextResponse.json({ message: "an error occured", err}, { status: 500 })
        }
        else{
            return NextResponse.json({ message: "an error occured" }, { status: 500 })
        }
    }

}

export async function DELETE(req: NextRequest): Promise<NextResponse<DBTranslation[] | DBTranslation | MessageReponse>>{
    await dbConnect()

    if(req.nextUrl.searchParams.has('id') && req.nextUrl.searchParams.get('id') != null){
        const deleted = await TranslationModel.deleteOne({_id: req.nextUrl.searchParams.get('id') })
        return NextResponse.json( { message: 'Deleted' }, { status: 200, statusText: "Deleted" })
    }else{
        return NextResponse.json( { message: 'Could not be deleted' }, { status: 409, statusText: "Could not be deleted" })
    } 

}

