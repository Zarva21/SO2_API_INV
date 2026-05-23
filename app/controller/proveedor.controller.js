const Proveedor = require('../model/proveedor.model');
const redisClient = require('../config/redis.config');

const proveedorController = {
    //Get
    obtenerProveedores: async (req, res) => {
        try {
            const sessionId = req.headers['session-id'];
            if (!sessionId) {
                return res.status(401).json({message: 'No autorizado. Inicie sesion por favor.'});
            }

            const session = await redisClient.get(`user_session:${sessionId}`);
            if(!session) {
                return res.status(401).json({message: 'Sesion expirada o invalida. Inicie sesion nuevamente.'});
            }

            const proveedores = await Proveedor.obtenerProveedores();
            return res.status(200).json(proveedores);
        } catch (error) {
            console.error('Error al obtener los proveedores:', error);
            return res.status(500).json({message: 'Error interno del servidor'});
        }
    },

    //Post
    insertarProveedor: async (req, res) => {
        try {
            const sessionId = req.headers['session-id'];
            if (!sessionId) {
                return res.status(401).json({message: 'No autorizado. Inicie sesion por favor.'});
            }

            const session = await redisClient.get(`user_session:${sessionId}`);
            if(!session) {
                return res.status(401).json({message: 'Sesion expirada o invalida. Inicie sesion nuevamente.'});
            }

            const { nit_rtu, nombre_empresa, contacto_nombre, telefono, email, direccion } = req.body;

            const nuevoProveedor = await Proveedor.insertarProveedor(nit_rtu, nombre_empresa, contacto_nombre, telefono, email, direccion);
            return res.status(201).json(nuevoProveedor);
        } catch (error) {
            console.error('Error al insertar el proveedor:', error);
            return res.status(500).json({message: 'Error interno del servidor'});
        }
    },

    //Put
    actualizarProveedor: async (req, res) => {
        try {
            const sessionId = req.headers['session-id'];
            if (!sessionId) {
                return res.status(401).json({message: 'No autorizado. Inicie sesion por favor.'});
            }

            const session = await redisClient.get(`user_session:${sessionId}`);
            if(!session) {
                return res.status(401).json({message: 'Sesion expirada o invalida. Inicie sesion nuevamente.'});
            }

            const id_proveedor = parseInt(req.params.id);
            const { nit_rtu, nombre_empresa, contacto_nombre, telefono, email, direccion } = req.body;

            await Proveedor.actualizarProveedor(id_proveedor, nit_rtu, nombre_empresa, contacto_nombre, telefono, email, direccion);
            return res.status(200).json({message: 'Proveedor actualizado exitosamente'});
        } catch (error) {
            console.error('Error al actualizar el proveedor:', error);
            return res.status(500).json({message: 'Error interno del servidor'});
        }
    },

    //Delete
    eliminarProveedor: async (req, res) => {
        try {
            const sessionId = req.headers['session-id'];
            if (!sessionId) {
                return res.status(401).json({message: 'No autorizado. Inicie sesion por favor.'});
            }

            const session = await redisClient.get(`user_session:${sessionId}`);
            if(!session) {
                return res.status(401).json({message: 'Sesion expirada o invalida. Inicie sesion nuevamente.'});
            }

            const id_proveedor = parseInt(req.params.id);
            await Proveedor.eliminarProveedor(id_proveedor);
            return res.status(200).json({message: 'Proveedor eliminado exitosamente'});
        } catch (error) {
            console.error('Error al eliminar el proveedor:', error);
            return res.status(500).json({message: 'Error interno del servidor'});
        }
    }
};

module.exports = proveedorController;