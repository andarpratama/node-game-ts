import { Request, Response, ErrorRequestHandler } from 'express'
const barrackModel = require('../models/Barrack')
const cron = require("node-cron");

class generateFarm{
   static generate(res: Response) {
      const task = cron.schedule(
         "*/1 * * * *",
         () => {
            barrackModel.updateMany({earn : {$lt : 20}}, { $inc: { earn: 1 } })
               .then(() => {})
               .catch((err:ErrorRequestHandler) => {
               res.send(err);
               });
         },
         {
            scheduled: true,
            timezone: "Asia/Jakarta",
         }
         );
      task.start();
   }
}

export default generateFarm