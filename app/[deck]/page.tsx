import { Suspense } from 'react'
import { redirect } from 'next/navigation'

import PhraseList from './components/PhraseList'
import PhraseListLoading from './components/PhraseListLoading'
import DeckTitle from './components/DeckTitle'
import AddCard from './components/AddCard'
import AddCardLoading from './components/AddCardLoading'
import ExportDeck from './components/ExportDeck'
import LanguageHeader from './components/LanguageHeader'


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

    // TODO: fix this
    // @ts-ignore
    const session = await getServerSession(authOptions) 

    if(session===null){
        return <p> no session </p>
    }
    
    const deck = await getDeckByValueSession(params.deck, session);

    if(deck===null){
        redirect('/')
    }

    const { title, _id } = deck;

    if(_id === undefined){
        redirect('/')
    }

    // should make a request based on id from decktitel
    return (
    <div className="
        flex
        flex-col
        content-center
        h-full 
        lined
    ">
        <DeckTitle title={title} />

        <Suspense fallback={<AddCardLoading />}>
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
            <LanguageHeader 
                inlang={deck.inlang} 
                outlang={deck.outlang} 
                deck_id={_id}
                deck_value={params.deck}
            />
            
            {/* TODO: CHANGE this to use deck OBJECTid*/}
            <Suspense fallback={<PhraseListLoading />}>
                {/* @ts-expect-error Server Component */}
                <PhraseList deck={params.deck} />
            </Suspense>
        </div>
        {/* TODO: CHANGE this to use deck OBJECTid*/}
    </div>
    )
}
