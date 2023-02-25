import './globals.css'

import LandingHeader from './components/LandingHeader'

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
      <body className='container bg-app text-base00'>
        <LandingHeader/>
        {children}
      </body>
    </html>
  )
}
