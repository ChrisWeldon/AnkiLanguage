import { getLanguage, LanguageCode } from "@/lib/ankitool/langs";
import { ObjectId } from "mongodb";
import ExportDeck from "./ExportDeck";

export default function LanguageHeader({inlang, outlang, deck_id} : {
    inlang: LanguageCode,
    outlang: LanguageCode,
    deck_id: ObjectId
}){


    return (
        <div className='h-8 w-full flex flex-row justify-between'>
            <h2> { `${ getLanguage(inlang)?.name }` } </h2>
            <ExportDeck article={"is"} deck_id={deck_id}/>
            <h2> { `${ getLanguage(outlang)?.name }` } </h2>
        </div>

    )

}
