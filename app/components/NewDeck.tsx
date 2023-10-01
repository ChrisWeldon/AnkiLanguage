import Link from "next/link"

export default function NewDeck(props: {className: string}){
    return (
        <Link className={`
            rounded-xl
            transition-all
            ease-linear
            duration-750
            delay-0
            bg-transparent
            px-2

            notebook-input
            notebook-unfocused
            hover:notebook-hover
            active:notebook-focused
            ${props.className}
        `} href='/new-deck'>New Deck </Link>
    )

}
