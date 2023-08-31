import { getServerSession } from "next-auth"
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function LandingHeader(){

    const userdata = await getServerSession(authOptions)

    if(!userdata?.user){
        // TODO, make this go to actual signin page
        redirect('/api/auth/signin')
    }


    return (
        <div className="flex flex-row px-5 py-3 justify-between">
            <h1 className="text-5xl font-thin ">Anki Language</h1>
            <div className="flex flex-row space-x-2">
                { userdata.user.name }
                <a>signout</a>
            </div>
        </div>
    )
}
