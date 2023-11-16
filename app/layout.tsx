import '../global.css'

import { Analytics } from '@vercel/analytics/react'

import LandingHeader from './components/LandingHeader'
import { AuthProvider } from './components/AuthProvider'
import PageDivider from './components/PageDivider'
import { Suspense } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import ServerSideBar from './components/ServerSideBar'
import MobileSideBar from './components/MobileSideBar'
import MobileDetect from 'mobile-detect'
import { headers } from 'next/headers'
import DeckList from './components/DeckList'
import DeckListLoading from './components/DeckListLoading'
import NewDeck from './components/NewDeck'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

    // @ts-ignore
    const session = await getServerSession(authOptions)

    const headersInstance = headers()
    const md = new MobileDetect(headersInstance.get('user-agent') as string)
    const isMobile = md.mobile() !== null

    
    let SideBar
    if(!isMobile){
        SideBar = (
            <>
                {/* @ts-expect-error Server Component */}
                <ServerSideBar/>
            </>
        )
    } else if(isMobile && session){
        SideBar = (<MobileSideBar>
            <Suspense fallback={<DeckListLoading/>}>
                {session===null ? 
                    <div></div>:
                    <NewDeck className={`
                        bg-base02
                        font-normal
                        text-violet
                        italic
                        leading-none
                        text-3xl
                        mb-8
                        p-0
                    `} />
                }
                {/* @ts-expect-error Server Component */}
                <DeckList/> 
            </Suspense>
        </MobileSideBar>)
    }

    return (
        <html lang="en">
              {/*
                <head /> will contain the components returned by the nearest parent
                head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
              */}
              <head />
              <body className='
                container
                scrollable-element
                min-h-screen
                min-w-screen
                flex
                flex-col
                bg-app
                text-2xl
                font-thin
                text-base00
                md:px-2
              '>
                  <AuthProvider >
                    <LandingHeader/>
                    <div className="
                        flex-grow
                        flex flex-row
                        min-w-screen
                        relative
                        ">
                     
                        {SideBar}
                        {!isMobile ? <PageDivider className={' mx-4 flex-shrink-0 '} />:<></>}
                        <div className="
                            flex-1
                            flex-shrink-0
                            justify-self-stretch
                            mr-4
                            ml-8
                            md:mx-10
                            overflow-hidden
                        ">
                            {children}
                        </div>
                    </div>
                  </AuthProvider>
                  <Analytics/>
              </body>
        </html>
    )
}
