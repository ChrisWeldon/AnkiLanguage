import dbConnect from "../dbConnect"
import { DeckModel, DeckType } from "@/models/Deck"
import { UserModel } from "@/models/User"
import { Session } from "next-auth"

export default async function getDecksSession(session: Session) : Promise<DeckType[]>{
    DeckModel

    await dbConnect()
    let decks: DeckType[] = []
    if(session!==null && session.user!=null && session.user.email != null){
        const user = UserModel.findOne( {email: session.user.email} )
        if(user!==null){
            const doc = await user.populate('decks')
            decks = doc && doc.decks ? doc.decks : []
        }
    } 
    return decks
}
