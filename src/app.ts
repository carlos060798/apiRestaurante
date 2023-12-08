import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { DatabaseConnector } from './data/sqlize/bd-connection';

(async () => {
  await main();
})();

async function main() {
  try {

    const databaseConnector = new DatabaseConnector(envs.BASE_URL);
    await databaseConnector.conectar();
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