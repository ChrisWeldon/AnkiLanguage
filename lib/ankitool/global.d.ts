/* Global Type Declartions
 *
 * @author Chris Evans
 */
import { Language, LanguageCode } from './langs';

declare global {
    // Indefinite Singular | Definite Singular | No added article
    type ArticleCode = 'is' | 'ds' | 'base';


    // TODO: input_lang and target_lang should be LanguageCode only
    interface WordRequestOptions {
        input_lang: LanguageCode,
        target_lang: LanguageCode,
        deck_name: string,
        opts: string[], // TODO Make rigorous with better option codes
        article: ArticleCode
    }

    // Translations are not always words
    type PartOfSpeech = 'verb'| 'noun' | 'adverb' | 'adjective' | 'pronoun' |
                            'preposition' | 'conjunction' | 'interjection' |
                            'sentence'

    // Deprecated
    type Gender = 'M' | 'F' | 'N'


    interface Phrase{
        text: string,
        language: LanguageCode,
        gender?: string | undefined,
        pos?: PartOfSpeech | PartOfSpeech[]
    }
    
    interface Translation {
        input: Phrase,
        target: Phrase[]
    }

    type TranslationResponse = Translation[];

    export type Translator = {
        description: string,
        (word: string, request: WordRequestOptions) : Promise<TranslationResponse>
    }

}

