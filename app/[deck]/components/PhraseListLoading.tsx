import Phrase from './Phrase'
import AddCard from './AddCard'
import DeleteButton from './DeleteButton';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import getDeckByValueSession from '@/lib/database/getDeckByValueSession';
import { redirect } from 'next/navigation';
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
