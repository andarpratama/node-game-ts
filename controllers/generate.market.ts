import { Request, Response, ErrorRequestHandler } from 'express'
import Market from '../models/Market'
import cron from "node-cron"

class generateMarket{
   static generate() {
      const task = cron.schedule(
         "*/1 * * * *",
         () => {
            Market.updateMany({earn : {$lt : 20}}, { $inc: { earn: 1 } })
            .then(() => {})
            .catch((err) => {
               console.log(err)
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

export default generateMarket