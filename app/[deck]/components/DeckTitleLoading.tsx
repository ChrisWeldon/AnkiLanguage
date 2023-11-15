
export default function DeckTitleLoading(){
    return (
        <h2 className={`
            self-center
            h-16

            leading-snug
            sm:leading-none
            text-base03
            font-thin
            text-4xl
            sm:text-5xl
        `}>
            <div className={`
                animate-pulse 
                w-64
                h-12 
                bg-base2
            ` }>
            </div>
        </h2>
    )
}
