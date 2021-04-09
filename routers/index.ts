import { Router, Request, Response } from 'express'
import IRoutes from './IRoutes'
import authRoute from './auth.routes'
import userRoute from './user.route'
import marketRoute from './market.route'
import farmRoute from './farm.route'
import barrackRoute from './barrack.route'

class Routes {
   router: Router
   constructor() {
      this.router = Router()
      this.routes()
      this.auth()
      this.user()
      this.market()
      this.farm()
      this.barrack()
   }

   public routes(): void{
      this.router.get('/', (req: Request, res: Response) => {
         res.status(200).json({msg: 'Welcome.. login to play the game'})
      })
   }
   
   public auth(): void{
      this.router.use('/auth', authRoute)
   }

   public user(): void{
      this.router.use('/user', userRoute)
   }

   public market(): void{
      this.router.use('/market', marketRoute)
   }

   public farm(): void{
      this.router.use('/farm', farmRoute)
   }

   public barrack(): void{
      this.router.use('/barrack', barrackRoute)
   }
}

export default new Routes().router