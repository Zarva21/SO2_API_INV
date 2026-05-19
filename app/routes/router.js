const express = require('express');
const router = express.Router();

const usuario = require('../controllers/user.controller');
const inventario = require('../controllers/inventory.controller');
const producto = require('../controllers/product.controller');

//Rutas para usuarios
router.get('/auth/login', usuario.login);

//Rutas para inventario
router.get('/inventario', inventario.getReporte);
router.post('/inventario/movimiento', inventario.postMovimiento);

//Rutas para productos
router.post('/producto', producto.crearProducto);

module.exports = router;