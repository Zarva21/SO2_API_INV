const pool = require('../config/db.config');

const Inventario = {
    obtenerInventario: async(id_bodega = null) => {
        try {
            const query = 'SELECT * FROM sp_ReporteExistencias($1)';
            const values = [id_bodega];

            const result = await pool.query(query, values);
            return result.rows;
        } catch (error) {
            console.error('Error al obtener el inventario:', error);
            throw error;
        }
    },

    registrarMovimiento: async(id_producto, id_bodega, id_usuario, tipo, cantidad) => {
        try {
            const query = 'CALL sp_RegistrarMovimiento($1, $2, $3, $4, $5)';
            const values = [id_producto, id_bodega, id_usuario, tipo, cantidad];

            await pool.query(query, values);
            return true;
        } catch (error) {
            console.error('Error al registrar el movimiento:', error);
            throw error;
        }
    }
};

module.exports = Inventario;