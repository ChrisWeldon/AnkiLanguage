import dbConnect from '@/lib/dbConnect'
import { UserModel } from '@/models/User'
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'

type User = {
    id: number,
    name: string
}

const credProvider = CredentialsProvider({
    id: "credentials",
    name: "Credentials",
    type: "credentials",
    credentials: {
        email:{ label: "email", type:"text" },
        password:{ label: "Password", type:"password"}
    },
    async authorize(credentials, req){
        UserModel

        if(credentials === undefined ){
            return null
        }

        await dbConnect();
        const potentialUser = await UserModel.findOne({ email : credentials.email}).exec()

        const pass_match = await bcrypt.compare(credentials.password, potentialUser.password)
       
        if(potentialUser && pass_match){
            return potentialUser;
        }else{
            console.log(`Attempted sign in for ${credentials.email}. Invalid sign in.`)
            return false
        }
    }
})

export const authOptions = {
    providers: [
        credProvider
    ],
    callbacks:{
        async jwt({ token, user, account, profile }){
            return token
        },
        async session({ session, token, user}){
            // Pinning user id to the session for easier access
            if(token.sub){
                session.user._id = token.sub
            }
            return session
        }


    },
    session: {
        strategy: 'jwt'
    },
    pages:{
        signIn: '/auth/credentials-signin',
        newUser: '/auth/credentials-signup'
    }

} 

export const saltRounds = 10
