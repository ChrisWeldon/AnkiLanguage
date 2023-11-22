import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';  
import getDeckByValueSession from '@/lib/database/getDeckByValueSession';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';

import EditTitle from './components/EditTitle'
import DeleteDeck from './components/DeleteDeck'

export default async function EditDeckPage({
    params
} : {
    params: {
        user: string,
        deck: string
    }

}){

    // @ts-ignore
    const session = await getServerSession(authOptions) 

    if(session===null){
        return <p> no session </p>
    }
    
    const deck = await getDeckByValueSession(params.deck, session);

    if(deck===null){
        // User does not own a deck with this title
        redirect('/')
    }

    return (
        <div className="
            flex
            flex-col
            content-center
            h-full
        ">
            <h1 className='self-center font-extralight text-4xl'> Deck Settings </h1>

            <EditTitle deck={deck} />
            <DeleteDeck deck={deck} />
        </div>
    )
}
