const bodega = require('../model/bodega.model');
const redisClient = require('../config/redis.config');

const bodegaController = {
    // Get
    obtenerBodegas: async (req, res) => {
        try {
            const sessionId = req.headers['session-id'];
            if (!sessionId) {
                return res.status(401).json({message: 'No autorizado. Inicie sesion por favor.'});
            }

            const session = await redisClient.get(`user_session:${sessionId}`);
            if(!session) {
                return res.status(401).json({message: 'Sesion expirada o invalida. Inicie sesion nuevamente.'});
            }

            const bodegas = await bodega.obtenerBodegas();
            return res.status(200).json(bodegas);
        } catch (error) {
            console.error('Error al obtener las bodegas:', error);
            return res.status(500).json({message: 'Error interno del servidor'});
        }
    },

    // Post
    insertarBodega: async (req, res) => {
        try {
            const sessionId = req.headers['session-id'];
            if (!sessionId) {
                return res.status(401).json({message: 'No autorizado. Inicie sesion por favor.'});
            }

            const session = await redisClient.get(`user_session:${sessionId}`);
            if(!session) {
                return res.status(401).json({message: 'Sesion expirada o invalida. Inicie sesion nuevamente.'});
            }

            const { nombre_bodega, ubicacion_geografica, es_principal } = req.body;

            const nuevaBodega = await bodega.insertarBodega(nombre_bodega, ubicacion_geografica, es_principal);
            return res.status(201).json(nuevaBodega);
        } catch (error) {
            console.error('Error al insertar la bodega:', error);
            return res.status(500).json({message: 'Error interno del servidor'});
        }
    },

    // Put
    actualizarBodega: async (req, res) => {
        try {
             const sessionId = req.headers['session-id'];
            if (!sessionId) {
                return res.status(401).json({message: 'No autorizado. Inicie sesion por favor.'});
            }

            const session = await redisClient.get(`user_session:${sessionId}`);
            if(!session) {
                return res.status(401).json({message: 'Sesion expirada o invalida. Inicie sesion nuevamente.'});
            }


            const id_bodega = parseInt(req.params.id);
            const {nombre_bodega, ubicacion_geografica, es_principal} = req.body;

            await bodega.actualizarBodega(id_bodega, nombre_bodega, ubicacion_geografica, es_principal);
            return res.status(200).json({message: 'Bodega actualizada exitosamente'});
        } catch (error) {
            console.error('Error al actualizar la bodega:', error);
            return res.status(500).json({message: 'Error interno del servidor'});
        }
    },

    // Delete
    eliminarBodega: async (req, res) => {
        try {
             const sessionId = req.headers['session-id'];
            if (!sessionId) {
                return res.status(401).json({message: 'No autorizado. Inicie sesion por favor.'});
            }

            const session = await redisClient.get(`user_session:${sessionId}`);
            if(!session) {
                return res.status(401).json({message: 'Sesion expirada o invalida. Inicie sesion nuevamente.'});
            }

            const id_bodega = parseInt(req.params.id);

            await bodega.eliminarBodega(id_bodega);
            return res.status(200).json({message: 'Bodega eliminada exitosamente'});
        } catch (error) {
            console.error('Error al eliminar la bodega:', error);
            return res.status(500).json({message: 'Error interno del servidor'});
        }
    }
};

module.exports = bodegaController;