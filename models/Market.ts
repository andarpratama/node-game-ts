import mongoose, { Mongoose } from 'mongoose'
const Schema = mongoose.Schema

interface IMarket {
   name: string,
   earn: number,
   users: any
}

interface MarketDocument extends mongoose.Document{
   name: string,
   earn: number,
   users: any
}

interface MarketModelInterface extends mongoose.Model<MarketDocument>{
   build(attr: IMarket): MarketDocument
}

const marketSchema = new Schema({
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

const Market = mongoose.model<MarketDocument, MarketModelInterface>('Markets', marketSchema)

export default Market