import { getServerSession } from "next-auth"
import { authOptions } from '@/lib/auth'
import AuthHeader from "./AuthHeader"

import Link from 'next/link'

export default async function LandingHeader(){

    // Get server session is not supported by route handlers

    return (
        <div className="flex flex-row px-5 py-3 h-40 justify-between">
            <h1 className="text-5xl font-thin ">Anki Language</h1>
            <div className="flex flex-row space-x-2">
                <AuthHeader/>
            </div>
        </div>
    )
}
