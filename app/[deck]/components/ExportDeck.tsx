'use client'

import { useSession } from "next-auth/react";


export default function ExportDeck(
    props: { // TODO replace with the type definition from translation library
        deck: string,
        user: string,
        article: string
    }
){
    const { data: session } = useSession()
    // TODO make export compiled on frontend 
    const fileLink = `http://localhost:3000/api/u/${props.user}/d/${props.deck}/file`;


    return (
        <a href={
            `${fileLink}?${new URLSearchParams({article: props.article})}`
            }
            className="border border-default rounded max-w-xs hover:border-hover"
        >
            Download Deck { session ? " as logged in" : "as guest"}
        </a>
   )
}
