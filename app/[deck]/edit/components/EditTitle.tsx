
import { FormEventHandler, useState } from 'react'
import { DeckModel, DeckType } from '@/models/Deck'; 
import IndexCard from "@/components/IndexCard"
import InputBar from "@/components/InputBar"
import SubmitButton from '@/components/SubmitButton';
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth';
import { Session } from 'next-auth';
import urlConvert from '@/lib/helpers/urlConvert';
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export default async function EditTitle({ deck, session}: { deck: DeckType, session: Session}, ){


    // Use Server functions
    async function editTitle(data: FormData){
        'use server'

        // Edit title in database
        // revalidate data
        // redirect 
        console.log(deck)

        await DeckModel.findByIdAndUpdate(deck._id, {title: data.get('input'), value: urlConvert(data.get('input'))})
        revalidatePath('/')

        redirect(`/${urlConvert(data.get('input'))}/edit`)
        
        return {message:'logged data'}

    }

    return (
        <IndexCard 
            className={`
                w-full
                md:w-1/2
                m-2
                h-64
                z-100
            `} 
            title={<h1>Change Title</h1>}
        >
            <form action={editTitle}>
                <InputBar 
                    placeHolder={'Hi'}
                />
                <SubmitButton/>
            </form>
        </IndexCard>
    )

}
