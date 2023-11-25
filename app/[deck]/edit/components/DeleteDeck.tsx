'use client'

import { useState } from 'react'
import IndexCard from "@/components/IndexCard"
import InputBar from "@/components/InputBar"
import SubmitButton from '@/components/SubmitButton';
import { deleteDeck } from '../actions';

import { useFormState, useFormStatus } from 'react-dom'

export default function DeleteDeck({ value } : { value: string}){

    // @ts-ignore
    const [state, formAction] = useFormState(deleteDeck, { message: null })
    const { pending} = useFormStatus()
         
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
                <input type='hidden' name='deck_value' value={value}/>
                <InputBar 
                    placeHolder={`type '${value}' to delete`}
                />
                <SubmitButton disabled={pending} className='text-red'>
                    {!pending? 'Delete':'Loading'}
                </SubmitButton>
                <p className='h-8'> {state?.message} </p>
            </form>
        </IndexCard>
    )

}
