import './globals.css'

import LandingHeader from './components/LandingHeader'
import { AuthProvider } from './components/AuthProvider'
import DeckList from './components/DeckList'

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
          <body className='container min-h-screen bg-app text-2xl font-thin text-base00'>
              <AuthProvider >
                <LandingHeader/>
                <div className="flex flex-row mw-100vw">
                    <div className="flex-grow-0 justify-self-start">
                        {/* @ts-expect-error Server Component */}
                        <DeckList/> 
                    </div>
                    <div className="basis-3/4 justify-self-stretch flex-grow-1">
                        {children}
                    </div>
                </div>
              </AuthProvider>
          </body>
    </html>
  )
}
