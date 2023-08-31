import dbConnect from '../../../../../../../lib/dbConnect'
import { Types } from 'mongoose'
import { TranslationModel, DBTranslation} from '../../../../../../../models/Translation'
import { DeckModel, DeckType } from '../../../../../../../models/Deck'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'


type MessageReponse = {
    message: string,
    err?: string | undefined
}

export async function GET(req: NextRequest): Promise<NextResponse<DBTranslation[] | DBTranslation | MessageReponse>>{
    await dbConnect()
    
    // 63c1833f1ea4c45599badc9f example

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

    const request = await req.json()
    const body = await request.body

    var deck : DeckType | null = null
    if(req.nextUrl.searchParams.has('deck') && req.nextUrl.searchParams.get('deck') != null){
        deck = await DeckModel.findOne( {value: req.nextUrl.searchParams.get('deck')})
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

    const request = await req.json()
    const body = await request.body

    if(body._id === null){
        return NextResponse.json({message: 'id required for deletion'}, {status: 400})
    }

    const deleted = await TranslationModel.deleteOne({_id: body._id})
    return NextResponse.json( { message: 'Deleted'}, {status: 200})
}

