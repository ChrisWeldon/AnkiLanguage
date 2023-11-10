import dbConnect from '@/lib/dbConnect'
import { Deck } from '@/lib/ankitool/anki'
import { getLanguage } from  '@/lib/ankitool/langs'

import { DeckModel, DeckType } from '@/models/Deck'
import { DBTranslation, TranslationModel } from '@/models/Translation'
import { NextRequest, NextResponse } from 'next/server'

type MessageReponse = {
    message: string,
    body?: any,
    err?: string | undefined
}

export async function GET(req: NextRequest):  Promise< NextResponse<MessageReponse | string> >{
    await dbConnect();
    TranslationModel


    var deck : DeckType | null = null
    if(req.nextUrl.searchParams.has('deck_id') && req.nextUrl.searchParams.get('deck_id') != null){
        deck = await DeckModel.findOne({
            $or: [
                {_id: req.nextUrl.searchParams.get('deck_id') },
            ]
        })
    } 

    if(deck===null){
        return NextResponse.json({ message: 'No deck with that id'}, {status: 404})
    }

    const doc = await deck.populate('translations')




    // TODO: Validate input query as WordRequestOptions
    let inlang = getLanguage(doc.inlang)
    let outlang = getLanguage(doc.outlang)

    if (inlang === undefined || outlang === undefined){
        return NextResponse.json({ message: 'Language code not defined'}, {status: 403})
    }

    let article: ArticleCode = req.nextUrl.searchParams.has('article') ? 
        req.nextUrl.searchParams.get('article') as ArticleCode: 'is' as ArticleCode // default indefinit singular

    let options: WordRequestOptions = {
        input_lang: doc.inlang,
        target_lang: doc.outlang,
        deck_name: doc.title,
        opts: [
            "speak",
            "comp"
        ],
        article
    }

    let deckfile = Deck(options)

    const ANKI_OUTPUT_DIR = process.env.ANKI_OUTPUT_DIR
    if(ANKI_OUTPUT_DIR === undefined){
        return NextResponse.json({message: "ANKI_OUTPUT_DIR not defined"}, {status: 500})
    }

    // TODO: fix any typing 
    doc.translations.forEach((translation: any) => {
       deckfile.addCard(translation) 
    });


    return NextResponse.json({message: deckfile.txt()}, {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
//            'Content-Length': stat.size,
            'Content-Disposition': `attachment; filename=${options.deck_name}`
        }
    })

}
