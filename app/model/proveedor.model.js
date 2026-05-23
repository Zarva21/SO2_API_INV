const pool = require('../config/db.config');

const Proveedor = {
    /*
    proveedores
    PK id_proveedor INT(Identity)
    nit_rtu varchar(20)
    nombre_empresa varchar(150)
    contacto_nombre varchar(100)
    telefono varchar(20)
    email varchar(100)
    direccion nvarchar(max)
    */

    //Obtener para GET del CRUD
    obtenerProveedores: async() => {
        try { 
            const query = 'SELECT * FROM sp_obtener_proveedores()';
            const result = await pool.query(query);
            return result.rows;

        } catch (error) {
            console.error('Error al obtener los proveedores:', error);
            throw error;
        }
    },

    //Insertar proveedor para POST del CRUD
    insertarProveedor: async(nit_rtu, nombre_empresa, contacto_nombre, telefono, email, direccion) => {
        try {
            const query = `
                SELECT sp_insertar_proveedor($1, $2, $3, $4, $5, $6) AS id_proveedor
            `;
            const values = [nit_rtu, nombre_empresa, contacto_nombre, telefono, email, direccion];

            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error al insertar el proveedor:', error);
            throw error;
        }
    },

    //Actualizar proveedor para PUT del CRUD
    actualizarProveedor: async(id_proveedor, nit_rtu, nombre_empresa, contacto_nombre, telefono, email, direccion) => {
        try {
            const query = 'SELECT * FROM sp_actualizar_proveedor($1, $2, $3, $4, $5, $6, $7)';
            const values = [id_proveedor, nit_rtu, nombre_empresa, contacto_nombre, telefono, email, direccion];

            await pool.query(query, values);
            
            return true;
        } catch (error) {
            console.error('Error al actualizar el proveedor:', error);
            throw error;
        }
    },

    //Eliminar proveedor para DELETE del CRUD
    eliminarProveedor: async(id_proveedor) => {
        try {
            const query = 'SELECT * FROM sp_eliminar_proveedor($1)';
            const values = [id_proveedor];

            await pool.query(query, values);
            return true;
            } catch (error) {
            console.error('Error al eliminar el proveedor:', error);
            throw error;
        }
    }
};

module.exports = Proveedor;