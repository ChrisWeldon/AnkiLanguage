import dbConnect from '@/lib/dbConnect'
import { UserModel } from '@/models/User'

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

type User = {
    id: number,
    name: string
}

const credProvider = CredentialsProvider({
    name: "Credentials",
    credentials: {
        email:{ label: "email", type:"text" },
        password:{ label: "Password", type:"password"}
    },
    async authorize(credentials, req){
        // TODO authorize here
        console.log(credentials)
        if(credentials === undefined ){
            return null
        }

        await dbConnect();
        const potentialUser = await UserModel.findOne({ email : credentials.email})

        console.log(potentialUser)
        // TODO encrypt
        console.log(credentials)
        if(potentialUser && credentials.password === potentialUser.password){
            return potentialUser;
        }else{
            return null
        }
    }
})

export const authOptions = {
    secret: "hi-this-is-a-very-special-secret-which-noone-can-guess",
    providers: [
        credProvider
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            //
            if (url.startsWith("/")){
                // Allows relative callback URLs
                return `${baseUrl}${url}`
            }else if (new URL(url).origin === baseUrl){
                // Allows callback URLs on the same origin
                return url
            } 
            return baseUrl
        }
    },
    pages: {
        signIn: '/auth/signin',
        newUser: '/auth/signup'
    }

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
