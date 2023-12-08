import { Router } from "express";
import { UsersController } from "./controller";
import { UsersServices } from '../services/users-services';

export class UsersRoutes{
    static get routes():Router{
        const router = Router();
        const  service=  new  UsersServices();
        const controller = new UsersController(service);
        router.post('/',controller.createUser);

        router.get('/',controller.getUsers);
        router.get('/:id',controller.getUser);
        router.put('/:id',controller.updateUser);
        router.delete('/:id',controller.deleteUser);
        return router;
    }
}