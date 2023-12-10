import { Router } from "express";
import { ReservationController } from "./controller";
export class ReservationRoutes {
  static get routes(): Router {
    const router = Router();
    
    const constroller = new ReservationController();

    router.post("/:id", constroller.createReservation); 

  

    return router;
  }
}
