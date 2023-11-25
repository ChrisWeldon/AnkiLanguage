'use server'

import { LanguageCode } from '@/lib/ankitool/langs'
import createDeck from '@/lib/database/createDeck'
import urlConvert from '@/lib/helpers/urlConvert'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function newDeck(prevState: any, data: FormData){
    'use server'

    let title = data.get('deckname')?.toString()
    let inlang = data.get('inlang')?.toString()
    let outlang = data.get('outlang')?.toString()

    if(title=== null || title ==='' || title === undefined){
        return { message : 'title cannot be empty'}
    }
    if(inlang=== null || inlang === undefined){
        return { message : 'inlang cannot be empty'}
    }
    if(outlang=== null || outlang === undefined){
        return { message : 'outlang cannot be empty'}
    }

    if(urlConvert(title)==="new-deck"){
        return { message:  'Forbidden title'}
    }
    
    try{
        await createDeck(title, inlang as LanguageCode, outlang as LanguageCode) 
    }catch(err){
        return { message: `${err}`}
    }

    revalidatePath('/')
    redirect(`/${urlConvert(title)}`)
}
