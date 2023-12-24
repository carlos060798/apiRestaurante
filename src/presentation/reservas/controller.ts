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

  getReservationsByUser =  (req: Request, res: Response) => {
    const id = req.params.id;
    this.reservationService.getReservationsByUser(id).then((reservation) => {
      res.status(200).json(reservation);
    }).catch((error) => {
      res.status(400).json(error);
    });
  }

  aproveReservation =  (req: Request, res: Response) => {
    const idReserva = req.params.id; // Obtener el ID de la reserva desde los parámetros de la ruta
    const nuevoEstado = req.body.estado; // Obtener el nuevo estado desde el cuerpo de la solicitud

    console.log(nuevoEstado);
    this.reservationService.aproveReservation(idReserva,nuevoEstado).then((reservaUpdate) => {
      res.status(200).json({
        msg: 'Reserva actualizada correctamente',
        reservaUpdate});
    }).catch((error) => {
      res.status(400).json(error);
    });
  }


}
