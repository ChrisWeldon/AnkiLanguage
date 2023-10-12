import Link from "next/link"

export default function Author(props: {className: string}){

    return (
            <div>
                <h1 className={`${props.className}`}>by <Link className="underline" href="https://chriswevans.com">Chris Evans</Link></h1>
                <h1 className={`${props.className}`}>09.25.2023</h1>
            </div>
           )
}
