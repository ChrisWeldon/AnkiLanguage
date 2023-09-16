// TODO: Having this page inside the pages directory is because it hasn't quite caught up to NEXTjs app dir yet. Make a feature request

import '../../global.css'

import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCsrfToken } from "next-auth/react"


export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}

export default function Signup({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    
    return (
        <form method="post" action="/api/auth/callback/credentials"
            className="flex flex-col h-84 xl:max-w-md lined text-2xl font-thin italic px-2">
            <h1> Signup </h1>

            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

            <label>
                Email:
                <input name="email" type='text' className="
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
                <input name="password" type='password' className="
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
    )
} 
