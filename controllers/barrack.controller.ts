import { Request, Response, ErrorRequestHandler } from 'express'
import Barrack from '../models/Barrack'
import { User } from '../models/User'

class barrackController { 
   static getAll(req: Request, res: Response) {
      const idUser: any = (<any>req).userId
      console.log(idUser)
      User.findById(idUser)
         .populate('barracks')
         .then((result: any) => {
            const barrackId:any = result.resource.barracks
            Barrack.find({
               '_id': { $in: barrackId }
            }, function(err, ListOfBarrack) {
               res.status(200).json({ msg: 'Success find all barrack', onwerName: result.name, onwerID: result.id, totalMarket: ListOfBarrack.length , ListOfBarrack });
            });
         })
         .catch((err) => {
         res.status(500).json({ msg: 'Failed find all barrack' });
         });
  }
   

  static getOne(req, res) {
    const { id } = req.params;
    Barrack.findById(id)
      .then((result) => {
        res.status(201).json({ msg: `Success find barrack with id : ${id}`, data: result });
      })
      .catch((err) => {
        res.staus(500).json({ msg: `Failed find barrack with id : ${id}`, data: err });
      });
     
  }

  static async createBarrack(req, res) {
     const { name } = req.body
     const idUser:any = (<any>req).userId
     try {
        const users:any = await User.findById(idUser)
        let gold = users.resource.golds
        let food = users.resource.foods

        if (gold >= 30 && food >= 10) {
           const createBarrack = await Barrack.create({ name, users: idUser });
         //   const payment = await User.findByIdAndUpdate(users.id, {$inc: {'resource.golds': -30, 'resource.foods': -10}}, {new: true})
           const pushBarrack = await User.findByIdAndUpdate(users.id, {$push: {'resource.barracks': createBarrack.id}}, {new: true})
           res.status(200).json({msg: 'Success created barrack..', data: createBarrack})
         } else {
           res.status(500).json({msg: 'Gold or food is not enough..'})
        }
     } catch (err) {
         throw({name: 'Failed_created'})
     }
  } 

  static updateBarrack(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    Barrack
      .findByIdAndUpdate(id, { name }, { new: true })
      .then((result) => {
        res.status(201).json({msg: `Success updating barrack with id : ${id}`,data: result,});
      })
      .catch((err) => {
        res.status(500).json({ msg: `Failed updating barrack with id : ${id}`, data: err });
      });
  }
   
  


  static async deleteBarrack(req, res) {
     const id: any = req.params.id;
   //   User.findByIdAndUpdate(req.userID, { $pull: {"resource.markets": id } }, { new: true }).then()
     Barrack.findByIdAndDelete(id)
      .then((result) => {
        res.status(201).json({ msg: `Success deleting market with id : ${id}` });
      })
      .catch((err) => {
        res.status(500).json({ msg: 'Failed deleting market', data: err });
      });
  }

   
   static collect(req, res) {
      Barrack.findById(req.params.id)
      .then((foundBarrack:any) => {
         if (foundBarrack.earn !== 0) {
            Barrack.findByIdAndUpdate(foundBarrack.id, { $inc: { 'earn': - foundBarrack.earn } }, { new: true })
            .then((_) => {})
         } else {
            res.status(500).json({ msg: 'Gold in market is empty' })
            res.end()
         }

         User.findByIdAndUpdate(req.userID, {$inc: {'resource.golds': foundBarrack.earn}}, {new: true})
         .then((updatedUser:any)=>{
            if (updatedUser.resource.golds > 1000) {
               User.findByIdAndUpdate(req.userID, {'resource.golds': 1000}, {new: true})
            }
            res.status(200).json({msg: 'Success collect the market..', incrementGold: `+ ${foundBarrack.earn}`, dataGolds: updatedUser.resource.golds, dataFoods: updatedUser.resource.foods})
         })
         .catch((err)=> res.status(500).json({msg: 'Failed collect the market..', data: err}))
      })
      .catch((err)=> res.status(500).json({msg: 'Failed collect the market..'}))
      
   }

   
}

export default barrackController