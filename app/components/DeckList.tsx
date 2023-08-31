import { DeckType } from "@/models/Deck";
import DeckPreviewCard from "./DeckPreviewCard";
import Link from 'next/link'

async function getDecks(){
    const decks = await fetch(`http://127.0.0.1:3000/api/deck/`);

    if(!decks.ok){
        throw new Error("Decks Fetch Failed")
    }
    return await decks.json()
}

export default async function DeckList(props:{ }){
    let decks = await getDecks();
    let cards = decks.map((deck: DeckType) => {
        return <DeckPreviewCard key={deck.value} { ...deck }/>
    });

    return (
        <ul className=" border-r-2 flex flex-col p-2 m-2 font-thin text-2xl">
           {cards}
           <Link href={`/new-deck`}>New Deck</Link>
        </ul>
        
    )
}
