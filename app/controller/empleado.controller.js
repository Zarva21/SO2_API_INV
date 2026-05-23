const Empleado = require('../model/empleado.model');
const redisClient = require('../config/redis.config');

const empleadoController = {

    //Get
    obtenerEmpleados: async (req, res) => {
        try {
            const sessionId = req.headers['session-id'];
            if (!sessionId) {
                return res.status(401).json({message: 'No autorizado. Inicie sesion por favor.'});
            }

            const session = await redisClient.get(`user_session:${sessionId}`);
            if(!session) {
                return res.status(401).json({message: 'Sesion expirada o invalida. Inicie sesion nuevamente.'});
            }

            const empleados = await Empleado.obtenerEmpleados();
            return res.status(200).json(empleados);
        } catch (error) {
            console.error('Error al obtener los empleados:', error);
            return res.status(500).json({message: 'Error interno del servidor'});
        }
    },

    //Post
    insertarEmpleado: async (req, res) => {
        try {
            const sessionId = req.headers['session-id'];
            if (!sessionId) {
                return res.status(401).json({message: 'No autorizado. Inicie sesion por favor.'});
            }

            const session = await redisClient.get(`user_session:${sessionId}`);
            if(!session) {
                return res.status(401).json({message: 'Sesion expirada o invalida. Inicie sesion nuevamente.'});
            }

            const { puesto, email, fecha_ingreso } = req.body;

            const nuevoEmpleado = await Empleado.insertarEmpleado(puesto, email, fecha_ingreso);
            return res.status(201).json(nuevoEmpleado);
        } catch (error) {
            console.error('Error al insertar el empleado:', error);
            return res.status(500).json({message: 'Error interno del servidor'});
        }
    },

    //Put
    actualizarEmpleado: async (req, res) => {
        try {
            const sessionId = req.headers['session-id'];
            if (!sessionId) {
                return res.status(401).json({message: 'No autorizado. Inicie sesion por favor.'});
            }

            const session = await redisClient.get(`user_session:${sessionId}`);
            if(!session) {
                return res.status(401).json({message: 'Sesion expirada o invalida. Inicie sesion nuevamente.'});
            }

            const id_empleado = parseInt(req.params.id);
            const { puesto, email, fecha_ingreso } = req.body;

            await Empleado.actualizarEmpleado(id_empleado, puesto, email, fecha_ingreso);
            return res.status(200).json({message: 'Empleado actualizado exitosamente'});



        } catch (error) {
            console.error('Error al actualizar el empleado:', error);
            return res.status(500).json({message: 'Error interno del servidor'});
        }
    },

    //Delete
    eliminarEmpleado: async (req, res) => {
        try {
            const sessionId = req.headers['session-id'];
            if (!sessionId) {
                return res.status(401).json({message: 'No autorizado. Inicie sesion por favor.'});
            }

            const session = await redisClient.get(`user_session:${sessionId}`);
            if(!session) {
                return res.status(401).json({message: 'Sesion expirada o invalida. Inicie sesion nuevamente.'});
            }

            const id_empleado = parseInt(req.params.id);

            await Empleado.eliminarEmpleado(id_empleado);
            return res.status(200).json({message: 'Empleado eliminado exitosamente'});
        } catch (error) {
            console.error('Error al eliminar el empleado:', error);
            return res.status(500).json({message: 'Error interno del servidor'});
        }
    }
};

module.exports = empleadoController;