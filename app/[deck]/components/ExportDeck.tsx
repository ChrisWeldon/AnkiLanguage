'use client'

import { ObjectId } from "mongodb";
import Link from "next/link";
import fileDownload from "js-file-download";
import { useState } from 'react'


export default function ExportDeck(
    props: { // TODO replace with the type definition from translation library
        deck_id: ObjectId,
        article: string
        deck_value: string
    }
){
    

    // TODO make export compiled on frontend 
    const fileLink = `/api/file`;

    const handleButton = async () =>{
        let res = await fetch(
            `${fileLink}?${new URLSearchParams({article: props.article, deck_id:props.deck_id.toString()})}`
        , {cache: 'no-store'})

        let data = await res.json()

        //fileDownload(text.substr(1, text.length-2), 'example.txt')
        fileDownload(`${data.message}`, `${props.deck_value}.txt`)

    }

    return (
        <button
            onClick={()=>handleButton()}
            className="
                rounded-xl
                transition-all
                ease-linear
                duration-750
                delay-0
                bg-transparent
                px-2
                notebook-input
                notebook-unfocused
                hover:notebook-hover
            "
        >
            Export Deck
        </button>
   )
}
