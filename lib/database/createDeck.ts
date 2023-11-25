import { DeckModel } from "@/models/Deck"
import { UserModel } from "@/models/User"
import { Types } from 'mongoose'
import { TranslationModel } from "@/models/Translation"
import dbConnect from "../dbConnect"
import { authOptions } from "../auth"
import { getServerSession } from "next-auth"
import urlConvert from "../helpers/urlConvert"
import { LanguageCode } from "../ankitool/langs"

async function createDeck(title: string, inlang: LanguageCode, outlang: LanguageCode){
    DeckModel
    TranslationModel // Mongoose model needs reference to be compiled
    await dbConnect()

    //@ts-ignore
    const session = await getServerSession(authOptions)

    if(!session){
        throw 'No user session'
    }

    var user = await UserModel.findOne( {email: session.user.email})

    if(user===null){
        throw 'User does not exists'
    }


    if(await DeckModel.findOne( {owner: session.user._id, value: urlConvert(title)} )){
        throw 'Deck already exists'
    }

    const deck = new DeckModel({
        _id: new Types.ObjectId,
        title: title,
        value: urlConvert(title),
        inlang: inlang,
        outlang: outlang,
        translations: [],
        owner: session.user._id 
    }) 

    try{
        const saved = await deck.save();
        user.decks.push(saved._id);
        await user.save();
    }catch(err){
        if(typeof err === "string"){
            throw err
        }
        else {
            throw err
        }
    }
}

export default createDeck
