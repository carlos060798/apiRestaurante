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

  getAllReservations =  (req: Request, res: Response) => {
    this.reservationService.getAll().then((reservations) => {
      res.status(200).json(reservations);
    }).catch((error) => {
      res.status(400).json(error);
    });
  }
  
  getOneReservation =  (req: Request, res: Response) => {
    const id = req.params.id;
    this.reservationService.getOne(id).then((reservation) => {
      res.status(200).json(reservation);
    }).catch((error) => {
      res.status(400).json(error);
    });
  }
  
  updateReservation =  (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    this.reservationService.update(id, data).then((reservation) => {
      res.status(200).json(reservation);
    }).catch((error) => {
      res.status(400).json(error);
    });
  }
  
  deleteReservation =  (req: Request, res: Response) => {
    const id = req.params.id;
    this.reservationService.delete(id).then((reservation) => {
      res.status(200).json(reservation);
    }).catch((error) => {
      res.status(400).json(error);
    });
  }
}
