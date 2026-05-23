const Movimiento = require('../model/movimiento.model');
const redisClient = require('../config/redis.config');

const movimientoController = {
    getMovimiento: async (req, res) => {
        try {
            const sessionId = req.headers['session-id'];
            if (!sessionId) {
                return res.status(401).json({message: 'No autorizado. Inicie sesion por favor.'});
            }

            const session = await redisClient.get(`user_session:${sessionId}`);
            if(!session) {
                return res.status(401).json({message: 'Sesion expirada o invalida. Inicie sesion nuevamente.'});
            }

            const historial = await Movimiento.obtenerMovimientos();
            return res.status(200).json(historial);
        } catch (error) {
            console.error('Error al obtener el historial de movimientos:', error);
            return res.status(500).json({message: 'Error interno del servidor'});
        }   
    }
};

module.exports = movimientoController;