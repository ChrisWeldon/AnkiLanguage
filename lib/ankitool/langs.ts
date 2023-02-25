/* A module for managing the quirks and features of different languages so 
 * that they can be handled in a programmatic way.
 *
 * @author: Chris Evans
 *
 * NOTE: This doc follows the same notation as dict.cc client tags. Thus there 
 * are tons of quirks (eg. the change in language for mods).
 * {
 *  name: <Language name>
 *  code: <code for language> used in language queries
 *  value: <English spelling of language> used in language queries
 *  genders: {
 *      <title of mod in dict.cc>: {
 *          <articles>: <target lang>
 *      }
 *  }
 *  pos: {
 *      <title of mod in dict.cc>: {
 *          <articles>: <target lang>
 *      }
 *  }
 * }
 */ 

export type LanguageName = 'Français' | 'English' | 'Español' | 'Deutsch' ;
export type LanguageCode = 'FR' | 'EN' | 'ES' | 'DE';

export function isLanguageCode(obj: any): obj is LanguageCode{
    return (obj instanceof String) && (obj as string) in ['FR', 'EN', 'ES', 'DE']
}

export function isLanguage(obj: any): obj is Language{
    return (obj.code) != undefined
}

export interface LanguageMod{
    base: ((word: string) => string) | (() => string),
    [key: string]: ((word: string) => string) | (() => string),
}

export interface LanguageGenderMod extends LanguageMod{
    code: () => (Gender),
}

export interface LanguagePOSMod extends LanguageMod{
    code: () => (PartOfSpeech),
}

export type Language = {
    name: LanguageName,
    code: LanguageCode,
    value: string,
    rank: number,
    genders: Record<string, LanguageGenderMod>,
    pos: Record<string, LanguagePOSMod>,
    disabled?: boolean
}
// TODO: pull deepl to find aspiratd h sounds le hibou vs hospital
// FIXME: Genders should maybe be separated from mods
const vowels = ['a', 'e', 'i', 'o', 'u'];
let languages: Language[] = [
    {   /* FRENCH */ 
        name: 'Français', code: 'FR',
        value:'french',
        rank:10,
        genders:{
            masculin:{
                code: () => 'M',
                base: () => 'm. ',
                is: () => 'un ',   // indefinite article
                ds: (w) => {
                    if (vowels.includes(w.charAt(0).toLowerCase())){
                       return "l'";
                    }
                    return 'le ';
                },   // definite article
                ipl: () => 'des ', // indefinite plural
                dpl: () => 'les ', // definit plural
            },
            féminin:{
                code: () => 'F',
                base: () => 'f. ',
                is: () => 'une ',
                ds: (w) => {
                    if (vowels.includes(w.charAt(0).toLowerCase())){
                       return "l'";
                    }
                    return 'la ';
                },   // definite article
                ipl: () => 'des ',
                dpl: () => 'les '
            },
        },
        pos:{
            adjective:{ 
                code: () => 'adjective',
                base: () => 'adj. '
            },
            'adverb/adverbial':{ 
                code: () => 'adverb',
                base:() => 'adv. '
            },
            conjunction:{
                code: () => 'conjunction',
                base:() => 'conj. '
            },
            pronoun:{
                code: () => 'pronoun',
                base:() => 'pron. '
            },
            'preposition/adpos.':{ 
                code: () => 'preposition',
                base:() => 'prep. ' },
        }
    },
    {   /* ENGLISH */ 
        name: 'English',
        code: 'EN',
        value:'english',
        rank:6,
        genders: {},
        pos:{
            noun:{
                code: () => 'noun',
                base:() => 'n. ',
                is: () => 'a ',
                ds: () => 'the ',
                ipl: () => 'some ',
                dpl: () => 'the '
            },
            adjective:{ 
                code: () => 'adjective',
                base: () => 'adj'
            },
            'adverb/adverbial':{
                code: () => 'adverb',
                base:() => 'adv.'
            },
            conjunction:{
                code: () => 'conjunction',
                base:() => 'conj.'
            },
            pronoun:{
                code: () => 'pronoun',
                base:() => 'pron.'
            },
            'preposition/adpos.':{
                code: () => 'preposition',
                base:() => 'prep.'
            },
        }
    },
    { /* GERMAN */
        name: 'Deutsch',
        code: 'DE',
        value:'german',
        rank:4,
        genders:{
            "\'der - männlich (Maskulinum)\'":{
                code: () => 'M',
                base: () => 'm. ',
                is: () => 'ein ',   // indefinite article
                ds: () => 'der ',   // definite article
                ipl: () => 'die ', // indefinite plural
                dpl: () => 'die ', // definit plural
            },
            "\'die - weiblich (Femininum)\'":{
                code: () => 'F',
                base: () => 'f. ',
                is: () => 'die ',
                ds: () => 'eine ',   // definite article
                ipl: () => ' ',
                dpl: () => 'die '
            },
            "\'das - sächlich (Neutrum)\'":{
                code: () => 'N',
                base: () => 'n. ',
                is: () => 'ein ',
                ds: () => 'ein',   // definite article
                ipl: () => ' ',
                dpl: () => 'die '
            },
        },
        pos: {
            adjective:{
                code: () => 'adjective',
                base: () => 'adj. '
            },
            'adverb/adverbial':{
                code: () => 'adverb',
                base: () => 'adv. '
            },
            conjunction:{ 
                code: () => 'conjunction',
                base: () => 'conj. '
            },
            pronoun:{ 
                code: () => 'pronoun',
                base: () => 'pron. '
            },
            'preposition/adpos.':{ 
                code: () => 'preposition',
                base: () => 'prep. '
            },
        },
        disabled: true
    },
    //{ name: 'Español', code: 'ES', value:'spanish', rank:8, disabled:true, },
];
export function getLanguage(code: LanguageCode){
    return languages.find((language) => language.code === code);
}
export function getLanguageByName(name: string){
    return languages.find((language) => language.name === name);
}
export default languages as Language[];
