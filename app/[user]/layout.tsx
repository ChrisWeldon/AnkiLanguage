import DeckList from './components/DeckList'

export const dynamic = 'force-dynamic'

export default function UserLayout({
  children, params
}: {
  children: React.ReactNode,
  params: { user: string }
}) {
  return (
    <div className="flex flex-row mw-100vw">
        <div className="flex-grow-0 justify-self-start">
            {/* @ts-expect-error Server Component */}
            <DeckList user={params.user}/> 
        </div>
        <div className="basis-3/4 justify-self-stretch flex-grow-1">
            {children}
        </div>
    </div>
  )
}
