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
    },
    obtenerProductos: async () => {
        try {
            const query = 'SELECT * FROM sp_obtener_productos()';
            const result  = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            throw error;
        }
    },
    actualizarProducto: async (id_producto, nombre, descripcion, id_cat, id_prov, precio_c, precio_v) => {
        try {
            const query = 'CALL sp_actualizar_producto($1, $2, $3, $4, $5, $6, $7)';
            const values = [id_producto, nombre, descripcion, id_cat, id_prov, precio_c, precio_v];
            await pool.query(query, values); 
            return true;
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            throw error;
        }
    },
    eliminarProducto: async (id_producto) => {
        try {
            const query = 'CALL sp_eliminar_producto($1)';
            const values = [id_producto];
            await pool.query(query, values);
            return true;
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            throw error;
        }
    },
    obtenerStockProducto: async(id_producto) => {
        try {
            const query = 'SELECT * FROM sp_obtener_stock_producto($1)';
            const values = [id_producto];
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error al obtener el stock del producto:', error);
            throw error;
        }
    }
};

module.exports = Producto;