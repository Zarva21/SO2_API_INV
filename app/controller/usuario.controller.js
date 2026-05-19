const Usuario = require('../model/usuario.model');
const redisClient = require('../config/redis.config');

const usuarioController = {
    login: async (req, res) => {
        try {
            const {nombre_usuario, contrasenia} = req.body;

            if(!nombre_usuario || !contrasenia) {
                return res.status(400).json({message: 'Nombre de usuario y contraseña son requeridos'});
            }

            const usuario = await Usuario.validarLogin(nombre_usuario, contrasenia);

            if(!usuario) {
                return res.status(401).json({message: 'Credenciales inválidas'});
            }

            const sessionKey = `user_sessio:${usuario.id_usuario}`;

            await redisClient.set(sessionKey, JSON.stringify(usuario), {EX: 1800});

            return res.status(200).json({
                message: 'Login exitoso',
                session_id: usuario.id_usuario,
                user: usuario
            });
        } catch(error) {
            console.error('Error en login:', error);
            return res.status(500).json({message: 'Error interno del servidor'});
        }
    }
}

module.exports = usuarioController;