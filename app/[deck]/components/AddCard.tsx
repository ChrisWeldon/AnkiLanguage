'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import Error from 'next/error'
import type { SyntheticEvent } from 'react';
import { DBTranslation } from '@/models/Translation';

import AddCardInput from "./AddCardInput";
import Result from "./Result";
import { LanguageCode } from '@/lib/ankitool/langs';
import { ObjectId } from 'mongodb';
import Arrow from '@/icons/arrow';


export default function AddCard(
    props: {
        deck_id: ObjectId | undefined,
        user: string,
        inlang: LanguageCode,
        outlang: LanguageCode
    }
){

    const [term, setTerm] = useState<string>("")
    const [results, setResults] = useState<DBTranslation[]>([])
    
    const [latestSearch, setLatestSearch] = useState<number>(0);

    const [loadingResults, setLoadingResults] = useState<boolean>(false)

    const router = useRouter();

    const API_ADDRESS = typeof window === 'undefined' ? 
        process.env.API_ADDRESS_PRIVATE :
        process.env.NEXT_PUBLIC_API_ADDRESS_PUBLIC;

    if(API_ADDRESS === undefined){
        return <Error statusCode={500}/>;
    }

    const handleInputChange = (event: SyntheticEvent<{ value: string}>) => {
        // TODO: FIX DEBOUNCE PLS
        let payload = {
            input: event.currentTarget.value,
            inlang: props.inlang,
            outlang: props.outlang
        }

        // NOTE: is this atomic???
        setLatestSearch(latestSearch+1)
        const id = latestSearch

        setLoadingResults(true)

        fetch(`http://localhost:3000/api/targetsearch/`, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(payload)
        })
            .then((res)=>res.json())
            .then((res)=>{
                setLoadingResults(false)
                if(id >= latestSearch){
                    setResults(res)
                }
            })
            .catch((err) =>{
                    console.error(err)
                    setLoadingResults(false)
                }
            )

        if(event != undefined){
            setTerm(event.currentTarget.value);
        }
    }

    // this is a closure to for low level handling
    const handleResultSelect = (result: Translation) => {
        return (event: SyntheticEvent<{}>) => {
            fetch(`http://localhost:3000/api/translations/?deck=${props.deck_id}`, {
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
            deck_id={props.deck_id}
            user={props.user}
            handleResultSelect={handleResultSelect}
            />
    )


    return (
        <li className="flex flex-row h-64 px-1 text-3xl justify-between ">
            <div className="px-1 w-2/5 h-8 justify-self-start bg-app flex flex-row">
                <AddCardInput
                    term={term}
                    handleInputChange={handleInputChange}/>
                <div className={ loadingResults ? 'animate-tofro' : ''}>
                    <Arrow height={36} width={36}/>
                </div>
            </div>
            <div className="px-1 w-3/5  h-full justify-self-end">
                {resultcards}
            </div>
        </li>
    )
}
