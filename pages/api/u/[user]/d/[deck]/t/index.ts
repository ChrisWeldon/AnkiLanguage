import dbConnect from '../../../../../../../lib/dbConnect'
import { Types } from 'mongoose'
import { TranslationModel, DBTranslation} from '../../../../../../../models/Translation'
import { DeckModel, DeckType } from '../../../../../../../models/Deck'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'


type MessageReponse = {
    message: string,
    err?: string | undefined
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DBTranslation[] | DBTranslation | MessageReponse>
) {
    // propbably want to authenticate first
    await dbConnect();

    switch(req.method){
        case "POST": {
            const deck = await DeckModel.findOne({ value: req.query.deck })

            if(deck===null){
                res.status(403).send( {message: "Failed to find deck"} )
                break;
            }

            // Perform validation and input cleaning
            const translation = new TranslationModel({
                _id: new Types.ObjectId,
                input: {
                    ...req.body.input,
                    _id:  new Types.ObjectId,
                },
                target: req.body.target
            })

            try{
                const saved = await translation.save();
                deck.translations.push(saved._id);
                await deck.save(req);
                res.status(203).send(translation);
            }catch(err){
                console.error(err)
                if(typeof err === "string"){
                    res.status(500).json({ message: "an error occured", err})
                }
                else{
                    res.status(500).json({ message: "an error occured"})
                }
            }

            break;
        }
        case "GET": {
            // 63c1833f1ea4c45599badc9f example
            const deck = DeckModel.findOne({
                $or: [
                    {value: req.query.deck},
                    {_id: req.query.deck}
                ]
            })
            if(deck===null){
                res.status(403).send( {message: "Document not found"} )
                break;
            }
            deck.populate('translations').orFail().then((doc: DeckType)=>{
                // Must check because the real type uses PopulatedDoc
                if(doc.translations == null || (doc.translations.length>0 && doc.translations[0] instanceof ObjectId)){
                    throw new Error('Deck not populated properly')
                }
                res.status(200).json(doc.translations as DBTranslation[]);
            })
            break;
        }
        case "DELETE":{
            const deleted = await TranslationModel.deleteOne({_id: req.body._id})
            res.status(200).json({message:"Deleted"})

            break;
        }
        default: {
            res.status(405).send({ message: "only GET and POST allowed" })
            break;
        }
    }
}
