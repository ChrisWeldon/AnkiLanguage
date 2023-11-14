
import DeckList from './DeckList'
import DeckListLoading from './DeckListLoading'
import Author from './Author'
import NewDeck from './NewDeck'
import { Suspense } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function ServerSideBar(){
    // @ts-ignore
    const session = await getServerSession(authOptions)

    return (
        <div className="
            justify-self-start
            w-1/6
            min-w-64
            min-h-[48rem]

            mx-10
            lined

            flex flex-col
            justify-between
            ">
            {/*This is to avoid people trying to make new decks before login. Will eventually allow in later feature*/}
            <div className='flex flex-col justify-end h-16 mb-8 p-0 text-5xl leading-none font-light italic'>
                {session===null ? 
                    <div></div>:
                    <NewDeck className={''} />
                }
            </div>

            <Suspense fallback={<DeckListLoading/>}>
                {/* @ts-expect-error Server Component */}
                <DeckList/> 
            </Suspense>
            <div className="bg-app">
                <Author className={''}/>
            </div>
        </div>
 

   )

}
