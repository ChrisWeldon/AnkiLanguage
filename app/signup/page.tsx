'use client'
import { SyntheticEvent } from "react"

export default function SignupPage() {

    const handleSubmit = (e: SyntheticEvent<{}>) => {
        // TODO request login token
        e.preventDefault()
    }

    return (
        <form className="flex flex-col" onSubmit={handleSubmit}>
            <input name="username" type='email' />
            <input name="username" type='email' />
            <input name="password" type='password'/>
            <input type='submit' value="Submit" />
        </form>
    )
} 
