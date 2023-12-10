import { Request, Response } from "express";

import { ReservationServices  } from "../services/reservation-service";


export class ReservationController {
  private reservationService: ReservationServices ;

  constructor() {
    this.reservationService = new ReservationServices ();
  }

  createReservation =  (req: Request, res: Response) => {
    const  iduser = req.params.id
    const data = {...req.body,
      usuarioId: iduser
    }
    
       this.reservationService.create(data).then((reservation) => {
         res.status(200).json( {msg:"reserva creada" ,reservation});
       }).catch((error) => {
         res.status(400).json(error);
       });
      
  }
}
