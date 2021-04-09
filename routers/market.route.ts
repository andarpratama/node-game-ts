import { Router, Request, Response } from 'express'
import IRoutes from './IRoutes'
import marketController from '../controllers/market.controller'
import authJwt from '../middlewares/authJwt'

class marketRoute {
   router: Router
   constructor() {
      this.router = Router()
      this.auth()
      this.getAll()
      this.getOne()
      this.createMarket()
      this.updateMarket()
      this.deleteMarket()
   }
   
   public auth(): void {
      this.router.use(authJwt.authentication)
   }

   public getAll(): void{
      this.router.get('/', marketController.getAll)
   }

   public getOne(): void {
      this.router.get('/:id', marketController.getOne)
   }

   public createMarket(): void {
      this.router.post('/', marketController.createMarket)
   }

   public updateMarket(): void {
      this.router.put('/:id', marketController.updateMarket)
   }

   public deleteMarket(): void {
      this.router.delete('/:id', marketController.deleteMarket)
   }
}

export default new marketRoute().router