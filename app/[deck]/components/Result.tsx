'use client'
import { SyntheticEvent } from "react"
import { getLanguage, Language } from '@/lib/ankitool/langs'
import { ObjectId } from "mongodb"

export default function Results(
    props: {
        result: Translation,
        deck_id: ObjectId,
        user: string
        handleResultSelect: (result: Translation) => ((event: SyntheticEvent<{}>) => void)
    }
){
    const { result } = props;

    const input_lang = getLanguage(props.result.input.language);
    const target_lang = getLanguage(props.result.target[0].language);

    // FIXME: Fix base requiring param
    var input_gender = input_lang !== undefined && result.input.gender? 
        <>{input_lang.genders[result.input.gender].base("")}</> : <></>

    var target_gender = target_lang && result.target[0].gender ? 
        <>{target_lang.genders[result.target[0].gender].base("")}</> : <></>
  
    let targets = [<p key={1}></p>]
    if(result === null || result.target !== null){
        targets = result.target.map((target, i) => {
            return <span key={i}>{target_gender} {target.text};</span>
        })
    }

    const clickHandle = props.handleResultSelect(result)

    return (
        <div onClick={clickHandle} className="hover:transition-all h-8 truncate leading-none border-b-2 border-base3 hover:border-b-2 hover:border-base00" >
            <span className="text-xl pr-4">{input_gender} {result.input.text}</span> 
            <span className="">{targets}</span> 
        </div>
    )
}
