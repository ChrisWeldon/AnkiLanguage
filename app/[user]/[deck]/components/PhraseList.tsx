'use server'
import Phrase from './Phrase'
import AddCard from './AddCard'
import DeleteButton from './DeleteButton';
import { DeckType } from '../../../../models/Deck';
import { warn } from 'console';

async function getDeck(deckid: string): Promise<DeckType>{
    const deck = await fetch(`http://127.0.0.1:3000/api/u/chris/d/${deckid}/`);
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
        return new Error("No deck exists with that ID")
    }

    // TODO fix any should be TranslationType
    let cards = deck.translations.map((translation: any) =>{
        return <Phrase key={translation._id}
                user={props.user}
                deck={props.deck}
                { ...translation }>
                    <DeleteButton 
                        deleteURL={`http://localhost:3000/api/u/${props.user}/d/${props.deck}/t`}
                        payload={{
                            _id:translation._id
                        }}/>
                </Phrase>
    })

    return (
        <ul className="justify-self-center flex flex-col-reverse self-stretch font-thin text-xl">
            {cards}
        </ul>
    )
}
