"use client"

import Link from 'next/link';
import Arrow from '@/icons/arrow';
import Edit from '@/icons/edit';
import { LanguageCode } from '@/lib/ankitool/langs';
import { usePathname } from 'next/navigation'

export default function DeckPreviewCard(
    props: {
        title: string,
        value: string,
        inlang: LanguageCode,
        outlang: LanguageCode,
        cardcount: number
    }
){
    const pathname = usePathname()
    /// TODO here, card preview highlight based on navigation

    return (
            <li key={props.value} className="
                text-base03
                flex flex-row
                rounded 
                px-1
                h-16
                group
                overflow-hidden
            ">
                <SelectSVG className={ `
                    scale-125 translate-y-2 
                    transition-opacity opacity-0 
                    ${pathname === `/${props.value}`? 'opacity-100' : 'group-hover:opacity-50'  }
                    px-1 
                    ` }/>
                <div className='flex flex-col flex-start w-full'>
                    <div className='w-full flex flex-row justify-between'>
                        <Link className='' href={`/${props.value}`}>
                            <h3 className='h-8 text-3xl leading-none font-extralight truncate'> 
                                {props.title}
                            </h3>
                        </Link>
                        <Link className='' href={`/${props.value}/edit`}>
                            <Edit height={24} width={24}/>
                        </Link>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <h4 className='pl-2 text-sm leading-none flex flex-row'>
                            {props.inlang}
                            <Arrow height={16} width={16}/>
                            {props.outlang}
                        </h4>
                        <h4 className='pl-2 text-sm leading-none'>{props.cardcount} Cards</h4>
                    </div>
                </div>
            </li>
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
