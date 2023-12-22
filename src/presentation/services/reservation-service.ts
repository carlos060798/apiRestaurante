
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
    const { fechaReserva, tipoReserva, cantidadPersonas, usuarioId } = data;
    try {
      const reservation = await Reserva.create({
        fechaReserva,
        tipoReserva,
        cantidadPersonas,
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
   
  const  reserva= await Reserva.findByPk(id);

  if (!reserva) throw new Error("Reserva no existe");

   // Comprobar cada campo nuevo y actualizar si es diferente
   if (data.fechaReserva && data.fechaReserva !== reserva.fechaReserva) {
    reserva.fechaReserva = data.fechaReserva;
  }

  if (data.tipoReserva && data.tipoReserva !== reserva.tipoReserva) {
    reserva.tipoReserva = data.tipoReserva;
  }

  if (data.cantidadPersonas&& data.cantidadPersonas!== reserva.cantidadPersonas) {
    reserva.cantidadPersonas= data.cantidadPersonas;
  }

  try {
    const reservation = await reserva.save();
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

  async getReservationsByUser(id: string) {
    try {
      const reservations = await Reserva.findAll({
        where: {
          usuarioId: id,
        },
      });
      return reservations;
    } catch (error) {
      console.log(error);
    }
  }

  async aproveReservation(id: string,estado: string) {
    try {
      
    const  reservaupdate= await Reserva.findByPk(id);
    if (!reservaupdate) throw new Error("Reserva no existe");
    if (estado && estado !== reservaupdate.estado) reservaupdate.estado = estado;
     await reservaupdate.save();
     console.log(reservaupdate.estado);
     return reservaupdate;
      
    } catch (error) {
      console.log(error);
    }
  }
}