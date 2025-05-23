const router = require('express').Router();

const controladorProductos = require('../src/controller/producto.controller')
const controladorUsuario = require('../src/controller/usuario.controller')



// router.get('/productos',controladorProductos.consultar);


// router.get('/productos', controladorProductos.registrar);

//login
//router.get('/signin', controladorUsuario.renderSignInPage);

// Rutas de autenticación
router.post('/registrar', controladorUsuario.registrarUsuario);


//Catalogo
//router.get('/productos', controladorProductos.addProducto);
router.post('/productos', controladorProductos.addProducto); 



module.exports= router