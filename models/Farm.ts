import mongoose, { Mongoose } from 'mongoose'
const Schema = mongoose.Schema

interface IFarm {
   name: string,
   earn: number,
   users: any
}

interface FarmDocument extends mongoose.Document{
   name: string,
   earn: number,
   users: any
}

interface FarmModelInterface extends mongoose.Model<FarmDocument>{
   build(attr: IFarm): FarmDocument
}

const farmSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   earn: {
      type: Number,
      required: true,
      default: 0
   },
   users: {type: mongoose.Types.ObjectId, ref: 'Users'}
})

const Farm = mongoose.model<FarmDocument, FarmModelInterface>('Farms', farmSchema)

export default Farm