import { Request, Response, ErrorRequestHandler } from 'express'
import Market from '../models/Market'
import { User } from '../models/User'

type Indexed = {
  [key: string]: any;
};


class marketController {
   static getAll(req: Request, res: Response) {
     const idUser:any = (<any>req).userId
     User.findById(idUser)
      .populate('markets')
      .then((result: any) => {
         const marketId = result.resource.markets
         Market.find({
            '_id': { $in: marketId }
         }, function(err, ListOfMarket) {
            res.status(200).json({ msg: 'Success find all markets', onwerName: result.name, onwerID: result.id, totalMarket: ListOfMarket.length , ListOfMarket });
         });
      })
      .catch((err) => {
        res.status(500).json({ msg: 'Failed find all markets' });
      });
  }
   

  static getOne(req, res) {
    const { id } = req.params;
    Market.findById(id)
      .then((result) => {
        res.status(201).json({ msg: `Success find market with id : ${id}`, data: result });
      })
      .catch((err) => {
        res.staus(500).json({ msg: `Failed find market with id : ${id}`, data: err });
      });
     
  }

  static async createMarket(req, res) {
     const { name } = req.body
     const idUser:any = (<any>req).userId
     try {
        const users:any = await User.findById(idUser)
        let gold = users.resource.golds
        let food = users.resource.foods

        if (gold >= 30 && food >= 10) {
           const createMarket = await Market.create({ name, users: idUser });
         //   const payment = await User.findByIdAndUpdate(users.id, {$inc: {'resource.golds': -30, 'resource.foods': -10}}, {new: true})
           const pushMarket = await User.findByIdAndUpdate(users.id, {$push: {'resource.markets': createMarket.id}}, {new: true})
           res.status(200).json({msg: 'Success created market..', data: createMarket})
         } else {
           res.status(500).json({msg: 'Gold or food is not enough..'})
        }
     } catch (err) {
         throw({name: 'Failed_created'})
     }
  } 

  static updateMarket(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    Market
      .findByIdAndUpdate(id, { name }, { new: true })
      .then((result) => {
        res.status(201).json({msg: `Success updating market with id : ${id}`,data: result,});
      })
      .catch((err) => {
        res.status(500).json({ msg: `Failed updating market with id : ${id}`, data: err });
      });
  }
   

  static async deleteMarket(req: Request, res: Response) {
      const id:string = req.params.id;
      const idUser:any = (<any>req).userId
      // User.findByIdAndUpdate(idUser, { $set: {"resource.markets": id } }, { new: true }).then()
      User.findById(idUser).then((result:any) => {
         console.log(result)
         return User.deleteOne({ 'resource.markets': id }).then(() => {
            res.status(200).json({ msg: `Success deleting market with id : ${id}` });
         })
      })
      // Market.findByIdAndDelete(id)
      // .then((result) => {
      //   res.status(201).json({ msg: `Success deleting market with id : ${id}` });
      // })
      // .catch((err) => {
      //   res.status(500).json({ msg: 'Failed deleting market', data: err });
      // });
  }

   
   static collect(req, res) {
      const idUser:any = (<any>req).userId
      Market.findById(req.params.id)
      .then((foundMarket:any) => {
         if (foundMarket.earn !== 0) {
            Market.findByIdAndUpdate(foundMarket.id, { $inc: { 'earn': - foundMarket.earn } }, { new: true })
            .then((_) => {})
         } else {
            res.status(500).json({ msg: 'Gold in market is empty' })
            res.end()
         }

         User.findByIdAndUpdate(idUser, {$inc: {'resource.golds': foundMarket.earn}}, {new: true})
         .then((updatedUser:any)=>{
            if (updatedUser.resource.golds > 1000) {
               User.findByIdAndUpdate(idUser, {'resource.golds': 1000}, {new: true})
            }
            res.status(200).json({msg: 'Success collect the market..', incrementGold: `+ ${foundMarket.earn}`, dataGolds: updatedUser.resource.golds, dataFoods: updatedUser.resource.foods})
         })
         .catch((err)=> res.status(500).json({msg: 'Failed collect the market..', data: err}))
      })
      .catch((err)=> res.status(500).json({msg: 'Failed collect the market..'}))
      
   }

   
}

export default marketController