const pool = require('../config/db.config');

const Producto = {
    crearProducto: async (nombre, descripcion, id_cat, id_prov, precio_c, precio_v) => {
        try {
            const query = 'CALL sp_CrearProducto($1, $2, $3, $4, $5, $6)';
            const values = [nombre, descripcion, id_cat, id_prov, precio_c, precio_v];

            await pool.query(query, values);
            return true;
        }catch (error) {
            console.error('Error al crear el producto:', error);
            throw error;        
        }
    }
};

module.exports = Producto;