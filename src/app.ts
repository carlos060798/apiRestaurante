import { envs } from './config/envs';
import { sequelize } from './data/sqlize/models/squlize';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

(async () => {
  await main();
})();

async function main() {
  try {
   
    sequelize.authenticate();

    const server = new Server({
      port: envs.PORT,
      routes: AppRoutes.routes,
    });

    server.start();
  } catch (error) {
    console.error('Error al iniciar la aplicación:', error);
    // Puedes manejar el error de otra manera según tus necesidades
  }
}