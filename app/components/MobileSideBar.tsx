'use client'

import { useState, Suspense, useEffect} from 'react'
import { usePathname } from 'next/navigation'
import DeckList from './DeckList'
import DeckListLoading from './DeckListLoading'
import PageDivider from './PageDivider'
import Arrow from '@/icons/arrow';


export default function MobileSideBar(props: {
            children: JSX.Element | JSX.Element[] | string | string
        }){

    const [isOpen, setIsOpen] = useState(true)

    const pathname = usePathname()

    useEffect(()=>{
        setIsOpen(false)
    }, [pathname])




    return (
        <div className={`
            z-10
            flex
            flex-row
            justify-between
            transition-all
            absolute
            bg-cyan
            top-0
            w-screen
            ${isOpen ? 'left-0' : '-left-full' }
        `}>
            { props.children }
            <div className={`
                transition-all
                relative
                -right-10
                bg-red
                ${isOpen ? 'right-0' : '-right-10' }
            `
            } onClick={()=>setIsOpen(!isOpen)}>
                <div className={`
                    transition-all
                    ${isOpen ? 'rotate-180': 'rotate-0'}
                `}>
                    <Arrow height={36} width={36}/>
                </div>
                <PageDivider className={' mx-2 flex-shrink-0 '} />
            </div>
        </div>
    )

}
