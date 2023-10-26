import { DeckType, DeckModel } from "@/models/Deck"
import { TranslationModel } from "@/models/Translation"
import dbConnect from "../dbConnect"
import { Session } from "next-auth"

async function getDeckByValueSession(value: string, session: Session) : Promise<DeckType>{
    DeckModel
    TranslationModel
    await dbConnect()
    

    let deck = null
    // verifying auth
    if(session.user!=null && session.user._id != null){
        const res = await DeckModel.findOne( {owner: session.user._id, value: value} )
        if(res!==null){
            deck = await res.populate('translations')
        }
    } 
    
    return deck
}

export default getDeckByValueSession
