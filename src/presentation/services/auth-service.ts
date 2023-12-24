import { Usuario } from '../../data/sqlize/models/models';
import { bcryptAdapter } from '../../config/byscript-adapter';
import { jwtAdapter } from '../../config/tokenJwt';
import { envs } from '../../config/envs';
import { EmailService} from '../../presentation/services/emai.service';

class AuthService {

    constructor(        private readonly emailService:EmailService
        ) {
    


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
        const link=`${envs.MAILER_HOST}/auth/${token}`

      const   html = ` 
      <h1>Valida tu cuenta</h1>
      <p>Para inicar seccion haga clicl en el siguiente link</p>
      <a href="${link}">Validar cuenta : ${correo}</a>
      
      `
      const mailOptions = {
        to: correo,
        subject: 'Validar cuenta',
        htmlBody: html
      };
     const issend= await this.emailService.sendEmail(mailOptions) 
      if(!issend) throw Error("Error al enviar el correo")

      


        return {
            user: userauth,
            token,
            correosend: true
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