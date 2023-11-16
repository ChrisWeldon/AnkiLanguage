'use client'

import { useState, Suspense, useEffect} from 'react'
import { usePathname } from 'next/navigation'
import Arrow from '@/icons/arrow';


export default function MobileSideBar(props: {
            children: JSX.Element | JSX.Element[] | string | string
        }){

    const [isOpen, setIsOpen] = useState(false)

    const pathname = usePathname()

    useEffect(()=>{
        setIsOpen(false)
    }, [pathname])




    return (
        <div className={`
            lined-dark
            z-10
            flex
            flex-row
            justify-between
            transition-all
            absolute
            top-0
            w-screen
            ${isOpen ? 'left-0' : '-left-full' }
        `}>
            <div className={`
                flex
                flex-col
            `}> 
                { props.children }
            </div>
            <div className={`
                transition-all
                relative
                -right-10
                ${isOpen ? 'right-0' : '-right-10' }
            `
            } onClick={()=>setIsOpen(!isOpen)}>
                <div className={`
                    transition-all
                    ${isOpen ? 'rotate-180': 'rotate-0'}
                `}>
                    <Arrow height={36} width={36}/>
                </div>
                <SideBarSVG className={' mx-2 flex-shrink-0 '} />
            </div>
        </div>
    )

}

function SideBarSVG(props: {
        className: string
    }){
    return (
        <div className={`${props.className} `}>
            <svg width="10" height="600" viewBox="0 0 10 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0L10 0L10 600L0 595.4639L0 0Z" fill="#073642"/>
            </svg>
        </div>
    )

}
