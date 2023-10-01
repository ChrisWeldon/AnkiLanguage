import Link from 'next/link';
import TrashcanIcon  from '@/icons/trashcan'
import PageDivider from './PageDivider';
import Arrow from '@/icons/arrow';

export default function DeckPreviewCard(
    props: {
        title: string,
        value: string
    }
){
    return (
        <Link className='' href={`/${props.value}`}>
            <li key={props.value} className="
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
                    <h3 className='h-8 text-3xl leading-none font-extralight truncate'> {props.title} </h3>
                    <div className='flex flex-row justify-between'>
                        <h4 className='pl-2 text-sm leading-none flex flex-row'>GE <Arrow height={16} width={16}/> EN</h4>
                        <h4 className='pl-2 text-sm leading-none'>10 Cards</h4>
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
