import  jwt from 'jsonwebtoken'
import { envs } from './envs'

const JwtKey = envs.JWT_SECRET

export class jwtAdapter{
  
    static generateToken(payload: any,duration:string="2h"){
      return new Promise((resolve)=>{
        jwt.sign(payload,JwtKey,{expiresIn:duration},(err,token)=>{
          if(err)  return resolve(null)
          resolve (token)
          
        })
      })
  
  
    }
   
      static validationToken<T>(token: string):Promise<T| null>{
         
        return new Promise((resolve)=>{
          jwt.verify(token,JwtKey,(err,decoded)=>{
            if(err) return resolve(null)
            resolve(decoded as T)
          })
        })
      } 

      static async extractUserIdFromToken(token: string): Promise<string | null> {
        try {
          const decodedToken = await jwtAdapter.validationToken<{ id: string }>(token);
    
          if (!decodedToken) {
            throw new Error('Token inválido');
          }
    
          return decodedToken.id;
        } catch (error) {
          console.error('Error al extraer el userId del token:', error);
          return null;
        }
      }
  }