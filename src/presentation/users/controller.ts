import { Request, Response } from 'express';
import { UsersServices } from '../services/users-services';

export class UsersController {
    public readonly usersServices: UsersServices;

    constructor(usersServices: UsersServices) {
        this.usersServices = usersServices;
    }

    createUser=(req: Request, res: Response) =>{
        const data = { ...req.body };
        console.log(data);
        this.usersServices.create(data)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(400).json(error);
            });
    }

    getUsers=(req: Request, res: Response) =>{
        this.usersServices.getAll()
            .then(response => {
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(400).json(error);
            });
    } 

    getUser=(req: Request, res: Response) =>{
        this.usersServices.getOne(req.params.id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(400).json(error);
            });
    }

    updateUser=(req: Request, res: Response) =>{
        this.usersServices.update(req.params.id, req.body)
            .then(userUpdate => {
                res.status(200).json({
                    message: 'Usuario actualizado correctamente',
                    userUpdate
                
                });
            })
            .catch(error => {
                res.status(400).json(error);
            });
    }

    deleteUser=(req: Request, res: Response) =>{
        this.usersServices.delete(req.params.id)
            .then(user => {
                res.status(200).json({
                    message: 'Usuario eliminado correctamente',
                    user
                
                });
            })
            .catch(error => {
                res.status(400).json(error);
            });
    }
  
}