
import { Schema, Types, models, model, Document, PopulatedDoc } from 'mongoose'
// NOTE: Please read the mongoose typescript documents before updating. 
// Types is different than Schema.Types. Schema.Types is used for Schema defs
//  wheras Types is Typescript definitions


export interface UserType {
    _id?: Types.ObjectId,
    username: string,
    email: string,
    password: string
}

const userSchema = new Schema<UserType>({
    _id: Schema.Types.ObjectId,
    username: String,
    email: String,
    password: String
})


export const UserModel = models.User || model('User', userSchema);
