import { getLanguage, LanguageCode } from "@/lib/ankitool/langs";

export default function LanguageHeader({inlang, outlang} : {
    inlang: LanguageCode,
    outlang: LanguageCode
}){


    return (
        <div className='h-8 w-full flex flex-row justify-between'>
            <h2> { `${ getLanguage(inlang)?.name }` } </h2>
            <h2> { `${ getLanguage(outlang)?.name }` } </h2>
        </div>

    )

}
