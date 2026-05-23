const pool = require ('../config/db.config');

const Movimiento = {
    /*
    movimientos_historial
    PK id_movimiento INT(Identity)
    FK id_producto int
    FK id_bodega int
    FK id_usuario int
    tipo_movimiento varchar(20)
    cantidad int
    fecha_movimiento datetime
    observaciones nvarchar(max)
    */

    //Obtener para GET del CRUD
    obtenerMovimientos: async() => {
        try {
            const query = 'SELECT * FROM sp_obtener_historial_movimientos()';
            const result = await pool.query(query);
            return result.rows;
        }
        catch (error) {
            console.error('Error al obtener los movimientos:', error);
            throw error;
        }
    }
};

module.exports = Movimiento;



