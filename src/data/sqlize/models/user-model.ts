import { DataTypes, Model, Sequelize } from 'sequelize';
import { DatabaseConnector } from '../bd-connection'; // Asegúrate de proporcionar la ruta correcta
import {envs} from '../../../config/envs';



const databaseConnector = new DatabaseConnector(envs.BASE_URL); // Asegúrate de proporcionar la URL correcta

class Usuario extends Model {
  public id!: number;
  public nombres!: string;
  public tipoDeIdentificacion!: string;
  public identificacion!: string;
  public correo!: string;
  public password!: string;
  public rol!: string;
}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipoDeIdentificacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    identificacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
  },
  {
    sequelize: databaseConnector.obtenerInstancia(),
    modelName: 'Usuario',
  }
);

// Función para sincronizar el modelo con la base de datos y crear la tabla
const syncUsuarioModel = async () => {
  try {
    await Usuario.sync({ force: false }); // El parámetro 'force' a false evita que se elimine la tabla si ya existe
    console.log('La tabla Usuario ha sido creada (si no existía) o sincronizada correctamente.');
  } catch (error) {
    console.error('Error al sincronizar la tabla Usuario:', error);
  }
};

// Llama a la función para sincronizar el modelo con la base de datos
syncUsuarioModel();

export default Usuario;