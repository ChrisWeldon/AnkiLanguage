import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from 'next/navigation'
 

export default async function Home() {

    // @ts-ignore
    const session = await getServerSession(authOptions)

    if(!session){
        redirect('/auth/signin')
    }

    return (
        <h5 className="text-3xl font-bold underline">

        </h5>
    )
}
