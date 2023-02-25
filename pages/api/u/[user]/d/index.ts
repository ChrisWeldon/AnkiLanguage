import dbConnect from '../../../../../lib/dbConnect'
import { Types } from 'mongoose'
import { DeckModel, DeckType } from '../../../../../models/Deck'
import { TranslationModel } from '../../../../../models/Translation'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

type MessageResponse = {
    message?: string,
    error?: string 
}

const urlConvert = (title: string) => {
    return title.trim().replace(/\s+/g, '-').toLowerCase(); 
}



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeckType[] | DeckType | MessageResponse>
) {
    TranslationModel
    // propbably want to authenticate first
    await dbConnect();

    switch(req.method){
        case "POST": {
            // figure out a better way to worry about this
            if(urlConvert(req.body.title)==="new-deck"){
                res.status(400).json({ 
                    error: `Deck with title ${req.body.title.trim()} not allowed.`
                })
                break;
            }
            
            if(urlConvert(req.body.title)===""){
                res.status(400).json({ 
                    error: `Deck with empty title not allowed.`
                })
                break;
            }

            const deckCheck = await DeckModel.find({
                value: urlConvert(req.body.title.trim())
            }, 'value').exec()

            if(deckCheck.length>0){
                res.status(400).json({ message: `Deck with title ${req.body.title.trim()} exists.`})
                break;
            }

            const deck = new DeckModel({
                _id: new Types.ObjectId,
                title: req.body.title.trim(),
                value: urlConvert(req.body.title),
                inlang: req.body.inlang,
                outlang: req.body.outlang,
                translations: [],
            })

            try{
                const saved = await deck.save();
                res.status(203).send(saved);
            }catch(err){
                if(typeof err === "string"){
                    res.status(500).json({ error: err})
                }
                else{
                    res.status(500).json({ error: "an error occured"})
                }
            }

            break;
        }
        case "GET": {
            // 63c1833f1ea4c45599badc9f example
            const decks = await DeckModel.find()

            if(decks===null){
                res.status(403).send( {message: "No Decks in DB"} )
                break;
            }

            res.status(200).send(decks);
            break;
        }
        default: {
            res.status(405).send({ message: "Only GET and POST allowed on this route" })
            break;
        }
    }
}


