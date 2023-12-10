
import { Reserva } from "../../data/sqlize/models/models";




interface dataReservation {

    fechaReserva: Date;
    tipoReserva: string;
    cantidadPersonas: number;
    estado: string;
    usuarioId: number;
}



export class ReservationServices {
  async create(data: dataReservation) {
    const { fechaReserva, tipoReserva, cantidadPersonas, estado,usuarioId } = data;
    try {
      const reservation = await Reserva.create({
        fechaReserva,
        tipoReserva,
        cantidadPersonas,
        estado,
        usuarioId
      });
      console.log(reservation);
      return reservation;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const reservations = await Reserva.findAll();
      return reservations;
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id: string) {
    try {
      const reservation = await Reserva.findByPk(id);
      return reservation;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, data: dataReservation) {
    const { fechaReserva, tipoReserva, cantidadPersonas, estado } = data;
    try {
      const reservation = await Reserva.update(
        {
          fechaReserva,
          tipoReserva,
          cantidadPersonas,
          estado,
        },
        {
          where: {
            id,
          },
        }
      );

      console.log(reservation);
      return reservation;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: string) {
    try {
      const reservation = await Reserva.destroy({
        where: {
          id,
        },
      });
      return reservation;
    } catch (error) {
      console.log(error);
    }
  }
}