import { Usuario } from "../../data/sqlize/models/models";
import { bcryptAdapter } from "../../config/byscript-adapter";
import { jwtAdapter } from "../../config/tokenJwt";
import { envs } from "../../config/envs";
import { EmailService } from "../../presentation/services/emai.service";
import { error } from "console";
/*

interface OpcionesCorreo {
  asunto: string;
  mensaje: string;
  link: string;
}
class AuthService {
  constructor(private readonly emailService: EmailService) { }

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
    });
    const link = `${envs.MAILER_HOST}//validacion/${token}`;

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

    const payload = await jwtAdapter.validationToken(token)
    if (!payload) throw Error("El token no es valido")

    const { id } = payload as { id: string };
    if (!id) throw error("el usuario no es valido")

    const user = await Usuario.findByPk(id);
    const { nombres, tipoDeIdentificacion, identificacion, correo,rol } = user as Usuario

    const userlogaut = {
      id,
      nombres,
      tipoDeIdentificacion,
      identificacion,
      correo,
      rol
    };

    console.log(userlogaut);


    return {
      msg: "Se ha inicado la seccion con exito",
      userdata: userlogaut
    };

  }



  async repeatEmail(token: string, opcionesCorreo: OpcionesCorreo) {
    try {
      const userId = await jwtAdapter.extractUserIdFromToken(token);
  
      if (!userId) {
        throw new Error('Error al extraer el userId del token');
      }
  
      const user = await Usuario.findByPk(userId);
  
      const { correo, nombres } = user as Usuario;
  
      const html = `
        <section style="font-family: 'Arial', sans-serif; background-color: #f5f5f5; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0;">
  
          <div style="text-align: center; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
  
            <h1 style="color: #333333;">${opcionesCorreo.mensaje} ${nombres}</h1>
            <p style="color: #666666;">${opcionesCorreo.mensaje}</p>
            <a href="${opcionesCorreo.link}" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; transition: background-color 0.3s;"
              onmouseover="this.style.backgroundColor='#0056b3'" onmouseout="this.style.backgroundColor='#007bff'">${opcionesCorreo.mensaje}</a>
  
          </div>
  
        </section>
      `;
  
      const mailOptions = {
        to: correo,
        subject: opcionesCorreo.asunto,
        htmlBody: html,
      };
  
      const issend = await this.emailService.sendEmail(mailOptions);
  
      if (!issend) {
        throw new Error("Error al enviar el correo");
      }
  
      return {
        msg: `Se ha enviado un correo para ${opcionesCorreo.mensaje}`,
        correosend: true,
      };
    } catch (error) {
      console.error('Error en repeatEmail:', error);
      throw new Error('Error en la operación');
    }
  }

  static async changePassword(id: string, newPassword: string) {
    try {
      // Encuentra al usuario por su ID
      const user = await Usuario.findByPk(id);

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      // Genera el hash de la nueva contraseña
      const hashedPassword = await bcryptAdapter.hash(newPassword);

      // Actualiza la contraseña del usuario en la base de datos
      await user.update({ password: hashedPassword });
} catch (error) {
      console.error('Error en changePassword:', error);
      throw new Error('Error en la operación');
    }
}


export default AuthService;
*/



interface OpcionesCorreo {
  asunto: string;
  mensaje: string;
  link: string;
}

class AuthService {
  constructor(private readonly emailService: EmailService) {}

  async authenticate(correo: string, password: string) {
    try {
      const userauth = await Usuario.findOne({ where: { correo } });

      if (!userauth) {
        throw new Error("Usuario no encontrado");
      }

      const isMatch = await bcryptAdapter.compare(password, userauth.password);

      if (!isMatch) {
        throw new Error("Contraseña incorrecta");
      }

      const token = await jwtAdapter.generateToken({
        id: userauth.id,
      });

      const link = `${envs.MAILER_HOST}/validacion/${token}`;

      const html = `<h1>Valida tu cuenta</h1>
        <p>Para iniciar sesión haz clic en el siguiente link</p>
        <a href="${link}">Inicia sesión aquí</a>`;

      const mailOptions = {
        to: correo,
        subject: "Validar cuenta",
        htmlBody: html,
      };

      const issend = await this.emailService.sendEmail(mailOptions);

      if (!issend) throw new Error("Error al enviar el correo");

      return {
        msg: "Se ha enviado un correo para validar el inicio de sesión",
        token,
        correosend: true,
      };
    } catch (error) {
      console.error("Error en authenticate:", error);
      throw new Error("Error en la operación");
    }
  }

  async getProfile(id: string) {
    try {
      const user = await Usuario.findByPk(id);

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      return user;
    } catch (error) {
      console.error("Error en getProfile:", error);
      throw new Error("Error en la operación");
    }
  }

  async validateToken(token: string) {
    try {
      const payload = await jwtAdapter.validationToken(token);

      if (!payload) throw new Error("El token no es válido");

      const { id } = payload as { id: string };
      if (!id) throw new Error("El usuario no es válido");

      const user = await Usuario.findByPk(id);

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      const { nombres, tipoDeIdentificacion, identificacion, correo, rol } = user as Usuario;

      const userlogaut = {
        id,
        nombres,
        tipoDeIdentificacion,
        identificacion,
        correo,
        rol,
      };

      console.log(userlogaut);

      return {
        msg: "Se ha iniciado la sesión con éxito",
        userdata: userlogaut,
      };
    } catch (error) {
      console.error("Error en validateToken:", error);
      throw new Error("Error en la operación");
    }
  }

  async repeatEmail(token: string, opcionesCorreo: OpcionesCorreo) {
    console.log(token, opcionesCorreo);
    try {
      const userId = await jwtAdapter.extractUserIdFromToken(token);
      console.log(userId);

      if (!userId) {
        throw new Error("Error al extraer el userId del token");
      }

      const user = await Usuario.findByPk(userId);

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      const { correo, nombres } = user as Usuario;

      const html = `
        <section style="font-family: 'Arial', sans-serif; background-color: #f5f5f5; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0;">

          <div style="text-align: center; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">

            <h1 style="color: #333333;">${opcionesCorreo.mensaje} ${nombres}</h1>
            <p style="color: #666666;">${opcionesCorreo.mensaje}</p>
            <a href="${opcionesCorreo.link}" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; transition: background-color 0.3s;"
              onmouseover="this.style.backgroundColor='#0056b3'" onmouseout="this.style.backgroundColor='#007bff'">${opcionesCorreo.mensaje}</a>

          </div>

        </section>
      `;

      const mailOptions = {
        to: correo,
        subject: opcionesCorreo.asunto,
        htmlBody: html,
      };

      const issend = await this.emailService.sendEmail(mailOptions);

      if (!issend) {
        throw new Error("Error al enviar el correo");
      }

      return {
        msg: `Se ha enviado un correo para ${opcionesCorreo.mensaje}`,
        correosend: true,
      };
    } catch (error) {
      console.error("Error en repeatEmail:", error);
      throw new Error("Error en la operación");
    }
  }

   async changePassword(id: string, newPassword: string) {
    try {
      // Encuentra al usuario por su ID
      const user = await Usuario.findByPk(id);

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      // Genera el hash de la nueva contraseña
      const hashedPassword = await bcryptAdapter.hash(newPassword);

      // Actualiza la contraseña del usuario en la base de datos
      await user.update({ password: hashedPassword });
    } catch (error) {
      console.error("Error en changePassword:", error);
      throw new Error("Error en la operación");
    }
  }
}

export default AuthService;
