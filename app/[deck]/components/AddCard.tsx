'use client'

import React, { useEffect, useState, useCallback} from 'react';
import { useRouter } from 'next/navigation'
import Error from 'next/error'
import type { SyntheticEvent } from 'react';
import { DBTranslation } from '@/models/Translation';

import AddCardInput from "./AddCardInput";
import Result from "./Result";
import { LanguageCode } from '@/lib/ankitool/langs';
import { ObjectId } from 'mongodb';
import Arrow from '@/icons/arrow';
import debounce from '@/lib/helpers/debounce';


export default function AddCard(
    props: {
        deck_id: ObjectId,
        user: string,
        inlang: LanguageCode,
        outlang: LanguageCode
    }
){

    const [term, setTerm] = useState<string>("")
    const [results, setResults] = useState<DBTranslation[]>([])
    

    const [loadingResults, setLoadingResults] = useState<boolean>(false)

    const router = useRouter();


    const fetchSearchResults = (input: string) => {
        let payload = {
            input,
            inlang: props.inlang,
            outlang: props.outlang
        }

        setLoadingResults(true)

        fetch(`/api/targetsearch/`, {
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
                setResults(res)
            })
            .catch((err) =>{
                    console.error(err)
                    setLoadingResults(false)
                }
            )
    }

    const fetchSearchResultsD = useCallback( debounce(fetchSearchResults, 150) , [])

    const handleInputChange = (event: SyntheticEvent<{ value: string }>) => {
        fetchSearchResultsD(event.currentTarget.value);
        setTerm(event.currentTarget.value)
    }

    // this is a closure to for low level handling
    const handleResultSelect = (result: Translation) => {
        return (event: SyntheticEvent<{}>) => {
            fetch(`/api/translations/?deck=${props.deck_id}`, {
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
        <li className="
            flex 
            flex-col
            md:flex-row
            h-64 px-1 
            text-3xl
            md:justify-between
        ">
            <div className="
                px-1 
                md:w-2/5
                h-8
                md:justify-self-start 
                bg-app
                flex 
                flex-row
                space-x-2">
                <AddCardInput
                    term={term}
                    handleInputChange={handleInputChange}/>
                <div className={`rotate-90 sm:rotate-0 ${loadingResults ? 'animate-tofro' : ''}`}>
                    <Arrow height={36} width={36}/>
                </div>
            </div>
            <div className="
                px-1 
                md:w-3/5  
                md:h-full 
                md:justify-self-end">
                {resultcards}
            </div>
        </li>
    )
}
