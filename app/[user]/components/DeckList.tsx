import { DeckType } from "../../../models/Deck";
import DeckPreviewCard from "./DeckPreviewCard";
import Link from 'next/link'

async function getDecks(){
    const decks = await fetch('http://127.0.0.1:3000/api/u/chris/d/');
    if(!decks.ok){
        throw new Error("Decks Fetch Failed")
    }
    return decks.json();
}

export default async function DeckList(props:{
    user: string
}){
    let decks = await getDecks();
    let cards = decks.map((deck: DeckType) => {
        return <DeckPreviewCard key={deck.value} { ...deck }/>
    });

    return (
        <ul className=" border-r-2 flex flex-col p-2 m-2 font-thin text-2xl">
           {cards}
           <Link href={`/${props.user}/new-deck`}>New Deck</Link>
        </ul>
        
    )
}
