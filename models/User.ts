import mongoose, { Mongoose } from 'mongoose'
const Schema = mongoose.Schema

interface IUser {
   name: string,
   email: string,
   password: string,
   resource: {
      golds: Number,
      foods: Number,
      soldiers: Number,
      medal: string[],
      markets: string[],
      farms: string[],
      barracks: string[]
   }
}

interface UserDocument extends mongoose.Document{
   name: string,
   email: string,
   password: string,
   resource: {
      golds: Number,
      foods: Number,
      soldiers: Number,
      medal: string[],
      markets: string[],
      farms: string[],
      barracks: string[]
   }
}

interface UserModelInterface extends mongoose.Model<UserDocument>{
   build(attr: IUser): UserDocument
}

const usersSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   resource: {
      golds: {
         type: Number,
         minLength: 0,
         maxLength: 1000,
         default: 100
      },
      foods: {
         type: Number,
         minLength: 0,
         maxLength: 1000,
         default:100
      },
      soldiers: {
         type: Number,
         minLength: 0,
         maxLength: 500,
         default:0
      },
      medal: {
         type: Number,
         default: 0
      },
      markets: [{
         type: mongoose.Types.ObjectId, ref: 'Market'
      }],
      farms: [{
         type: mongoose.Types.ObjectId, ref: 'Farm'
      }],
      barracks: [{
         type: mongoose.Types.ObjectId, ref: 'Barrack'
      }]
   }
})

const User = mongoose.model<UserDocument, UserModelInterface>('Users', usersSchema)





export {User}