const pool = require('../config/db.config');

const Usuario = {
    validarLogin: async (nombre_usuario, contrasenia) => {
        try {
            const query = 'SELECT * FROM sp_ValidarLogin($1, $2)';
            const values = [nombre_usuario, contrasenia];

            const result = await pool.query(query, values);

            if(result.rows.length > 0) {
                return result.rows[0];
            }
            return null;
        } catch (error) {
            console.error('Error al validar login:', error);
            throw error;
        }
    }
};

module.exports = Usuario;