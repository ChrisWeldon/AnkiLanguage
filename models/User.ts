import { Schema, Types, models, model, Document, PopulatedDoc } from 'mongoose'
import { DeckType } from './Deck';
// NOTE: Please read the mongoose typescript documents before updating. 
// Types is different than Schema.Types. Schema.Types is used for Schema defs
//  wheras Types is Typescript definitions


export interface UserType {
    _id?: Types.ObjectId,
    username: string,
    email: string,
    password: string,
    decks: PopulatedDoc<Document<Types.ObjectId> & DeckType >[],
}

const userSchema = new Schema<UserType>({
    _id: Schema.Types.ObjectId,
    username: {type: String, unique: true, dropDups: true, required: true},
    email: {type: String, unique: true, dropDups: true, required: true},
    password: String,
    decks: [{ type: 'ObjectId' , ref: 'Deck'}],
})


export const UserModel = models.User || model('User', userSchema);
