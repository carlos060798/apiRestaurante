// models/Reserva.ts

import { Table, Column, Model, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
@Table
 class Usuario extends Model {
  @Column
  nombres!: string;

  @Column
  tipoDeIdentificacion!: string;

  @Column
  identificacion!: string;

  @Column
  correo!: string;

  @Column
  password!: string;

  @Column({
    defaultValue: 'user', // Valor predeterminado para el campo 'rol'
  })
  rol!: string;

  @HasMany(() => Reserva)
  reservas!: Reserva[];
}
@Table
 class Reserva extends Model {
  @Column
  fechaReserva!: Date;

  @Column
  tipoReserva!: string;

  @Column
  cantidadPersonas!: number;

  @Column({
    defaultValue: 'pendiente', // Valor predeterminado para el campo 'estado'
  })
  estado!: string;

  @ForeignKey(() => Usuario)
  @Column
  usuarioId!: number;

  @BelongsTo(() => Usuario)
  usuario!: Usuario;
}

export { Usuario, Reserva };