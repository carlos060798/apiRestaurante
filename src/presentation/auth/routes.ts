
import { Router } from "express";
import { AuthController}  from "./controller";

import { EmailService } from '../services/emai.service';
import { envs } from "../../config/envs";
import AuthService from "../services/auth-service";

export class AuthRoutes  {
  static get routes(): Router {
    const router = Router();
    const emailService= new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
    )
    const  serviceauth = new AuthService(emailService);
    const controller= new AuthController(serviceauth);

    router.post("/login", controller.Authenticate);
    router.get("/profile/:id", controller.Profile);
    router.post("/repeatemail/:token", controller.repeatEmail);
    router.get("/valdateseccion/:token", controller.logaut);
    router.put("/changepassword/:id", controller.changePassword);
    
   
    return router;
  }
}