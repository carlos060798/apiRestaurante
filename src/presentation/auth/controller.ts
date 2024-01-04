import { Request, Response } from "express";
import AuthService from "../services/auth-service";
import { envs } from "../../config/envs";


export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {

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

  Profile = (req: Request, res: Response) => {
    const { id } = req.params;

    this.authService.getProfile(id).then((user) => {
      res.status(200).json(user);
    }).catch((error) => {
      res.status(400).json(error);
    });


  }

  logaut = (req: Request, res: Response) => {
    const { token } = req.params;

    this.authService.validateToken(token).then((user) => {
      res.status(200).json(user);
    }).catch((error) => {
      res.status(400).json(error);
    });

  }

  repeatEmail = (req: Request, res: Response) => {
    const { token } = req.params;
    const {asunto,mensaje,link}= req.body;
    const opciones= {
      asunto,
      mensaje,
      link,
    };
    this.authService.repeatEmail(token,opciones).then((email) => {
      res.status(200).json({msg:"correo reeneviado",email});
    }).catch((error) => {
      console.log(error);
      res.status(400).json({msg:"error de reenvio de correo",error});
    });

  }

  changePassword = (req: Request, res: Response) =>{
    const { id } = req.params;
    const {password}= req.body;
    this.authService.changePassword(id,password).then((user) => {
      res.status(200).json(user);
    }).catch((error) => {
      res.status(400).json(error);
    });
  }
  
}