import { bcryptAdapter } from '../../config/byscript-adapter';
import{ Usuario} from '../../data/sqlize/models/models';
import { regularExps } from '../../config/emailvalid';

interface dataUser{
  nombres: string;
  tipoDeIdentificacion: string;
  identificacion: string;
   correo: string;
   password: string;
}

/**
 * Clase que proporciona servicios relacionados con los usuarios.
 */
//export class UsersServices {
    /**
     * Crea un nuevo usuario.
     * @param data - Los datos del usuario a crear.
     * @returns El usuario creado.
     * @throws Error si el correo no es válido o si el correo ya está registrado.
     */
   // async create(data: dataUser) {
        // . }

    /**
     * Obtiene todos los usuarios.
     * @returns Una lista de todos los usuarios.
     */
  //  async getAll() {
        // ..}

    /**
     * Obtiene un usuario por su ID.
     * @param id - El ID del usuario a obtener.
     * @returns El usuario encontrado.
     */
  ///  async getOne(id: string) {
        // ...}

    /**
     * Actualiza un usuario existente.
     * @param id - El ID del usuario a actualizar.
     * @param data - Los datos actualizados del usuario.
     * @returns El usuario actualizado.
     * @throws Error si el usuario no se encuentra.
     */
    //async update(id: string, data: Partial<dataUser>) {
        // ...}

    /**
     * Elimina un usuario.
     * @param id - El ID del usuario a eliminar.
     * @returns El número de filas afectadas en la base de datos.
     */
   // async delete(id: string) {
        // ... }}



export class UsersServices {
  async create(data:dataUser) {
    const {nombres,tipoDeIdentificacion,identificacion} = data;

    const correo = data.correo
     if (!regularExps.correo.test(correo))  throw new Error('El correo no  es valido');

    const existingUser = await Usuario.findOne({
        where: {
          correo: correo,
        },
      });
  
      if (existingUser) {
        throw new Error('El correo ya está registrado');
      }

    const password = bcryptAdapter.hash(data.password);
    try{
        const user = await Usuario.create({
            nombres,
            tipoDeIdentificacion,
            identificacion,
            correo,
            password
        });
        console.log(user);
        return user;
    } catch(error){
        console.log(error);
    }
  }
  
    async getAll() {
        try{
            const users = await Usuario.findAll();
            return users;
        } catch(error){
            console.log(error);
        }
    }

    async getOne(id: string) {
        try{
            const user = await Usuario.findByPk(id);
            return user;
        } catch(error){
            console.log(error);
        }
    }
    async update(id: string, data: Partial<dataUser>) {
        try {
          // Obtener el usuario existente por su ID
          const user = await Usuario.findByPk(id);
      
          if (!user) {
            throw new Error('Usuario no encontrado');
          }
      
          // Comprobar cada campo nuevo y actualizar si es diferente
          if (data.nombres && data.nombres !== user.nombres) {
            user.nombres = data.nombres;
          }
      
          if (data.tipoDeIdentificacion && data.tipoDeIdentificacion !== user.tipoDeIdentificacion) {
            user.tipoDeIdentificacion = data.tipoDeIdentificacion;
          }
      
          if (data.identificacion && data.identificacion !== user.identificacion) {
            user.identificacion = data.identificacion;
          }
      
          if (data.correo && data.correo !== user.correo) {
            user.correo = data.correo;
          }
      
          if (data.password && data.password !== user.password) {
            user.password = data.password;
          }
      
          // Guardar los cambios en la base de datos
          await user.save();
      
          console.log('Usuario actualizado correctamente:', user);
          return user;
        } catch (error) {
          console.error('Error al actualizar el usuario:', error);
          throw error;
        }
      }
 

    async delete(id: string) {
        //   metodo para eliminar un usuario para el id
        try{
            const user = await Usuario.destroy({
                where:{
                    id
                }
            });

            console.log(user);
            return user;
        } catch(error){
            console.log(error);
        }
    }
  
}