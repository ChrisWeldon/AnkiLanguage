'use server'

import { DeckModel } from '@/models/Deck'; 
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth';
import urlConvert from '@/lib/helpers/urlConvert';
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import getDeckByValueSession from '@/lib/database/getDeckByValueSession';


// pls note that server actions with prevState are passed to useFormStatus
//      Normally the action would just have a FormData param
export async function editTitle(prevState: any, data: FormData){
    'use server';
    
    //@ts-ignore
    const session = await getServerSession(authOptions)

    let old_deck_value = `${data.get('deck_value')}`

    if(session == null){
        return { message: 'User does not exist.'}
    }
    
    const deck = await getDeckByValueSession(old_deck_value, session);

    let new_title = `${data.get('input')}`

    if(new_title===null || urlConvert(new_title)===""){
        return { message: 'Empty title not allowed.'}
    }

    if(urlConvert(new_title)==="new-deck"){
        return { message: 'That title is forbidden.'}
    }

    if(await DeckModel.findOne( {
        owner: session.user._id,
        value: urlConvert(new_title),
        _id: { $ne: deck._id}
    })){
        return { message: 'A deck with that title already exists.'}
    }

    await DeckModel.findByIdAndUpdate(deck._id, {title: new_title, value: urlConvert(new_title)})

    revalidatePath('/')

    redirect(`/${urlConvert(new_title)}/edit`)
}

export async function deleteDeck(prevState: any, data: FormData){
    'use server';
    //
    //@ts-ignore
    const session = await getServerSession(authOptions)

    let deck_value = `${data.get('deck_value')}`

    if(session == null){
        return { message: 'User does not exist.'}
    }

    const deck = await getDeckByValueSession(deck_value, session);

    if(!deck){
        return { message: 'Deck does not exists'}
    }

    let check_title = `${data.get('input')}`

    if(check_title===null || urlConvert(check_title)!==deck.value){
        return { message: 'Please match input exactly'}
    }

    await DeckModel.findByIdAndDelete(deck._id)

    revalidatePath('/')
    redirect(`/`)

    return { message: 'done'}
}
