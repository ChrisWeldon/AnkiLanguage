
import NewDeckForm from './components/NewDeckForm';

export default function NewDeck({ params }: {
    params: {
        user: string
    }
}){


    return (
        <div className='flex flex-col h-full lined'>
            <h2 className=" separator h-24 text-base03 leading-loose text-5xl bg-app pb-2 text-light">
                New Deck 
            </h2>
            <NewDeckForm />
        </div>
    )
} 
