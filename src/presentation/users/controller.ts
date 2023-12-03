import { Request, Response } from 'express';
export class UsersController{

    constructor(){}

    getUsers(req: Request, res: Response){

      res.json({
        msg: 'getUsers'
      
      })
    }

    getUser(req: Request, res: Response){

      res.json({
        msg: 'getUser'
      
      })}

    createUser(req: Request, res: Response){
        
          res.json({
         msg: 'createUser'
          
          })}

    updateUser(req: Request, res: Response){
         
            res.json({  msg: 'updateUser' })}  

    deleteUser(req: Request, res: Response){
              
              res.json({
            msg: 'deleteUser'
              
              })
            }
  

}