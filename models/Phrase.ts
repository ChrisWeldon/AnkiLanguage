import { Schema, Types, models, model, Document, PopulatedDoc } from 'mongoose'
// NOTE: Please read the mongoose typescript documents before updating. 
// Types is different than Schema.Types. Schema.Types is used for Schema defs
//  wheras Types is Typescript definitions

// TODO: Remove type defs once the AnkiLang library is imported

export interface DBPhrase extends Phrase {
    _id?: Types.ObjectId
}

export const PhraseSchema = new Schema<DBPhrase>({
    text: String,
    language: String,
    gender: String,
    pos: String
})

// Using subdocuments for translations
// export const PhraseModel = models.Phrase || model('Phrase', PhraseSchema);
