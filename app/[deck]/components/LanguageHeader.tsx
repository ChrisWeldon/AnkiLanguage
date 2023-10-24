import { getLanguage, LanguageCode } from "@/lib/ankitool/langs";
import { ObjectId } from "mongodb";
import ExportDeck from "./ExportDeck";

export default function LanguageHeader({inlang, outlang, deck_id, deck_value} : {
    inlang: LanguageCode,
    outlang: LanguageCode,
    deck_id: ObjectId 
    deck_value: string
}){


    return (
        <div className='h-8 w-full flex flex-row justify-between'>
            <h2> { `${ getLanguage(inlang)?.name }` } </h2>
            <ExportDeck article={"is"} deck_id={deck_id} deck_value={deck_value}/>
            <h2> { `${ getLanguage(outlang)?.name }` } </h2>
        </div>

    )

}
