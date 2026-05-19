const Inventario = require('../model/inventario.model');
const { createClient } = require('redis');

const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST || '127.0.0.1'}:${process.env.REDIS_PORT || 6379}`
});
redisClient.connect().catch('Error al conectar a Redis:', err);

const inventarioController = {
    getReporte: async (requestAnimationFrame, res) => {
        try {
            const sessionId = req.headers['session-id'];
            if (!sessionId) {
                return res.status(401).json({message: 'No autorizado. Inicie sesion por favor.'});
            }

            const session = await redisClient.get(`user_session:${sessionId}`);
            if(!session) {
                return res.status(401).json({message: 'Sesion expirada o invalida. Inicie sesion nuevamente.'});
            }

            const id_bodega = req.query.id_bodega ? parseInt(req.query.id_bodega) : null;
            const reporte = await Inventario.obtenerInventario(id_bodega);
            return res.status(200).json(reporte);
        } catch (error) {
            console.error('Error al obtener el reporte de inventario:', error);
            return res.status(500).json({message: 'Error interno del servidor'});
        }
    },

    postMovimiento: async (req, res) => {
        try {
            const sessionId = req.headers['session-id'];
            if (!sessionId) {
                return res.status(401).json({message: 'No autorizado. Inicie sesion por favor.'});
            }

            const session = await redisClient.get(`user_session:${sessionId}`);
            if(!session) {
                return res.status(401).json({message: 'Sesion expirada o invalida. Inicie sesion nuevamente.'});
            }

            const { id_producto, id_bodega, tipo, cantidad} = req.body;
            if (!id_producto || !id_bodega || !tipo || !cantidad) {
                return res.status(400).json({message: 'Todos los campos son requeridos: id_producto, id_bodega, tipo, cantidad'});
            }

            const usuarioLoggeado = JSON.parse(session);
            const id_usuario = usuarioLoggeado.id_usuario;

            await Inventario.registrarMovimiento(id_producto, id_bodega, id_usuario, tipo, cantidad);
            return res.status(200).json({message: 'Movimiento registrado exitosamente'});
        } catch (error) {
            console.error('Error al registrar el movimiento:', error);
            return res.status(500).json({message: 'Error interno del servidor'});
        }
    }
};

module.exports = inventarioController;