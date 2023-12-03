import { Router } from "express";
import { UsersController } from "./controller";
export class UsersRoutes{
    static get routes():Router{
        const router = Router();
        const controller = new UsersController();
        router.get('/',controller.getUsers);
        router.get('/:id',controller.getUser);
        router.post('/',controller.createUser);
        router.put('/:id',controller.updateUser);
        router.delete('/:id',controller.deleteUser);
        return router;
    }
}