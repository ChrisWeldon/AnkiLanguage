'use client'

import { useSession } from "next-auth/react"
import { SyntheticEvent, useState } from "react"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AuthHeader(){

    // Get server session is not supported by route handlers
    const { data: session, status  } = useSession()
    const router = useRouter()

    const [ signoutModal, setSignoutModal ] = useState(false) 

    const handleSignout = () => {
        signOut({redirect: false})
        router.refresh()
        router.push('/auth/signin')
    }

    if(status === 'authenticated' && session.user){
        return (
            <div className="flex flex-row py-2 items-start space-x-4">
            <p>Hello, {session.user.email}</p>
            <button onClick={()=>handleSignout()}><span className="underline">signout</span></button>
            </div>
        )

    }else if(status === 'loading'){
        return (
            <div className="flex flex-row py-2 items-start space-x-4">
                <div className="animate-pulse h-8 w-48 bg-base2 ">
                </div>
            </div>
        )
    }else{
        return (
            <div className="flex flex-row py-2 items-start space-x-4">
                <Link href='/auth/signin' className="underline">Sign in</Link>
            </div>
        )
    }

}
