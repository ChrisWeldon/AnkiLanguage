
import Link from "next/link";

export default function ExportDeck(
    props: { // TODO replace with the type definition from translation library
        deck: string,
        user: string,
        article: string
    }
){
    // TODO make export compiled on frontend 
    const fileLink = `http://localhost:3000`;


    return (
        <Link href={
            `${fileLink}?${new URLSearchParams({article: props.article})}`
            }
            className="
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
            "
        >
            Export Deck
        </Link>
   )
}
