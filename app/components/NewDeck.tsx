import Link from "next/link"

export default function NewDeck(props: {className: string}){
    return (
        <Link className={`${props.className}`} href='/new-deck'>New Deck </Link>
    )

}
