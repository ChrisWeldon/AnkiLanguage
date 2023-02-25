export default function DeckTitle(
    props: { // TODO replace with the type definition from translation library
        title: string
    }
){
    return (
        <h2 className="self-center font-thin text-5xl">
           {props.title} 
        </h2>
    )
}
