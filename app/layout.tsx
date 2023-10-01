import '../global.css'

import LandingHeader from './components/LandingHeader'
import { AuthProvider } from './components/AuthProvider'
import DeckList from './components/DeckList'
import DeckListLoading from './components/DeckListLoading'
import Author from './components/Author'
import NewDeck from './components/NewDeck'
import PageDivider from './components/PageDivider'
import { Suspense } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
          {/*
            <head /> will contain the components returned by the nearest parent
            head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
          */}
          <head />
          <body className='container scrollable-element min-h-screen min-w-screen px-2 flex flex-col bg-app text-2xl font-thin text-base00'>
              <AuthProvider >
                <LandingHeader/>
                <div className="
                    flex-grow
                    flex flex-row
                    min-w-screen">
                
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
                        <div className='flex flex-col justify-end h-16 mb-8 p-0 text-5xl leading-none font-light italic'>
                            <NewDeck className={''} />
                        </div>

                        <Suspense fallback={<DeckListLoading/>}>
                            {/* @ts-expect-error Server Component */}
                            <DeckList/> 
                        </Suspense>
                        <div className="bg-app">
                            <Author className={''}/>
                        </div>
                    </div>
                    <PageDivider className={' mx-4 flex-shrink-0 '} />
                    <div className="flex-1 flex-shrink-0 justify-self-stretch mx-10 ">
                        {children}
                    </div>
                </div>
              </AuthProvider>
          </body>
    </html>
  )
}
