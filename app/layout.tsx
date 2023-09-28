import '../global.css'

import LandingHeader from './components/LandingHeader'
import { AuthProvider } from './components/AuthProvider'
import DeckList from './components/DeckList'
import Author from './components/Author'
import NewDeck from './components/NewDeck'
import PageDivider from './components/PageDivider'

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
          <body className='container min-h-screen px-2 flex flex-col bg-app text-2xl font-thin text-base00'>
              <AuthProvider >
                <LandingHeader/>
                <div className="
                    flex-1

                    flex flex-row
                    mw-100vw">
                
                    <div className="
                        justify-self-start

                        mx-10
                        lined

                        flex flex-col
                        justify-between
                        ">
                        <NewDeck className={'p-0 h-16 text-left text-3xl leading-none font-light italic'} />
                        {/* @ts-expect-error Server Component */}
                        <DeckList/> 
                    </div>
                    <PageDivider className={' mx-4 '} />
                    <div className="basis-3/4 justify-self-stretch flex-1">
                        {children}
                    </div>
                </div>
                <div>
                    <Author className={''}/>
                </div>
              </AuthProvider>
          </body>
    </html>
  )
}
