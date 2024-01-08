import express, { Router } from 'express';
import  cors from 'cors';
interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}


export class Server {

  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes, public_path = 'public' } = options;
    this.port = port;
    this.routes = routes;
  }

  
  
  async start() {
    

    //* Middlewares
    this.app.use( express.json() ); // raw
    this.app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded

  //* configurcation CORS
  const dominiosPermitidos = ["https://front-restaurante.vercel.app"];

  const corsOptions = {
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
      if (!origin || dominiosPermitidos.indexOf(origin) !== -1) {
        // El origen del request está permitido o es undefined (request local)
        callback(null, true);
      } else {
        callback(new Error('No está permitido por CORS'));
      }
    },
  };

  this.app.use(cors(corsOptions));

    //* Routes
    this.app.use( this.routes );

    //* SPA /^\/(?!api).*/  <== Únicamente si no empieza con la palabra api
    
    

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    });

  }

  public close() {
    this.serverListener?.close();
  }

}
