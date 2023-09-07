import { Suspense } from 'react'

import PhraseList from './components/PhraseList'
import DeckTitle from './components/DeckTitle'
import AddCard from './components/AddCard'
import ExportDeck from './components/ExportDeck'

import { DeckType } from '@/models/Deck';

async function getDeck(deckid: string): Promise<DeckType>{
    const deck = await fetch(`http://127.0.0.1:3000/api/deck/?deck=${deckid}`,{
        cache: 'no-store'
    });
    if(!deck.ok){
        throw new Error("Decks Fetch Failed")
    }
    return deck.json();
}


export default async function DeckPage({
    params
} : {
    params: {
        user: string,
        deck: string
    }
}) {


    const deck = await getDeck(params.deck);
    if(deck===null){
        redirect('/')
    }

    const { title } = deck;
    // should make a request based on id from decktitel
    return (
    <div className="flex flex-col content-center" >
        <DeckTitle title={title} />

        <AddCard
            deck={params.deck} 
            user={params.user}
            inlang={deck.inlang}
            outlang={deck.outlang}
        />
        <Suspense fallback={<p>Loading...</p>}>
            {/* @ts-expect-error Server Component */}
            <PhraseList deck={params.deck} user={params.user}/>
        </Suspense>
        <ExportDeck deck={params.deck} user={params.user} article="is"/>
    </div>
    )
}
