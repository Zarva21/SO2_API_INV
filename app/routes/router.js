const express = require('express');
const router = express.Router();

const usuario = require('../controller/usuario.controller');
const inventario = require('../controller/inventario.controller');
const producto = require('../controller/producto.controller');
const bodega = require('../controller/bodega.controller');
const categoria = require('../controller/categoria.controller');
const proveedor = require('../controller/proveedor.controller');
const movimiento = require('../controller/movimiento.controller');
const empleado = require('../controller/empleado.controller');

//Rutas para usuarios
router.post('/auth/login', usuario.login);

//Rutas para inventario
router.get('/inventario', inventario.getReporte);
router.post('/inventario/movimiento', inventario.postMovimiento);

//Rutas para productos
router.post('/create/producto', producto.crearProducto);
router.get('/all/productos', producto.obtenerProductos);
router.get('/stock/producto/:id', producto.obtenerStockProducto)
router.put('/update/producto', producto.actualizarProducto);
router.delete('/delete/producto', producto.eliminarProducto);

//Rutas para bodega
router.post('/create/bodega', bodega.insertarBodega);
router.get('/all/bodegas', bodega.obtenerBodegas);
router.put('/update/bodega/:id', bodega.actualizarBodega);
router.delete('/delete/bodega/:id', bodega.eliminarBodega);

//Rutas para categoria
router.post('/create/categoria', categoria.crearCategoria);
router.get('/all/categorias', categoria.obtenerCategorias);
router.put('/update/categoria/:id', categoria.actualizarCategoria);
router.delete('/delete/categoria/:id', categoria.eliminarCategoria);

//Rutas para proveedor
router.post('/create/proveedor', proveedor.insertarProveedor);
router.get('/all/proveedores', proveedor.obtenerProveedores);
router.put('/update/proveedor/:id', proveedor.actualizarProveedor);
router.delete('/delete/proveedor/:id', proveedor.eliminarProveedor);

//Rutas para empleado
router.post('/create/empleado', empleado.insertarEmpleado);
router.get('/all/empleados', empleado.obtenerEmpleados);
router.put('/update/empleado/:id', empleado.actualizarEmpleado);
router.delete('/delete/empleado/:id', empleado.eliminarEmpleado);

//Rutas para movimiento
router.get('/all/movimientos', movimiento.getMovimiento);

module.exports = router;