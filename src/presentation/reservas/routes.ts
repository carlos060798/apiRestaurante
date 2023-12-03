import { Router } from "express";
import { ReservationController } from "./controller";
export class ReservationRoutes {
  static get routes(): Router {
    const router = Router();

    const constroller = new ReservationController();

    router.get("/", constroller.getReservations);
    router.get("/:id", constroller.getReservation);
    router.post("/", constroller.createReservation);
    router.put("/:id", constroller.updateReservation);
    router.delete("/:id", constroller.deleteReservation);
    router.put("/:id/confirm", constroller.confirmReservation);

    return router;
  }
}
