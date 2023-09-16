import { getLanguage, LanguageCode, Language} from "@/lib/ankitool/langs"
import GenderTag from "./GenderTag";

export default function PhraseInputMeat(props:{phrase:Phrase}){

    const { phrase } = props;
    var language = getLanguage(phrase.language);

    var gender_mod = language && props.phrase.gender ? 
        language.genders[props.phrase.gender].base("") : ""

    var gender_code = language && props.phrase.gender ? 
        language.genders[props.phrase.gender].code() : ""

    return (
        <div className="px-1 justify-self-start flex flex-row items-center">
            <span>
                <GenderTag code={gender_code}>{`${gender_mod} `}</GenderTag>
                {phrase.text}
            </span>
        </div>
    )
}
