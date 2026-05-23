const pool = require('../config/db.config');

const Empleado = {
    /*
    empleados
    PK id_empleado INT(Identity)
    puesto varchar(50)
    email varchar(100)
    fecha_ingreso date
    */

    //Obtener para GET del CRUD 
    obtenerEmpleados : async () => {
        try { 
            const query = 'SELECT * FROM sp_obtener_empleados()';
            const result = await pool.query(query);
            return result.rows;

        } catch (error) {
            console.error('Error al obtener los empleados:', error);
            throw error;
        }
    },

    //Insertar empleado para POST del CRUD
    insertarEmpleado : async (puesto, email, fecha_ingreso) => {
        try {
            const query = `
                SELECT sp_insertar_empleado($1, $2, $3) AS id_empleado
            `;
            const result = await pool.query(query, [puesto, email, fecha_ingreso]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al insertar el empleado:', error);
            throw error;
        }
    },

    //Actualizar empleado para PUT del CRUD
    actualizarEmpleado : async (id_empleado, puesto, email, fecha_ingreso) => {
        try {
            const query = 'SELECT * FROM sp_actualizar_empleado($1, $2, $3, $4)';
            await pool.query(query, [id_empleado, puesto, email, fecha_ingreso]);
            return true;
        } catch (error) {
            console.error('Error al actualizar el empleado:', error);
            throw error;
        }
    },

    //Eliminar empleado para DELETE del CRUD
    eliminarEmpleado : async (id_empleado) => {
        try {
            const query = 'SELECT * FROM sp_eliminar_empleado($1)';
            await pool.query(query, [id_empleado]);
            return true;
        } catch (error) {
            console.error('Error al eliminar el empleado:', error);
            throw error;
        }
    }

};

module.exports = Empleado;    
