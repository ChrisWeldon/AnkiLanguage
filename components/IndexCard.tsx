export default function IndexCard(props: {
    className: string,
    title: JSX.Element,
    children: JSX.Element | JSX.Element[] | string | string
}): JSX.Element{
    return(
        <div className={`
            h-fit
            border-2
            border-base02
            p-2
            ${props.className}
        `}>
            <div className="
                lined
                h-full
                w-full
            ">
                <div className="
                    leading-none
                    text-3xl
                    font-light
                    max-h-16
                ">
                    {props.title}
                </div>
                <div className=" ">
                    {props.children}
                </div>
            </div>
        </div>
    )

}
