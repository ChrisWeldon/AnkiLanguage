export default function DeckTitle(
    props: { // TODO replace with the type definition from translation library
        title: string
    }
){
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
            <span className="bg-app">
               {props.title} 
           </span>
        </h2>
    )
}
