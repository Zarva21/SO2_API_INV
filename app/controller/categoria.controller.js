const Categoria = require('../models/categoria.model');
const redisClient = require('../config/redis.config');

const CACHE_KEY = 'categorias:lista'

const categoriaController = {
    obtenerCategorias: async (req, res) => {
        try {
            const sessionId = req.headers['session-id'];
            if (!sessionId) {
                return res.status(401).json({message: 'No autorizado. Inicie sesion por favor.'});
            }

            const session = await redisClient.get(`user_session:${sessionId}`);
            if(!session) {
                return res.status(401).json({message: 'Sesion expirada o invalida. Inicie sesion nuevamente.'});
            }

            const cacheData = await redisClient.get(CACHE_KEY);
            if (cacheData) {
                return res.status(200).json({message: 'Categorias obtenidas exitosamente (cache)', data: JSON.parse(cacheData)});
            }

            const query = 'SELECT * FROM sp_obtener_categorias_activas()';
            const categorias = await Categoria.obtenerCategorias(query);
            if (categorias.length > 0) {
                await redisClient.set(CACHE_KEY, JSON.stringify(categorias), 'EX', 3600);
            }

            return categorias.rows;
        } catch (error) {
            console.error('Error al obtener las categorías:', error);
            return res.status(500).json({message: 'Error interno del servidor'});
        }
    },
    crearCategoria: async (req, res) => {
        try {
            const sessionId = req.headers['session-id'];
            if (!sessionId) {
                return res.status(401).json({message: 'No autorizado. Inicie sesion por favor.'});
            }

            const session = await redisClient.get(`user_session:${sessionId}`);
            if(!session) {
                return res.status(401).json({message: 'Sesion expirada o invalida. Inicie sesion nuevamente.'});
            }

            const { nombre, descripcion, estado } = req.body;
            if (!nombre || !descripcion || estado === undefined) {
                return res.status(400).json({message: 'Todos los campos son requeridos: nombre, descripcion, estado'});
            }
            await Categoria.crearCategoria(nombre, descripcion, estado);
            await redisClient.del(CACHE_KEY);
            return res.status(200).json({message: 'Categoria creada exitosamente'});
        } catch (error) {
            console.error('Error al crear la categoría:', error);
            return res.status(500).json({message: 'Error interno del servidor'});
        }
    },
    actualizarCategoria: async (req, res) => {
        try {
           const sessionId = req.headers['session-id'];
            if (!sessionId) {
                return res.status(401).json({message: 'No autorizado. Inicie sesion por favor.'});
            }

            const session = await redisClient.get(`user_session:${sessionId}`);
            if(!session) {
                return res.status(401).json({message: 'Sesion expirada o invalida. Inicie sesion nuevamente.'});
            }
            
            const { id_categoria, nombre, descripcion, estado } = req.body;
            if (!id_categoria || !nombre || !descripcion || estado === undefined) {
                return res.status(400).json({message: 'Todos los campos son requeridos: id_categoria, nombre, descripcion, estado'});
            }
            await Categoria.actualizarCategoria(id_categoria, nombre, descripcion, estado);
            await redisClient.del(CACHE_KEY);
            return res.status(200).json({message: 'Categoria actualizada exitosamente'});
        } catch (error) {
            console.error('Error al actualizar la categoría:', error);
            return res.status(500).json({message: 'Error interno del servidor'});
        }
    },
    eliminarCategoria: async (req, res) => {
        try {
            const sessionId = req.headers['session-id'];
            if (!sessionId) {
                return res.status(401).json({message: 'No autorizado. Inicie sesion por favor.'});
            }

            const session = await redisClient.get(`user_session:${sessionId}`);
            if(!session) {
                return res.status(401).json({message: 'Sesion expirada o invalida. Inicie sesion nuevamente.'});
            }

            const { id_categoria } = req.body;
            if (!id_categoria) {
                return res.status(400).json({message: 'El campo id_categoria es requerido'});
            }
            await Categoria.eliminarCategoria(id_categoria);
            await redisClient.del(CACHE_KEY);
            return res.status(200).json({message: 'Categoria eliminada exitosamente'});
        } catch (error) {
            console.error('Error al eliminar la categoría:', error);
            return res.status(500).json({message: 'Error interno del servidor'});
        }
    }
};

module.exports = categoriaController;