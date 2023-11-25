import PhraseLoading from './PhraseLoading';


export default function PhraseListLoading(){

    let cards =[]
    for(let i=0; i<9; ++i){
        cards.push(
            <PhraseLoading i={i}/>
        )
    }

    return (
        <ul className="
            flex flex-col-reverse  
        ">
            {/*Load Phrase Cards Here*/}
            {cards}
        </ul>
    )
}
