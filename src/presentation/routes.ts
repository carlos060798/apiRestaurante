import { Router } from 'express';

import { UsersRoutes } from './users/routes';
import { ReservationRoutes } from './reservas/routes';


export class AppRoutes {
  


  static get routes(): Router {

    const router = Router();
    
    
    router.use('/api/users',UsersRoutes.routes) 
    router.use('/api/reservation',ReservationRoutes.routes)



    return router;
  }


}

