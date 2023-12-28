import { Usuario } from "../../data/sqlize/models/models";
import { bcryptAdapter } from "../../config/byscript-adapter";
import { jwtAdapter } from "../../config/tokenJwt";
import { envs } from "../../config/envs";
import { EmailService } from "../../presentation/services/emai.service";
import { error } from "console";

class AuthService {
  constructor(private readonly emailService: EmailService) {}

  async authenticate(correo: string, password: string) {
    const userauth = await Usuario.findOne({ where: { correo } });
    console.log(userauth);

    if (!userauth) {
      throw new Error("Usuario no encontrado");
    }

    const isMatch = await bcryptAdapter.compare(password, userauth.password);

    if (!isMatch) {
      throw Error("Contraseña incorrecta");
    }

    const token = await jwtAdapter.generateToken({
      id: userauth.id,
      email: userauth.correo,
    });
    const link = `${envs.MAILER_HOST}/${token}`;

    const html = `<h1>Valida tu cuenta</h1>
      <p>Para inicar seccion haga click en el siguiente link</p>
      <a href="${link}">inicia seccion aqui</a>`;

    const mailOptions = {
      to: correo,
      subject: "Validar cuenta",
      htmlBody: html,
    };
    const issend = await this.emailService.sendEmail(mailOptions);
    if (!issend) throw Error("Error al enviar el correo");

    return {
      msg: "Se ha enviado un correo para validar el  inicio de la seccion",
      token,
      correosend: true,
    };
  }

  async getProfile(id: string) {
    const user = await Usuario.findByPk(id);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return user;
  }

  async validatetoken(token: string) {

        const payload= await jwtAdapter.validationToken(token)
        if(!payload) throw Error("El token no es valido") 
        
        const {id}= payload as {id:string};
        if(!id) throw error("el usuario no es valido")

      const user = await Usuario.findByPk(id);
    const{nombres,tipoDeIdentificacion,identificacion,correo}=user as Usuario

      const  userlogaut = {
        id,
        nombres,
        tipoDeIdentificacion,
        identificacion,
        correo,
      };

      console.log(userlogaut);

        return {
            msg:"Se ha inicado la seccion con exito",
            userdata:userlogaut};
        
      }
      
  
         
       

  }


export default AuthService;
