import dbConnect from '@/lib/dbConnect'
import { UserModel } from '@/models/User'
import CredentialsProvider from "next-auth/providers/credentials"

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

        // TODO encrypt
       
        if(potentialUser && credentials.password === potentialUser.password){
            return potentialUser;
        }else{
            // Idiot NextAuth has builtin redirects but are not up to date on Next13
            //   Thus we need to return an empty session and now check if session not valid.
            //   The correct way is to return 'null' but that causes unwanted side effects from NextAuth
            console.log(`Attempted sign in for ${credentials.email}. Invalid sign in.`)
            return false
        }
    }
})

export const authOptions = {
    providers: [
        credProvider
    ],
    session: {
        strategy: 'jwt'
    },
    pages:{
        signIn: '/auth/credentials-signin',
        newUser: '/auth/credentials-signup'
    }

} 
