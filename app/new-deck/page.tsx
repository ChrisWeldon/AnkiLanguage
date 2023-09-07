'use client';

import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LanguageName, LanguageCode } from '@/lib/ankitool/langs'
import { languages } from '@/lib/ankitool';

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

export default function NewDeck({ params }: {
    params: {
        user: string
    }
}){
    const router = useRouter();

    const [form, setForm] = useState<DeckForm>({
        decktitle: "",
        inlang: "FR",
        outlang: "EN",
        images: false
    })

    // TODO: get these from the language library. This may mean passing them serverprops style
    const languages: FormOption[] = [
        {value: "FR", name:"Français"},
        {value: "EN", name:"English"},
        {value: "DE", name:"Deutsch"},
    ]

    const language_options = languages.map(( el, key ) =>{
        return <option key={key} value={el.value}>{el.name}</option>
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
        const payload = {
            title: form.decktitle,
            inlang: form.inlang,
            outlang: form.outlang,
            include_images: form.images
        }
        const res = await fetch(`http://localhost:3000/api/u/${params.user}/d/`, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(payload)
        })

        if(!res.ok){
            throw new Error("Deck Creation failed")
            setForm({...form, decktitle: ""})
        }
        const deck = await res.json()
        router.refresh()
        router.push(`/${params.user}/${deck.value}`)

    }

    return (
        <div className="p-2 w-fit ">
            Create Deck
            <form className="flex flex-col ">
                <input name="deckname" type='text' value={form.decktitle} onChange={handleTitleChange}/>
                <label>
                    Input Language 
                    <select name="inlang"
                     onChange={handleInputLangSelectChange}
                     defaultValue={"FR"}
                     value={form.inlang}>
                        {language_options}
                    </select>
                </label>
                <label>
                    Target Language 
                    <select name="outlang"
                    onChange={handleTargetLangSelectChange}
                    defaultValue={"EN"}
                    value={form.outlang}>
                        {language_options}
                    </select>
                </label>
                <label>
                    Include Images 
                    <input name="images" type="checkbox"/>
                </label>
                
                <input type='submit' value="Done" onClick={handleSubmit}/>
            </form>
        </div>)
} 
