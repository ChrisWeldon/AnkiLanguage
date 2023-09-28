import { getServerSession } from "next-auth"
import { authOptions } from '@/lib/auth'
import AuthHeader from "./AuthHeader"

import Link from 'next/link'

export default function LandingHeader(){

    // Get server session is not supported by route handlers

    return (
        <div className="flex flex-row px-5 py-3 h-36 justify-between">
            <div>
                <h1 className="text-6xl text-base03 font-thin ">Anki Language</h1>
                <h2> Make Anki language decks fast</h2>
            </div>
            <AuthHeader/>
        </div>
    )
}
