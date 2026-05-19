const Producto = require('../model/producto.model');
const { createClient } = require('redis');

const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST || '127.0.0.1'}:${process.env.REDIS_PORT || 6379}`
});
redisClient.connect()
.catch(err => {
    console.error('Error al conectar a Redis:', err);
});

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
    }
}

module.exports = productoController;