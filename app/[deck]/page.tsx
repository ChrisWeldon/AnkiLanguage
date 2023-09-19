import { Suspense } from 'react'
import { redirect } from 'next/navigation'

import PhraseList from './components/PhraseList'
import DeckTitle from './components/DeckTitle'
import AddCard from './components/AddCard'
import ExportDeck from './components/ExportDeck'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import getDeckByValueSession from '@/lib/database/getDeckByValueSession'


export default async function DeckPage({
    params
} : {
    params: {
        user: string,
        deck: string
    }
}) {

    const session = await getServerSession(authOptions) 

    if(session===null){
        return <p> no session </p>
    }
    
    const deck = await getDeckByValueSession(params.deck, session);

    if(deck===null){
        redirect('/')
    }

    const { title, _id } = deck;

    // should make a request based on id from decktitel
    return (
    <div className="flex flex-col content-center" >
        <DeckTitle title={title} />

        <AddCard
            deck_id={_id} 
            user={params.user}
            inlang={deck.inlang}
            outlang={deck.outlang}
        />
        <Suspense fallback={<p>Loading...</p>}>
            {/* @ts-expect-error Server Component */}
            <PhraseList deck={params.deck} />
        </Suspense>
        <ExportDeck deck={params.deck} user={params.user} article="is"/>
    </div>
    )
}
