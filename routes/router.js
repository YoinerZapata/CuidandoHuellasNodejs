const router = require('express').Router();
const controladorProductos = require('../src/controller/producto.controller')
const controladorVendedor = require('../src/controller/vendedor.controller')

router.get('/vendedores',controladorVendedor.registrar)
router.get('/productos',controladorProductos.consultar)


router.get('/productos', controladorProductos.consultar)
router.get('/productos', controladorProductos.registrar)

//Catalogo
router.get('/productos', controladorProductos.addProductos)



module.exports= router