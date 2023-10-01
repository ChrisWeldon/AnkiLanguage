import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

import Link from 'next/link'
import { DeckModel, DeckType } from "@/models/Deck";
import { UserModel } from '@/models/User';
import DeckPreviewCard from "./DeckPreviewCard";
import dbConnect from '@/lib/dbConnect';


export default async function DeckList(props:{ }){
    DeckModel
    await dbConnect()
    
    // TODO: make generic the data access functions

    // TODO: try using getSession(req) hook
    //
    const session = await getServerSession(authOptions)

    if(session === null){
        // No decks as guest user
        return (
            <ul className="
                flex
                flex-col
                font-thin
                flex-1
                ">
            </ul>
        )
    }

    let decks = []
    if(session!==null && session.user!=null && session.user.email != null){
        const user = UserModel.findOne( {email: session.user.email} )
        if(user!==null){
            const doc = await user.populate('decks')
            decks = doc && doc.decks ? doc.decks : []
        }
    } 

    let cards = decks.map((deck: DeckType) => {
        return <DeckPreviewCard
                    key={deck.value}
                    title={deck.title}
                    value={deck.value}
                    inlang={deck.inlang}
                    outlang={deck.outlang}
                    cardcount={deck.translations.length}
                />
    });

    return (
        <ul className="
            flex-1
            flex
            flex-col
            font-thin

            ">
           {cards}
        </ul>
    )
}
