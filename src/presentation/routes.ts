import { Router } from 'express';

import { UsersRoutes } from './users/routes';
import { ReservationRoutes } from './reservas/routes';
import { AuthRoutes } from './auth/routes';


export class AppRoutes {



  static get routes(): Router {

    const router = Router();


    router.use('/api/users', UsersRoutes.routes)
    router.use('/api/reservation', ReservationRoutes.routes)
    router.use('/api/auth', AuthRoutes.routes)



    return router;
  }


}

