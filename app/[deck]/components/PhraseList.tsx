'use server'
import Phrase from './Phrase'
import AddCard from './AddCard'
import DeleteButton from './DeleteButton';
import { DeckType } from '@/models/Deck';

async function getDeck(deckid: string): Promise<DeckType>{
    const deck = await fetch(`http://127.0.0.1:3000/api/deck/?deck=${deckid}`);
    if(!deck.ok){
        throw new Error("Decks Fetch Failed")
    }
    return deck.json();
}


export default async function PhraseList(
    props:{
        deck: string,
        user: string
    }
){
    
    const deck = await getDeck(props.deck);
    
    if(deck===null || deck.translations === undefined){
        return <div> Deck does not exists </div>

    }

    // TODO fix any should be TranslationType
    //
    let cards = deck.translations.map((translation: any, i: number) =>{
        return <Phrase key={translation._id}
                user={props.user}
                deck={props.deck}
                { ...translation }>
                    <DeleteButton 
                        deleteURL={`http://localhost:3000/api/deck/?deck=${props.deck}`}
                        payload={{
                            _id:translation._id
                        }}/>
                </Phrase>
    })

    console.log(cards)

    return (
        <ul className="justify-self-center flex flex-col-reverse self-stretch font-thin text-xl">
            {cards}
        </ul>
    )
}
