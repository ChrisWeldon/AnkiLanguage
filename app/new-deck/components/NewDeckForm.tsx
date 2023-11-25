"use client"

import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LanguageName, LanguageCode } from '@/lib/ankitool/langs'

import { useFormStatus, useFormState } from 'react-dom'
import { newDeck } from '../actions'


type FormOption = {
    value: LanguageCode,
    name: LanguageName
}

export default function NewDeckForm({}){

    const { pending } = useFormStatus()

    //@ts-ignore TS not ready
    const [ state, formAction ] = useFormState(newDeck, { message: null}) 


    // TODO: get these from the language library. This may mean passing them serverprops style
    const languages: FormOption[] = [
        {value: "FR", name:"Français"},
        {value: "EN", name:"English"},
        {value: "DE", name:"Deutsch"},
    ]

    const language_options = languages.map(( el, key ) =>{
        return (
            <option 
                className=''
                key={key}
                value={el.value}
            >
                {el.name}
            </option>
        )
    })



    return (
            <>
            {/*@ts-ignore TS not ready for server actions*/}
            <form action={formAction} className="flex flex-col w-full items-center">
                <input className={
                    `
                        h-16 
                        text-3xl
                        md:text-5xl 
                        w-full
                        md:w-1/2

                        bg-base3  border-b-2
                        border-base00 focus:bg-base2 outline-none
                        rounded-t-lg

                        pl-2
                        transition-all
                        ease-linear
                        duration-750
                        delay-0
                        bg-transparent
                        notebook-input
                        notebook-unfocused
                        hover:notebook-hover
                        focus:outline-none
                        focus:notebook-focused
                    `}
                    name="deckname"
                    type='text'
                    defaultValue={`Untitled Deck`}
                    placeholder={'Untitled Deck'}
                />
                <div className='h-16 mt-8 flex flex-row w-full items-end justify-around'>
                    <label>
                        <span className="
                            text-xl
                            md:text-3xl
                        ">Input Language</span> 
                        <select
                         name="inlang"
                         className='px-1 mx-2 text-violet bg-base2 transition-all hover:underline '
                         defaultValue={"FR"}
                         >
                            {language_options}
                        </select>
                    </label>
                    <label>
                        <span className="
                            text-xl
                            md:text-3xl
                        ">Target Language</span> 
                        <select name="outlang"
                        className='px-1 mx-2 text-orange bg-base2 transition-all hover:underline '
                        defaultValue={"EN"}
                        >
                            {language_options}
                        </select>
                    </label>
                </div>
                {/*<label>
                    Include Images 
                    <input name="images" type="checkbox" disabled/>
                </label>*/}
                
                <input 
                    className='
                        mt-16

                        rounded-xl
                        w-32
                        transition-all
                        ease-linear
                        duration-750
                        delay-0
                        bg-transparent
                        notebook-input
                        notebook-unfocused
                        text-green
                        hover:notebook-hover
                        hover:font-light
                        active:notebook-focused
                    '
                    type='submit'
                    value="Done"
                />
            </form>
            <br/>
            <br/>
            <p className='h-8'>{state?.message}</p>
            </>

   )

}
