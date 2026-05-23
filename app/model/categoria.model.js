const pool = require('../config/db.config');

const Categoria = {
    obtenerCategorias: async () => {
        try {
            const query = 'SELECT * FROM sp_obtener_categorias()';
            const result = await pool.query(query);
            return result.rows;
        } catch(error) {
            console.error('Error al obtener las categorías:', error);
            throw error;
        }
    },
    crearCategoria: async (nombre,descripcion,estado) => {
        try {
            const query = 'CALL sp_insertar_categoria($1, $2, $3)';
            const values = [nombre, descripcion, estado];
            await pool.query(query, values);
            return true;
        } catch (error) {
            console.error('Error al crear la categoría:', error);
            throw error;
        }
    },
    actualizarCategoria: async (id_categoria, nombre, descripcion, estado) => {
        try {
            const query = 'CALL sp_actualizar_categoria($1, $2, $3, $4)';
            const values = [id_categoria, nombre, descripcion, estado];
            await pool.query(query, values);
            return true;
        } catch (error) {
            console.error('Error al actualizar la categoría:', error);
            throw error;
        }
    },
    eliminarCategoria: async (id_categoria) => {
        try {
            const query = 'CALL sp_eliminar_categoria($1)';
            const values = [id_categoria];
            await pool.query(query, values);
            return true;
        } catch (error) {
            console.error('Error al eliminar la categoría:', error);
            throw error;
        }
    }
}