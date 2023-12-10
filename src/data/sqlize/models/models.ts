// models.ts

import { DataTypes, Model } from 'sequelize';
import { DatabaseConnector } from '../bd-connection';
import { envs } from '../../../config/envs';

// Base de datos
export const databaseConnector = new DatabaseConnector(envs.BASE_URL);

// Modelo Usuario
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

// Modelo Reserva
class Reserva extends Model {
  public id!: number;
  public fechaReserva!: Date;
  public tipoReserva!: string;
  public cantidadPersonas!: number;
  public estado!: string;

  // Añade esta línea para la relación con Usuario
  public usuarioId!: number;
}

Reserva.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fechaReserva: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tipoReserva: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cantidadPersonas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: 'PENDIENTE',
    },
    // Agrega la clave foránea
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: databaseConnector.obtenerInstancia(),
    modelName: 'Reserva',
  }
);

// Relación uno a muchos con Reserva
Usuario.hasMany(Reserva, { foreignKey: 'usuarioId', onDelete: 'CASCADE' });
// Relación con Usuario
Reserva.belongsTo(Usuario, { foreignKey: 'usuarioId' });

export { Usuario, Reserva };