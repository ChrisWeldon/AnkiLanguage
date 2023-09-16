'use client'

import TrashcanIcon  from '@/icons/trashcan'
import { useRouter } from 'next/navigation'
import type { SyntheticEvent } from 'react';

export default function DeleteButton(props:{
    deleteURL: string,
    payload: any
}) {
    
    const router = useRouter()

    const handleClick = async (event: SyntheticEvent<{}>) => {

        const res = await fetch(props.deleteURL, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify(props.payload)
        })

        const data = res.json()
        router.refresh()
    }


    return (
        <div onClick={handleClick}
             className="transition-all mx-1 rounded opacity-10 
                        hover:opacity-100">
            <TrashcanIcon height={26} width={26} />
        </div>
    )

}
