import { Router, Request, Response } from 'express'
import IRoutes from './IRoutes'
import farmController from '../controllers/farm.controller'
import authJwt from '../middlewares/authJwt'

class farmRoute {
   router: Router
   constructor() {
      this.router = Router()
      this.auth()
      this.getAll()
      this.getOne()
      this.createFarm()
      this.updateFarm()
      this.deleteFarm()
   }
   
   public auth(): void {
      this.router.use(authJwt.authentication)
   }

   public getAll(): void{
      this.router.get('/', farmController.getAll)
   }

   public getOne(): void {
      this.router.get('/:id', farmController.getOne)
   }

   public createFarm(): void {
      this.router.post('/', farmController.createFarm)
   }
 
   public updateFarm(): void {
      this.router.put('/:id', farmController.updateFarm)
   }

   public deleteFarm(): void {
      this.router.delete('/:id', farmController.deleteFarm)
   }
}

export default new farmRoute().router