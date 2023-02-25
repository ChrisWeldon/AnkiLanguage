'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import type { SyntheticEvent } from 'react';
import { DBTranslation } from '../../../../models/Translation';

import AddCardInput from "./AddCardInput";
import Result from "./Result";
import { LanguageCode } from '../../../../lib/ankitool/langs';


export default function AddCard(
    props: {
        deck: string,
        user: string,
        inlang: LanguageCode,
        outlang: LanguageCode
    }
){

    const [term, setTerm] = useState<string>("")
    const [results, setResults] = useState<DBTranslation[]>([])
    
    const [latestSearch, setLatestSearch] = useState<number>(0);

    const router = useRouter();

    const handleInputChange = (event: SyntheticEvent<{ value: string}>) => {
        let payload = {
            input: event.currentTarget.value,
            inlang: props.inlang,
            outlang: props.outlang
        }

        // NOTE: is this atomic???
        setLatestSearch(latestSearch+1)
        const id = latestSearch

        fetch("http://localhost:3000/api/t/", {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(payload)
        })
            .then((res)=>res.json())
            .then((res)=>{
                if(id >= latestSearch){
                    setResults(res)
                }
            })
            .catch(err =>console.error(err))

        if(event != undefined){
            setTerm(event.currentTarget.value);
        }
    }

    // this is a closure to for low level handling
    const handleResultSelect = (result: Translation) => {
        return (event: SyntheticEvent<{}>) => {
            fetch(`http://localhost:3000/api/u/${props.user}/d/${props.deck}/t/`, {
                cache: 'no-store',
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({...result})
            })
            .then((res)=>res.json())
            .then((res)=>{
                router.refresh()
                setTerm("")
                // FIXME: There is no guarentee that old results dont come in first
            })
            .catch(err =>console.error(err))
        }
    }



    let resultcards = results.map((result: Translation, i) =>
        <Result key={i}
            result={result}
            deck={props.deck}
            user={props.user}
            handleResultSelect={handleResultSelect}
            />
    )

    useEffect(() => {
    })


    return (
        <li className="flex flex-row h-48 mb-5 px-1 my-1 text-3xl justify-between mt-4">
            <div className="px-1 justify-self-start">
                <AddCardInput
                    term={term}
                    handleInputChange={handleInputChange}/>
            </div>
            <div className="px-1 justify-self-end">
                {resultcards}
            </div>
        </li>
    )
}
