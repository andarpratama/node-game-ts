import mongoose, { Mongoose } from 'mongoose'
const Schema = mongoose.Schema

interface IBarrack {
   name: string,
   earn: number,
   users: any
}

interface BarrackDocument extends mongoose.Document{
   name: string,
   earn: number,
   users: any
}

interface BarrackModelInterface extends mongoose.Model<BarrackDocument>{
   build(attr: IBarrack): BarrackDocument
}

const barrackSchema = new Schema({
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

const Barrack = mongoose.model<BarrackDocument, BarrackModelInterface>('Barracks', barrackSchema)

export default Barrack