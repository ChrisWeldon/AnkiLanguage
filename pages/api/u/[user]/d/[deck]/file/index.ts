import dbConnect from '../../../../../../../lib/dbConnect'
import { Deck } from '../../../../../../../lib/ankitool/'
import { getLanguage } from  '../../../../../../../lib/ankitool/langs'

import { DeckModel } from '../../../../../../../models/Deck'
import { DBTranslation, TranslationModel } from '../../../../../../../models/Translation'
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

type MessageReponse = {
    message: string,
    body?: any,
    err?: string | undefined
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MessageReponse>
) {
    // propbably want to authenticate first
    await dbConnect();

    TranslationModel

    switch(req.method){
        case "GET": {
            const deck = DeckModel.findOne({
                $or: [
                    {value: req.query.deck},
                ]
            })

            if(deck===null){
                res.status(403).send( {message: "Document not found"} )
                break;
            }

            const doc = await deck.populate('translations').orFail()

            // TODO: Validate input query as WordRequestOptions
            let inlang = getLanguage(doc.inlang)
            let outlang = getLanguage(doc.outlang)

            if (inlang === undefined || outlang === undefined){
                res.status(403).send({message: "Language code not defined"})
                break;
            }

            let options: WordRequestOptions = {
                input_lang: doc.inlang,
                target_lang: doc.outlang,
                deck_name: doc.title,
                opts: [
                    "speak",
                    "comp"
                ],
                article: req.query.article as ArticleCode
            }

            let apkg = Deck(options)

            const ANKI_OUTPUT_DIR = process.env.ANKI_OUTPUT_DIR
            if(ANKI_OUTPUT_DIR === undefined){
                res.status(500).send({message: "ANKI_OUTPUT_DIR not defined"})
                break;
            }

            doc.translations.forEach((translation: DBTranslation) => {
               apkg.addCard(translation) 
            });

            // User file management
            var filePath = "./public/deck.apkg"
            await apkg.export(filePath)

            const stat = fs.statSync(filePath)

            res.writeHead(200, {
                'Content-Type': 'application/apkg',
                'Content-Length': stat.size,
                'Content-Disposition': `attachment; filename=${options.deck_name}.apkg`
            })

            var downloadStream = fs.createReadStream(filePath)
            await new Promise(function(resolve){
                downloadStream.pipe(res)
                downloadStream.on('end', resolve)
            })
            break;
        }

        default: {
            res.status(500).send({message:"Only GET is supported for this route."})
            break;
        }
    }
}
