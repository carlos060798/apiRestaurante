import { Router } from 'express';

import { UsersRoutes } from './users/routes';


export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    
    router.use('/api/users',UsersRoutes.routes) 
    router.use('/api/reservations',UsersRoutes.routes)



    return router;
  }


}

