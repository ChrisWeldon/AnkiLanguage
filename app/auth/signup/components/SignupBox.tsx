'use client'

import { SyntheticEvent, useState, useEffect } from "react"
import Link from "next/link"
import { signIn, useSession } from 'next-auth/react'
import validateEmail from "@/lib/helpers/validateEmail"
import validatePassword from "@/lib/helpers/validatePassword"
import { useRouter } from "next/navigation"

export default function SignupBox() {

    const { status } = useSession({
        required: false
    })

    const router = useRouter()

    if(status === 'authenticated'){
        router.refresh()
        router.push('/')
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

        // No validation of emails yet because the email functions as a usename 

        if(email !== email_v){
            setMessage('Usernames must match must match')
            setEmail('')
            setEmail_v('')
            setPassword('')
            return
        }

        if(!validatePassword(password)){
            //Password must be between 6 to 20 characters, \n contain at least one numeric digit, \n one uppercase and one lowercase letter
            setMessage(`Password must between 6-20 characters and one capital.`)
            setPassword('')
            return
        }

        
        // Then ask server
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
                Username:
                <input
                name="username"
                type='text'
                value={email}
                required
                onChange={(e)=>setEmail(e.target.value)}
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
                Repeat Username:
                <input
                name="email_v"
                type='text' 
                value={email_v} 
                required
                onChange={(e)=>setEmail_v(e.target.value)}
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
                onChange={(e)=>setPassword(e.target.value)} 
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
            <input type='submit' value="Submit" className="
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
                    text-green
                    hover:font-light
                    hover:notebook-hover
                    active:notebook-focused

            "/>
        </form>
        <Link href="/auth/signin">sign in</Link>
        <br/>
        <br/>
        <p className='h-8'>{message}</p>
        </>
    )
} 
