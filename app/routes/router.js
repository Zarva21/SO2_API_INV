const express = require('express');
const router = express.Router();

const usuario = require('../controller/user.controller');
const inventario = require('../controller/inventory.controller');
const producto = require('../controller/product.controller');

//Rutas para usuarios
router.post('/auth/login', usuario.login);

//Rutas para inventario
router.get('/inventario', inventario.getReporte);
router.post('/inventario/movimiento', inventario.postMovimiento);

//Rutas para productos
router.post('/producto', producto.crearProducto);

module.exports = router;