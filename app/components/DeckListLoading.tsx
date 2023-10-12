import DeckPreviewCardLoading from "./DeckPreviewCardLoading";

export default function DeckListLoading(props:{ }){

    let cards =[]
    for(let i=0; i<5; ++i){

        cards.push(
            <DeckPreviewCardLoading i={i}/>
        )
    }

    return (
        <ul className="
            flex-1
            flex
            flex-col
            font-thin
            w-full

            ">
            {cards}
        </ul>
    )
}
