import { Schema, Types, models, model, Model } from 'mongoose'
import { PhraseSchema } from './Phrase'

// IMPORTANT: Please read the mongoose typescript documents before updating. 

type TranslationDocumentOverrides = {
    input: Types.Subdocument<Types.ObjectId> & Phrase,
    target: Types.DocumentArray<Phrase>
}

type TranslationModelType = Model<Translation, {}, TranslationDocumentOverrides>

export interface DBTranslation extends Translation{
    _id: Types.ObjectId,
}

const TranslationSchema = new Schema<DBTranslation, TranslationModelType>({
    _id: Schema.Types.ObjectId,
    input: PhraseSchema,
    target: [PhraseSchema],
})

export const TranslationModel = models.Translation ||
    model<Translation, TranslationModelType>('Translation', TranslationSchema);


