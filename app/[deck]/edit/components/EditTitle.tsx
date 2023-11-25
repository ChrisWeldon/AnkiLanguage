'use client'

import { DeckType } from '@/models/Deck'; 
import IndexCard from "@/components/IndexCard"
import InputBar from "@/components/InputBar"
import SubmitButton from '@/components/SubmitButton';
import { editTitle } from '../actions';

import { useFormState, useFormStatus } from 'react-dom'


export default function EditTitle({ title, value }: {title: string, value: string} ){

    // @ts-ignore
    const [state, formAction] = useFormState(editTitle, { message: null })
    const { pending } = useFormStatus()

    return (
        <IndexCard 
            className={`
                w-full
                md:w-1/2
                m-2
                h-64
                z-100
            `} 
            title={<h1>Change Title</h1>}
        >
            {/*@ts-ignore form actions not fully supported here with TS*/}
            <form action={formAction}>
                <input type='hidden' name='deck_value' value={value}/>
                <InputBar 
                    placeHolder={title}
                />
                <SubmitButton>
                    {pending ? 'Loading' : 'Submit'}
                </SubmitButton>
                <p className='h-8'>{state?.message}</p>
            </form>
        </IndexCard>
    )

}
