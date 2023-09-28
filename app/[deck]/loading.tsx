import { Suspense } from 'react'
import { redirect } from 'next/navigation'

import PhraseList from './components/PhraseList'
import DeckTitle from './components/DeckTitle'
import AddCard from './components/AddCard'
import ExportDeck from './components/ExportDeck'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import getDeckByValueSession from '@/lib/database/getDeckByValueSession'


export default function Loading({
    params
} : {
    params: {
        user: string,
        deck: string
    }
}) {


    // should make a request based on id from decktitel
    return (
    <div className="
        flex
        flex-col
        content-center
        h-full 
        lined
    ">
        <DeckTitle title={"Loading"} />

        <Suspense fallback={<p>Loading Addcard </p>}>
            <AddCard
                deck_id={_id} 
                user={params.user}
                inlang={deck.inlang}
                outlang={deck.outlang}
            />
        </Suspense>
        <div className="
            flex-1
            justify-self-center 
            justify-end
            self-stretch
            font-thin
            text-xl
        ">
            <h2 className=" separator h-24 text-base03 leading-loose text-5xl bg-app pb-2 text-light">
                Deck
            </h2>

            <Suspense fallback={<p>Loading...</p>}>
                {/* @ts-expect-error Server Component */}
                <PhraseList deck={params.deck} />
            </Suspense>
        </div>
        <ExportDeck deck={params.deck} user={params.user} article="is"/>
    </div>
    )
}
