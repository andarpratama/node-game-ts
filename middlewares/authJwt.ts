import { NextFunction, Response, Request, ErrorRequestHandler } from 'express';
import { User } from '../models/User'
import  dotenv from 'dotenv'
import * as jwt from 'jsonwebtoken';

class authJwt {
   static authentication(req: Request, res: Response, next: NextFunction) {
      const accessToken:any = req.headers.accesstoken
      if (!accessToken) {
         return res.status(401).json({msg: 'Missing access token..', success: false})
         // throw ({name: 'Missing_Token'})
      }
      
      const secretKey: string = (process.env.SECRET_KEY as string)
      jwt.verify(accessToken, secretKey, (err, decoded) => {
         if (err) {
            res.status(401).json({ msg: 'Invalid token..', success: false })
         }
         // id dari token dan dimasukan kedalam req
         (<any>req).userId = decoded.id
         next()
      })
   }

}

export default authJwt