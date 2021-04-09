import { Request, Response, ErrorRequestHandler } from 'express'
import Farm from '../models/Farm'
import { User } from '../models/User'

type Indexed = {
  [key: string]: any;
};


class marketController {
   static getAll(req: Request, res: Response) {
     const idUser:any = (<any>req).userId
     User.findById(idUser)
      .populate('farms')
      .then((result: any) => {
         const farmId = result.resource.farms
         Farm.find({
            '_id': { $in: farmId }
         }, function(err, ListOfFarm) {
            res.status(200).json({ msg: 'Success find all farms', onwerName: result.name, onwerID: result.id, totalMarket: ListOfFarm.length , ListOfFarm });
         });
      })
      .catch((err) => {
        res.status(500).json({ msg: 'Failed find all farms' });
      });
  }
   

  static getOne(req, res) {
    const { id } = req.params;
    Farm.findById(id)
      .then((result) => {
        res.status(201).json({ msg: `Success find farm with id : ${id}`, data: result });
      })
      .catch((err) => {
        res.staus(500).json({ msg: `Failed find farm with id : ${id}`, data: err });
      });
     
  }

  static async createFarm(req, res) {
     const { name } = req.body
     const idUser:any = (<any>req).userId
     try {
        const users:any = await User.findById(idUser)
        let gold = users.resource.golds
        let food = users.resource.foods

        if (gold >= 30 && food >= 10) {
           const createFarm = await Farm.create({ name, users: idUser });
         //   const payment = await User.findByIdAndUpdate(users.id, {$inc: {'resource.golds': -30, 'resource.foods': -10}}, {new: true})
           const pushFarm = await User.findByIdAndUpdate(users.id, {$push: {'resource.farms': createFarm.id}}, {new: true})
           res.status(200).json({msg: 'Success created farm..', data: createFarm})
         } else {
           res.status(500).json({msg: 'Gold or food is not enough..'})
        }
     } catch (err) {
         res.status(500).json({msg: 'Failed created farm..'})
     }
  } 

  static updateFarm(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    Farm
      .findByIdAndUpdate(id, { name }, { new: true })
      .then((result) => {
        res.status(201).json({msg: `Success updating farm with id : ${id}`,data: result,});
      })
      .catch((err) => {
        res.status(500).json({ msg: `Failed updating farm with id : ${id}`, data: err });
      });
  }


  static async deleteFarm(req, res) {
     const id: any = req.params.id;
   //   User.findByIdAndUpdate(req.userID, { $pull: {"resource.farms": id } }, { new: true }).then()
     Farm.findByIdAndDelete(id)
      .then((result) => {
        res.status(201).json({ msg: `Success deleting farm with id : ${id}` });
      })
      .catch((err) => {
        res.status(500).json({ msg: 'Failed deleting farm', data: err });
      });
  }

   
   static collect(req, res) {
      Farm.findById(req.params.id)
      .then((foundFarm:any) => {
         if (foundFarm.earn !== 0) {
            Farm.findByIdAndUpdate(foundFarm.id, { $inc: { 'earn': - foundFarm.earn } }, { new: true })
            .then((_) => {})
         } else {
            res.status(500).json({ msg: 'Gold in market is empty' })
            res.end()
         }

         User.findByIdAndUpdate(req.userID, {$inc: {'resource.golds': foundFarm.earn}}, {new: true})
         .then((updatedUser:any)=>{
            if (updatedUser.resource.golds > 1000) {
               User.findByIdAndUpdate(req.userID, {'resource.golds': 1000}, {new: true})
            }
            res.status(200).json({msg: 'Success collect the market..', incrementGold: `+ ${foundFarm.earn}`, dataGolds: updatedUser.resource.golds, dataFoods: updatedUser.resource.foods})
         })
         .catch((err)=> res.status(500).json({msg: 'Failed collect the market..', data: err}))
      })
      .catch((err)=> res.status(500).json({msg: 'Failed collect the market..'}))
      
   }

   
}

export default marketController