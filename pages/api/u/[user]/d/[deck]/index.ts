import dbConnect from '../../../../../../lib/dbConnect'
import { Types } from 'mongoose'
import { DeckModel, DeckType} from '../../../../../../models/Deck'
import { TranslationModel } from '../../../../../../models/Translation'
import type { NextApiRequest, NextApiResponse } from 'next'


type MessageResponse = {
    message: string,
    err?: string
}


// Consider duplicating this object into the server side objects


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeckType | MessageResponse>
) {
    // TS compiler removes reference to TranslationModel thus never generating model
    TranslationModel

    // propbably want to authenticate first
    await dbConnect();

    switch(req.method){
        case "GET": {
            const deck = DeckModel.findOne( {value: req.query.deck} )

            if(deck===null){
                res.status(403).send( {message: "Document not found"} )
                break;
            }

            const doc = await deck.populate('translations')
            res.status(200).json(doc);
            break;
        }
        default: {
            res.status(405).send({ message: "GET allowed" })
            break;
        }
    }

}
