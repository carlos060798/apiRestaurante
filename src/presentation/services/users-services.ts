import{ Usuario} from '../../data/sqlize/models/models';
interface dataUser{
  nombres: string;
  tipoDeIdentificacion: string;
  identificacion: string;
   correo: string;
   password: string;
}

export class UsersServices {
  async create(data:dataUser) {
    const {nombres,tipoDeIdentificacion,identificacion,correo,password} = data;
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

    async update(id: string, data: dataUser) {
        const {nombres,tipoDeIdentificacion,identificacion,correo,password} = data;
        try{
            const user = await Usuario.update({
                nombres,
                tipoDeIdentificacion,
                identificacion,
                correo,
                password
            },{
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

    async delete(id: string) {
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