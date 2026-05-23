const Producto = require('../model/producto.model');
const redisClient = require('../config/redis.config');

const productoController = {
    crearProducto: async (req, res) => {
        try {
            const sessionId = req.headers['session-id'];
            if (!sessionId) {
                return res.status(401).json({message: 'No autorizado. Inicie sesion por favor.'});
            }

            const session = await redisClient.get(`user_session:${sessionId}`);
            if(!session) {
                return res.status(401).json({message: 'Sesion expirada o invalida. Inicie sesion nuevamente.'});
            }

            const { nombre, descripcion, id_cat, id_prov, precio_c, precio_v } = req.body;
            if (!nombre || !descripcion || !id_cat || !id_prov || !precio_c || !precio_v) {
                return res.status(400).json({message: 'Todos los campos son requeridos: nombre, descripcion, id_cat, id_prov, precio_c, precio_v'});
            }

            await Producto.crearProducto(nombre, descripcion, id_cat, id_prov, precio_c, precio_v);
            return res.status(200).json({message: 'Producto creado exitosamente'});
        } catch(error) {
            console.error('Error al crear el producto:', error);
            return res.status(500).json({message: 'Error interno del servidor'});
        }
    },
    obtenerProductos: async (req, res) => {
        try {
            const sessionId = req.headers['session-id'];
            if (!sessionId) {
                return res.status(401).json({message: 'No autorizado. Inicie sesion por favor.'});
            }

            const session = await redisClient.get(`user_session:${sessionId}`);
            if(!session) {
                return res.status(401).json({message: 'Sesion expirada o invalida. Inicie sesion nuevamente.'});
            }

            const productos = await Producto.obtenerProductos();
            return res.status(200).json({message: 'Productos obtenidos exitosamente', data: productos});
        } catch(error) {
            console.error('Error al obtener los productos:', error);
            return res.status(500).json({message: 'Error interno del servidor'});
        }
    },
    actualizarProducto: async (req, res) => {
        try {
            const sessionId = req.headers['session-id'];
            if (!sessionId) {
                return res.status(401).json({message: 'No autorizado. Inicie sesion por favor.'});
            }

            const session = await redisClient.get(`user_session:${sessionId}`);
            if(!session) {
                return res.status(401).json({message: 'Sesion expirada o invalida. Inicie sesion nuevamente.'});
            }

            const { id_producto, nombre, descripcion, id_cat, id_prov, precio_c, precio_v } = req.body;
            if (!id_producto || !nombre || !descripcion || !id_cat || !id_prov || !precio_c || !precio_v) {
                return res.status(400).json({message: 'Todos los campos son requeridos: nombre, descripcion, id_cat, id_prov, precio_c, precio_v'});
            }

            await Producto.actualizarProducto(id_producto, nombre, descripcion, id_cat, id_prov, precio_c, precio_v);
            return res.status(200).json({message: 'Producto actualizado exitosamente'});
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            return res.status(500).json({message: 'Error interno del servidor'});
        }
    },
    eliminarProducto: async (req, res) => {
        try {
            const sessionId = req.headers['session-id'];
            if (!sessionId) {
                return res.status(401).json({message: 'No autorizado. Inicie sesion por favor.'});
            }

            const session = await redisClient.get(`user_session:${sessionId}`);
            if(!session) {
                return res.status(401).json({message: 'Sesion expirada o invalida. Inicie sesion nuevamente.'});
            }

            const { id_producto } = req.params;
            if (!id_producto) {
                return res.status(400).json({message: 'El campo id_producto es requerido'});
            }
            await Producto.eliminarProducto(id_producto);
            return res.status(200).json({message: 'Producto eliminado exitosamente'});
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            return res.status(500).json({message: 'Error interno del servidor'});
        }
    },
    obtenerStockProducto: async (req, res) => {
        try {
            const sessionId = req.headers['session-id'];
            if (!sessionId) {
                return res.status(401).json({message: 'No autorizado. Inicie sesion por favor.'});
            }

            const session = await redisClient.get(`user_session:${sessionId}`);
            if(!session) {
                return res.status(401).json({message: 'Sesion expirada o invalida. Inicie sesion nuevamente.'});
            }

            const { id_producto } = req.params;
            if (!id_producto) {
                return res.status(400).json({message: 'El campo id_producto es requerido'});
            }

            const stockInfo = await Producto.obtenerStockProducto(id_producto);
            return res.status(200).json({message: 'Stock del producto obtenido exitosamente', data: stockInfo});
        } catch (error) {
            console.error('Error al obtener el stock del producto:', error);
            return res.status(500).json({message: 'Error interno del servidor'});
        }
    }
};

module.exports = productoController;