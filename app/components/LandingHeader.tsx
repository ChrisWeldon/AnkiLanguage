import { getServerSession } from "next-auth"
import { authOptions } from '@/lib/auth'

import Link from 'next/link'

export default async function LandingHeader(){

    // Get server session is not supported by route handlers
    const userdata = await getServerSession(authOptions)

    return (
        <div className="flex flex-row px-5 py-3 justify-between">
            <h1 className="text-5xl font-thin ">Anki Language</h1>
            <div className="flex flex-row space-x-2">
                {userdata ? 
                    <Link href='/api/auth/signout'>Signout { userdata.user.email } </Link> : 
                    <Link href='/auth/signin'>Sign In </Link> 
                }
                
            </div>
        </div>
    )
}
