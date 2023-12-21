import { Sequelize } from 'sequelize-typescript';
import { Usuario,Reserva } from '../models/models'; // Ajusta la ruta según tu estructura

const sequelize = new Sequelize({
  database: 'appreservas', // Nombre de la base de datos
  username: 'postgres',    // Nombre de usuario
  password: 'admin',       // Contraseña (reemplaza con tu contraseña real)
  host: 'localhost',       // Host de la base de datos
  port: 5432,              // Puerto de PostgreSQL
  dialect: 'postgres',
  models: [Usuario, Reserva], // Registra tus modelos aquí
  define: {
    timestamps: true,
    underscored: true,
  },
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