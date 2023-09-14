'use client'

import { SyntheticEvent, useState, useEffect } from "react"
import Link from "next/link"
import { signIn, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function SignupBox() {

    const { status } = useSession({
        required: false
    })

    if(status === 'authenticated'){
        redirect('/')
    }
    
    const [ email, setEmail ] = useState('')
    const [ email_v, setEmail_v ] = useState('')
    const [ password, setPassword ] = useState('')

    const [message, setMessage] = useState('')

    //TODO Verify 
    // 1. email is an email
    // 2. email is same as password
    // 3. password is non-empty

    const handleSubmit = async (e: SyntheticEvent<{}>) => {
        e.preventDefault()
        
        // fetch here
        const resp = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        if(!resp.ok){
            setMessage(resp.statusText)
            setEmail('')
            setEmail_v('')
            setPassword('')
        }else{
            setMessage('')
            signIn("credentials", { email, password })
        }
    }
    
    return (
        <>
        <form className="flex flex-col h-84 xl:max-w-md lined text-2xl font-thin italic px-2" onSubmit={handleSubmit}>
            <label>
                Email:
                <input name="username" type='email' value={email} onChange={(e)=>setEmail(e.target.value)}
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
                Repeat Email:
                <input name="email_v" type='email' value={email_v} onChange={(e)=>setEmail_v(e.target.value)}
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
                <input name="username" type='password' value={password} onChange={(e)=>setPassword(e.target.value)} 
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
            <input type='submit' value="Sign up" className="
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
        <Link href="/auth/signin">Sign in</Link>
        <br/>
        <br/>
        <h3>{message}</h3>
        </>
    )
} 
