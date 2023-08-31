import dbConnect from '@/lib/dbConnect'
import { Deck } from '@/lib/ankitool/'
import { getLanguage } from  '@/lib/ankitool/langs'

import { DeckModel, DeckType } from '@/models/Deck'
import { DBTranslation, TranslationModel } from '@/models/Translation'
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import { NextRequest, NextResponse } from 'next/server'

type MessageReponse = {
    message: string,
    body?: any,
    err?: string | undefined
}

export async function GET(req: NextRequest):  Promise< NextResponse<MessageReponse> >{
    await dbConnect();
    TranslationModel

    // the double await is we handle the read-stream for now. 
    const request = await req.json()
    const body = await request.body

    
    var deck : DeckType | null = null
    if(req.nextUrl.searchParams.has('deck') && req.nextUrl.searchParams.get('deck') != null){
        deck = await DeckModel.findOne({
            $or: [
                {value: req.nextUrl.searchParams.get('deck') },
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

    let apkg = Deck(options)

    const ANKI_OUTPUT_DIR = process.env.ANKI_OUTPUT_DIR
    if(ANKI_OUTPUT_DIR === undefined){
        return NextResponse.json({message: "ANKI_OUTPUT_DIR not defined"}, {status: 500})
    }

    doc.translations.forEach((translation: DBTranslation) => {
       apkg.addCard(translation) 
    });

    // User file management
    var filePath = "./public/deck.apkg"
    await apkg.export(filePath)

    const stat = fs.statSync(filePath)




    //var downloadStream = fs.createReadStream(filePath)
    //await new Promise(function(resolve){
        //downloadStream.pipe(res)
        //downloadStream.on('end', resolve)
    //})

    return NextResponse.json({ message: "files not implemented yet" }, {
        status: 200,
        headers: {
            'Content-Type': 'application/apkg',
            'Content-Length': stat.size,
            'Content-Disposition': `attachment; filename=${options.deck_name}.apkg`
        }
    })

}
