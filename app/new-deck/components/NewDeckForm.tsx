"use client"

import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LanguageName, LanguageCode } from '@/lib/ankitool/langs'

type DeckForm = {
    decktitle: string,
    inlang: LanguageCode,
    outlang: LanguageCode,
    images: boolean
}

type FormOption = {
    value: LanguageCode,
    name: LanguageName
}

export default function NewDeckForm({}){

    const router = useRouter();
    const [message, setMessage] = useState("")

    const [form, setForm] = useState<DeckForm>({
        decktitle: "",
        inlang: "FR",
        outlang: "EN",
        images: false
    })

    const [loadingSubmit, setLoadingSubmit] = useState(false)

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

    const handleInputLangSelectChange = (e: SyntheticEvent<{value: string}>) => {
        setForm({...form, inlang: e.currentTarget.value as LanguageCode})
    }

    const handleTargetLangSelectChange = (e: SyntheticEvent<{value: string}>) => {
        setForm({...form, outlang: e.currentTarget.value as LanguageCode})
    }

    const handleTitleChange = (e: SyntheticEvent<{value:  string}>) => {
        setForm({...form, decktitle: e.currentTarget.value})
    }


    const handleSubmit = async (e: SyntheticEvent<{value: any}>) => { 
        e.preventDefault()
        setMessage("")
        setLoadingSubmit(true)
        const payload = {
            title: form.decktitle,
            inlang: form.inlang,
            outlang: form.outlang,
            include_images: form.images
        }
        const API_ADDRESS = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`/api/deck`, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(payload)
        })

        if(!res.ok){
            
            console.log(res)
            setForm({...form, decktitle: ""})
            // TODO: Throw message
        }
        if(res.status > 400){
            setMessage(res.statusText)
            return
        }
        
        const deck = await res.json()
        router.refresh()
        router.push(`/${deck.value}`)

    }

    return (
            <>
            <form className="flex flex-col w-full items-center">
                <input className={
                    `
                        h-16 
                        text-5xl 
                        w-1/2

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
                    value={form.decktitle}
                    defaultValue={`Untitled Deck`}
                    placeholder={'Untitled Deck'}
                    onChange={handleTitleChange}
                />
                <div className='h-16 mt-8 flex flex-row w-full items-end justify-around'>
                    <label>
                        <span className="text-3xl">Input Language</span> 
                        <select
                         name="inlang"
                         className='px-1 mx-2 text-violet bg-base2 transition-all hover:underline '
                         onChange={handleInputLangSelectChange}
                         defaultValue={"FR"}
                         value={form.inlang}>
                            {language_options}
                        </select>
                    </label>
                    <label>
                        <span className="text-3xl">Target Language</span> 
                        <select name="outlang"
                        className='px-1 mx-2 text-orange bg-base2 transition-all hover:underline '
                        onChange={handleTargetLangSelectChange}
                        defaultValue={"EN"}
                        value={form.outlang}>
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
                    onClick={handleSubmit}
                />
            </form>
            <br/>
            <br/>
            <p className='h-8'>{message}</p>
            </>

   )

}
