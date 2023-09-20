'use client'

import { SyntheticEvent, useState } from "react"
import { signIn, useSession } from 'next-auth/react'
import Link from "next/link"
import validateEmail from "@/lib/helpers/validateEmail"
import { useRouter } from "next/navigation"

export default function LoginBox() {
    
    const { status } = useSession({
        required: false
    })

    const router = useRouter()

    if(status === 'authenticated'){
        router.refresh()
        router.push('/')
    }
    
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ message, setMessage ] = useState('')

    const handleSubmit = async (e: SyntheticEvent<{}>) => {
        e.preventDefault()

        if(!validateEmail(email)){
            setMessage('Please enter a valid email')
            setEmail('')
            setPassword('')
            return
        }

        const res = await signIn("credentials", { redirect:false, email, password })

        if(res===undefined || res.error !== null){
            setMessage('Invalid credentials')
        }else if(!res.ok){
            setMessage('Please Try again later')
        }

        setEmail('')
        setPassword('')
    }
    
    return (
        <>
        <form className="flex flex-col h-84 xl:max-w-md lined text-2xl font-thin italic px-2" onSubmit={handleSubmit}>
            <label>
                Email:
                <input 
                name="email"
                type='text'
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="
                    pl-2
                    w-full
                    rounded-xl
                    transition-all
                    ease-linear
                    duration-750
                    delay-0
                    bg-transparent
                    outline-none
                    notebook-input
                    notebook-unfocused
                    hover:notebook-hover
                    focus:outline-none
                    focus:notebook-focused
                "/>
            </label>
            <label>
                Password:
                <input
                name="password"
                type='password'
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="
                    pl-2
                    w-full
                    rounded-xl
                    transition-all
                    ease-linear
                    duration-750
                    delay-0
                    bg-transparent
                    outline-none
                    notebook-input
                    notebook-unfocused
                    hover:notebook-hover
                    focus:outline-none
                    focus:notebook-focused
                "/>
            </label>
            <p className="h-16"></p>
            <input type='submit' value="Go" className="
                    self-center
                    rounded-xl
                    w-36
                    transition-all
                    ease-linear
                    duration-750
                    delay-0
                    bg-transparent
                    notebook-input
                    notebook-unfocused
                    hover:notebook-hover
                    active:notebook-focused

            "/>
        </form>
        <Link href="/auth/signup"> signup</Link>
        {message}
        </>
    )
} 
