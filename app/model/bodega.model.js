const pool = require('../config/db.config');

const Bodega = {

   /*
   bodegas
   PK id_bodega INT(Identity)
   nombre_bodega varchar(100)
   ubicacion_geografica nvarchar(max)
   es_principal bit
   */

    //Obtener para GET del CRUD 
    obtenerBodegas: async() => {
        try {
            const query = 'SELECT * FROM sp_obtener_bodegas()';
        
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error al obtener las bodegas:', error);
            throw error;
        }

    },


    //Insertar bodega para POST del CRUD
    insertarBodega: async(nombre_bodega,ubicacion_geografica,es_principal) => {
        try {
            const query = 'SELECT sp_insertar_bodega($1, $2, $3) AS id_bodega';
            const values = [nombre_bodega, ubicacion_geografica, es_principal];

            const result = await pool.query(queury, values);
            return result.rows[0];

        } catch (error) {
            console.error('Error al insertar la bodega:', error);
            throw error;
        }
    },

    //Actualizar bodega para PUT del CRUD
    actualizarBodega: async(id_bodega, nombre_bodega, ubicacion_geografica, es_principal) => {
        try {
            const query = 'SELECT sp_actualizar_bodega($1, $2, $3, $4)';
            const values = [id_bodega, nombre_bodega, ubicacion_geografica, es_principal];

            await pool.query(query, values);
            return true;
        } catch (error) {
            console.error('Error al actualizar la bodega:', error);
            throw error;
        }
        },


    //Eliminar bodega para DELETE del CRUD
    eliminarBodega: async(id_bodega) => {
        try {
            const query = 'SELECT sp_eliminar_bodega($1)';
            const values = [id_bodega];

            await pool.query(query, values);
            return true;
        } catch (error) {
            console.error('Error al eliminar la bodega:', error);
            throw error;
        }
    }
};


module.exports = Bodega;