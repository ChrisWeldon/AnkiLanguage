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
        <ul className="justify-self-center flex flex-col-reverse self-stretch font-thin text-xl">
            {cards}
        </ul>
    )
}
