import { Router } from "express";
import { ReservationController } from "./controller";
export class ReservationRoutes {
  static get routes(): Router {
    const router = Router();
    
    const constroller = new ReservationController();

    router.post("/:id", constroller.createReservation);
    router.get("/", constroller.getAllReservations);
    router.get("/:id", constroller.getOneReservation);
    router.put("/:id", constroller.updateReservation);
    router.delete("/:id", constroller.deleteReservation);

    // Listado de las reservas por usuario y cambio de estado
    router.get("/reservasuser/:id", constroller.getReservationsByUser);

    router.put("/aprove/:id", constroller.aproveReservation);

  

    return router;
  }
}
