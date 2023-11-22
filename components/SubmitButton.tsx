'use client'

// @ts-ignore because types for this hook are still under review
import { useFormStatus } from 'react-dom'


export default function SubmitButton(){
    const { pending } = useFormStatus()

    return (
            <button type='submit' className={`
                    self-center
                    rounded-xl
                    px-2
                    mx-2
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
            `} 
            >
                {pending ? 'Loading' : 'Submit'}
            </button>
       )
}
