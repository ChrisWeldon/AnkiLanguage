import Phrase from './Phrase'
import AddCard from './AddCard'
import DeleteButton from './DeleteButton';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import getDeckByValueSession from '@/lib/database/getDeckByValueSession';
import { redirect } from 'next/navigation';


export default async function PhraseList(
    props:{
        deck: string,
    }
){

    // ignoring this because it seems to be deeply seeded next-auth ts prob
    // TODO: Fix error
    /*@ts-ignore*/
    const session = await getServerSession(authOptions)

    if(session === null){
        redirect('/')
    }

    const deck = await getDeckByValueSession(props.deck, session)
    
    if(deck===null || deck.translations === undefined){
        return <div> Deck does not exist </div>
    }

    // TODO fix any should be TranslationType
    //
    let cards = deck.translations.map((translation: any, i: number) =>{
        return <Phrase 
                key={translation._id}
                input = { translation.input }
                target = { translation.target }
                >
                    <DeleteButton 
                        deleteURL={`http://localhost:3000/api/translations/?id=${translation._id}`}
                        />
                </Phrase>
    })


    return (
        <ul className="
            flex flex-col-reverse  
        ">
            {cards}
        </ul>
    )
}
