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
        return <button onClick={()=>handleSignout()}> Signout of {session.user.email}</button>
    }else if(status === 'loading'){
        return <p> Loading ... </p>
    }else{
        return <Link href='/auth/signin'>Sign in</Link>
    }

}
