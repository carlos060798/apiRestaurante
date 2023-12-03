import { Sequelize } from 'sequelize';

export class PosgressDatabase {
    static conectar(url: string) {
        // Crear una instancia de Sequelize
        const sequelize = new Sequelize(url, {
            logging: false, // Puedes habilitar esto para ver los registros SQL generados por Sequelize
        });

        // Intentar autenticar la conexión
        sequelize.authenticate()
            .then(() => {
                console.log('Conexión exitosa a la base de datos');
            })
            .catch((error: any) => {
                console.error('Error al conectar a la base de datos:', error);
            });
    }
}