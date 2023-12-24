import { Usuario } from '../../data/sqlize/models/models';
import { bcryptAdapter } from '../../config/byscript-adapter';
import { jwtAdapter } from '../../config/tokenJwt';

class AuthService {


    constructor() {

    }


    async authenticate(correo: string, password: string) {
        
        const userauth = await Usuario.findOne({ where: { correo } });
        console.log(userauth);

        if (!userauth) {
            throw new Error('Usuario no encontrado');
        }

        const isMatch = await bcryptAdapter.compare(password, userauth.password);

        if (!isMatch) {
            throw Error('Contraseña incorrecta');
        }

        const token= await jwtAdapter.generateToken({id:userauth.id,email:userauth.correo})
       

        return {
            user: userauth,
            token
        };
    }

   
    async getProfile(id: string) {
        const user = await Usuario.findByPk(id);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        return user;
    }


}

export default AuthService;