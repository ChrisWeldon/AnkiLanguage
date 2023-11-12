
import Link from 'next/link';

export default function DeckPreviewCardLoading( { i }: { i: number }){

    const widths = ['w-64', 'w-52', 'w-56']
    let width = widths[i%3]

    return (
        <Link className='' href={''}>
            <li key={i} className="
                text-base03
                flex flex-row
                rounded 
                px-1
                h-16
                group
                overflow-hidden
            ">
                <SelectSVG className='scale-125 translate-y-2 transition-opacity opacity-0 group-hover:opacity-100 px-1 '/>
                <div className='flex flex-col flex-start w-full'>
                    <h3 className={`${width} animate-pulse bg-base2  h-8 text-3xl leading-none font-extralight truncate`}>  </h3>
                    <div className='flex flex-row justify-between pt-1'>
                        <h4 className='pl-2 ext-sm leading-none'>
                        <div className="animate-pulse bg-base2 h-4 w-16"></div></h4>
                        <h4 className='animate-pulse pl-2 text-sm leading-none bg-base2 h-4 w-12'></h4>
                    </div>
                </div>
            </li>
        </Link>
    )
}

// Contained here because it is merely a wrapper to the asset
function SelectSVG(props: {
        className: string
    }){

    return (
        <div className={`${props.className} `}>
            <svg width="3" height="49" viewBox="0 0 3 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0L3 0L3 49L0 45.4639L0 0Z" fill="#073642"/>
            </svg>
        </div>
    )

}
