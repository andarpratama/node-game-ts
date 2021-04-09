import { User } from '../models/User'
import { Request, Response, ErrorRequestHandler } from 'express'
import  dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

class auth {
   constructor() {
      dotenv.config()
   }
   
   static async register(req:Request, res:Response) {

      const name = req.body.name
      const email = req.body.email
      const password = req.body.password

      try {
         if (name && email && password) {
            const newUser = await User.create({
               name: name,
               email: email,
               password: bcrypt.hashSync(password, 8),
            })
            res.status(201).json({msg: 'Succecc create your account',data: newUser})
         } else {
            res.status(500).json({msg: 'Please input name, email and password'})
         }
      } catch {
         res.status(500).json({data: 'Error'})
      }
      
  }
   
   static login(req:Request, res:Response){
      User.findOne({ email: req.body.email })
      .then((result) => {
        if (!result) {
          return res.status(401).json({success: false,msg: 'Users with this email and password is wrong',});
        }
         
        let passwordIsValid = bcrypt.compareSync(req.body.password, result.password);
        if (!passwordIsValid) {
          return res.status(401).json({success: false,msg: 'Users with this email and password is wrong',});
        }
         
         const secretKey: string = (process.env.SECRET_KEY as string)

        let token:any = jwt.sign({ id: result.id }, secretKey , {
          expiresIn: '1hr',
        });
        res.status(200).json({ msg: `Welcome ${result.name}..`, data: result, accessToken: token });
      })
      .catch((err) => {
        res.status(500).json({ msg: 'Failed login', data: err });
      });
   }

}

export default auth
