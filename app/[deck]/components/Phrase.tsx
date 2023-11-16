import { Types } from 'mongoose';
import { isLanguageCode, LanguageCode, getLanguage } from '@/lib/ankitool/langs'
import PhraseInputMeat from './PhraseInputMeat'

export default function Phrase(
    props: { // TODO replace with the type definition from translation library
        input: Phrase,
        target: Phrase[],
        key: Types.ObjectId,
        children: JSX.Element | JSX.Element[] | string | string
    }
){
    const input_lang = getLanguage(props.input.language);
    const target_lang = getLanguage(props.target[0].language);

    // FIXME: Fix base requiring param
    var input_gender = input_lang && props.input.gender ? 
        input_lang.genders[props.input.gender].base("") : ""

    var target_gender = target_lang && props.target[0].gender ? 
        <>{target_lang.genders[props.target[0].gender].base("")}</> : <></>
    


    return (
        <li className="
            flex
            flex-col
            md:flex-row
            md:h-8
            md:leading-none
            px-1
            leading-8
            md:text-3xl
            md:justify-between
        ">
            <PhraseInputMeat phrase={props.input} />
            <div className="px-1 
                md:justify-self-end 
                flex 
                flex-row 
                items-center
                self-end
                md:self-start
            ">
                {props.target[0].text} {target_gender}
                {props.children}
            </div>
        </li>
    )
}
