import { getServerSession } from "next-auth"
import { authOptions } from '@/lib/auth'
import AuthHeader from "./AuthHeader"

import Link from 'next/link'

export default function LandingHeader(){

    // Get server session is not supported by route handlers

    return (
        <div className="
            flex 
            w-full
           
            flex-col 
            md:flex-row 

            md:justify-between
            md:h-36 

            px-5 
            py-3 
            ">
            <div className={``}>
                <h1 className="flex-1 text-4xl md:text-4xl lg:text-6xl text-base03 font-thin ">Anki Language</h1>
                <h2 className="h-fit "> Make Anki language decks fast</h2>
            </div>
            <AuthHeader/>
        </div>
    )
}
