import { Sequelize } from 'sequelize-typescript';
import { Usuario,Reserva } from '../models/models'; // Ajusta la ruta según tu estructura
import { envs } from '../../../config/envs';

console.log(envs.DATABASE_URL);
const sequelize = new Sequelize(envs.DATABASE_URL ,{
  define: {
    timestamps: true,
    underscored: true,
  },
  models: [Usuario, Reserva], // Registra tus modelos aquí
});
// levantamiento de la base de datos  para ver si esta conectada
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error: any) => {
    console.error('Error al conectar a la base de datos:', error);
  });

  // se debe usar este metodo para que se  sincronice la base de datos con los modelos de la base de datos
  sequelize.sync().then(() => {
    console.log('Tablas sincronizadas correctamente');
  });

export { sequelize };