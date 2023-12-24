import AuthService from "../services/auth-service";
import { Request, Response } from "express";

export class AuthController {
    private readonly authService: AuthService
  constructor() {
    this.authService = new AuthService();
  }

  Authenticate = async (req: Request, res: Response) => {
    const { correo, password } = req.body;
    console.log(correo, password);
   this.authService.authenticate(correo, password).then((user) => {
     res.status(200).json(user);
   }).catch((error) => {
    console.log(error);
     res.status(400).json(error);
   });
  }
 
  Profile =  (req: Request, res: Response) => {
    const { id } = req.params;
    
    this.authService.getProfile(id).then((user) => {
      res.status(200).json(user);
    }).catch((error) => {
      res.status(400).json(error);
    });
   
    
  }
}

