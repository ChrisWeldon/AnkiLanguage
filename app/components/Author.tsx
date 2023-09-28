export default function Author(props: {className: string}){

    return (
            <div>
                <h1 className={`${props.className}`}>by Chris Evans </h1>
                <h1 className={`${props.className}`}>09.25.2023</h1>
            </div>
           )
}
