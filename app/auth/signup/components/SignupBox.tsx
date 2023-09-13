'use client'

import { SyntheticEvent } from "react"
import Link from "next/link"

export default function SignupBox() {

    const handleSubmit = (e: SyntheticEvent<{}>) => {
        fetch()
        
        e.preventDefault()
    }
    
    return (
        <>
        <form className="flex flex-col h-84 xl:max-w-md lined text-2xl font-thin italic px-2" onSubmit={handleSubmit}>
            <label>
                Email:
                <input name="username" type='email' className="
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
                <input name="username" type='email' className="
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
                <input name="username" type='password' className="
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
        </>
    )
} 
