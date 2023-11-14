import { getServerSession } from "next-auth"
import { authOptions } from '@/lib/auth'
import AuthHeader from "./AuthHeader"

import Link from 'next/link'

export default function LandingHeader(){

    // Get server session is not supported by route handlers

    return (
        <div className="
            flex 
            px-5 
            py-3 
            w-full
            
            h-36 
            flex-row 
            justify-between
            ">
            <div>
                <h1 className="text-4xl md:text-4xl lg:text-6xl text-base03 font-thin ">Anki Language</h1>
                <h2 className="collapse sm:visible"> Make Anki language decks fast</h2>
            </div>
            <AuthHeader/>
        </div>
    )
}
