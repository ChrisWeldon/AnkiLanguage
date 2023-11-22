'use client'

import { DeckModel, DeckType } from '@/models/Deck'; 
import IndexCard from "@/components/IndexCard"
import InputBar from "@/components/InputBar"
import SubmitButton from '@/components/SubmitButton';
import { deleteDeck } from '../actions';

import { useFormState } from 'react-dom'

export default function DeleteDeck({ deck }: { deck: DeckType }, ){


    const [state, formAction] = useFormState(deleteDeck, { message: null })
         
    return (
        <IndexCard 
            className={`
                w-full
                md:w-1/2
                m-2
                h-64
                z-100
            `} 
            title={<h1>Delete Deck</h1>}
        >
            {/*@ts-ignore form actions not fully supported here with TS*/}
            <form action={formAction}>
                <input type='hidden' name='deck_value' value={deck.value}/>
                <InputBar 
                    placeHolder={`type '${deck.value}' to delete`}
                />
                <SubmitButton/>
                <p> {state?.message} </p>
            </form>
        </IndexCard>
    )

}
