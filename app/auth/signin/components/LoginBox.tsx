'use client'

import { SyntheticEvent, useState } from "react"
import { signIn, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from "next/link"

export default function LoginBox() {
    
    const { status } = useSession({
        required: false
    })

    if(status === 'authenticated'){
        redirect('/')
    }
    
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleSubmit = (e: SyntheticEvent<{}>) => {
        e.preventDefault()
        signIn("credentials", { email, password })
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
            <input type='submit' value="Login" className="
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
        </>
    )
} 
