import mongoose from 'mongoose'
import generateMarket from '../controllers/generate.market'

class mongoDB {
   public connectDB(): void{
      const pathURL = 'mongodb://localhost/assgntyp2'
      const connectOption = { useNewUrlParser: true, useUnifiedTopology: true }
      mongoose.connect(pathURL, connectOption)
      
      // cecking mongodb
      const db = mongoose.connection
      db.on('error', console.error.bind(console, 'Connection error :'))
      db.once('open', () => {
         generateMarket.generate()
         console.log('Database connected..')
      })
   }
}

export default new mongoDB().connectDB