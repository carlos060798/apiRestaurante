import { Sequelize } from 'sequelize';

export class DatabaseConnector {

    private sequelize: Sequelize;

    constructor(url: string) {
        // Crear una instancia de Sequelize
        this.sequelize = new Sequelize(url, {
            logging: false, // Puedes habilitar esto para ver los registros SQL generados por Sequelize
        });
    }

    conectar() {
        // Intentar autenticar la conexión
        this.sequelize.authenticate()
            .then(() => {
                console.log('Conexión exitosa a la base de datos');
            })
            .catch((error: any) => {
                console.error('Error al conectar a la base de datos:', error);
            });
    }

    cerrarConexion() {
        // Cerrar la conexión a la base de datos
        this.sequelize.close()
            .then(() => {
                console.log('Conexión cerrada correctamente');
            })
            .catch((error: any) => {
                console.error('Error al cerrar la conexión:', error);
            });
    }

    obtenerInstancia() {
        // Devolver la instancia de sequelize
        return this.sequelize;
    }
}


/*export class PosgressDatabase {
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

        // Exportar la instancia de sequelize
        return sequelize;
    }
} */