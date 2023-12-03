import { envs } from './config/envs';
import { PosgressDatabase } from './data/sqlize/bd-connection';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';



(async()=> {
  main();
})();


async function main() {

 await PosgressDatabase.conectar( envs.BASE_URL)

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}