import React from "react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from 'next/navigation'
import getDecksSession from "@/lib/database/getDecksSession"
 

export default async function Home() {

    // @ts-ignore
    const session = await getServerSession(authOptions)

    if(!session){
        redirect('/auth/signin')
    }
    
    let decks = await getDecksSession(session);

    if(decks.length == 0){
        redirect('/new-deck')
    }else(
        redirect(`/${decks[0].value}`)
    )

    return (
        <h5 className="text-3xl font-bold underline">

        </h5>
    )
}
