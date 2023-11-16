import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

import { DeckModel, DeckType } from "@/models/Deck";
import DeckPreviewCard from "./DeckPreviewCard";
import dbConnect from '@/lib/dbConnect';
import getDecksSession from '@/lib/database/getDecksSession';


export default async function DeckList(props:{ }){
    DeckModel
    await dbConnect()
    
    // TODO: make generic the data access functions

    // @ts-ignore
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

    let decks = await getDecksSession(session);

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

