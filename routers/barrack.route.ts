import { Router, Request, Response } from 'express'
import IRoutes from './IRoutes'
import barrackController from '../controllers/barrack.controller'
import authJwt from '../middlewares/authJwt'

class barrackRoute {
   router: Router
   constructor() {
      this.router = Router()
      this.auth()
      this.getAll()
      this.getOne()
      this.createBarrack()
      this.updateBarrack()
      this.deleteBarrack()
   }
   
   public auth(): void {
      this.router.use(authJwt.authentication)
   }
 
   public getAll(): void{
      this.router.get('/', barrackController.getAll)
   }

   public getOne(): void {
      this.router.get('/:id', barrackController.getOne)
   }

   public createBarrack(): void {
      this.router.post('/', barrackController.createBarrack)
   }

   public updateBarrack(): void {
      this.router.put('/:id', barrackController.updateBarrack)
   }

   public deleteBarrack(): void {
      this.router.delete('/:id', barrackController.deleteBarrack)
   }
}

export default new barrackRoute().router