import { Request, Response } from "express";

export class ReservationController{

constructor(){}


getReservations(req: Request, res: Response){

  res.json({
    msg: 'getReservations'
  
  })
}

getReservation(req: Request, res: Response){

  res.json({
    msg: 'getReservation'
  
  })}

createReservation(req: Request, res: Response){
    
      res.json({
     msg: 'createReservation'
      
      })}

updateReservation(req: Request, res: Response){
     
        res.json({
      msg: 'updateReservation'
        
        })}

  
deleteReservation(req: Request, res: Response){
         
          res.json({
        msg: 'deleteReservation'
          
          })
}

confirmReservation(req: Request, res: Response){
           
            res.json({
          msg: 'confirmReservation'
            
            })
}







}


