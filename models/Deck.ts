import { Schema, Types, models, model, Document, PopulatedDoc } from 'mongoose'
import { DBTranslation } from './Translation';
import type { LanguageCode } from "../lib/ankitool/langs"
// NOTE: Please read the mongoose typescript documents before updating. 
// Types is different than Schema.Types. Schema.Types is used for Schema defs
//  wheras Types is Typescript definitions

// TODO: Remove type defs once the AnkiLang library is imported

export interface DeckType extends Document{
    _id?: Types.ObjectId,
    translations: PopulatedDoc<Document<Types.ObjectId> & DBTranslation>[],
    title: string,
    value: string,
    inlang: LanguageCode,
    outlang: LanguageCode,
    owner: Types.ObjectId,
}

const deckSchema = new Schema<DeckType>({
    title: String,
    value: String,
    translations: [{ type: 'ObjectId' , ref: 'Translation'}],
    inlang: String,
    outlang: String,
    owner: {type: 'ObjectId', ref: 'User'}
})


export const DeckModel = models.Deck || model<DeckType>('Deck', deckSchema);
