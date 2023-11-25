import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';  
import getDeckByValueSession from '@/lib/database/getDeckByValueSession';
import { redirect } from 'next/navigation';

import EditTitle from './components/EditTitle'
import DeleteTitle from './components/DeleteDeck'

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
            space-y-2
        ">
            <h1 className='self-center font-extralight text-4xl'> Deck Settings </h1>

            <EditTitle value={deck.value} title={deck.title} />
            <DeleteTitle value={deck.value} />
        </div>
    )
}
