const router = require('express').Router();
const controladorProductos = require('../src/controller/producto.controller')
const controladorUsuario = require('../src/controller/usuario.controller')



router.get('/productos',controladorProductos.consultar);


router.get('/productos', controladorProductos.registrar);

//login
router.get('/signin', controladorUsuario.renderSignInPage);

// Rutas de autenticación
router.get('/iniciar_sesion', (req, res) => {
    if (req.session.pista) return res.redirect('/');
    res.render('iniciar_sesion', { datos_form: {}, messages: [] });
});
router.post('/iniciar_sesion', usuarioController.iniciarSesion);
router.get('/cerrar_sesion', usuarioController.cerrarSesion);
router.get('/registrarse', (req, res) => {
    res.render('registrarse', { values: {}, messages: [] });
});

router.post('/registrarse', usuarioController.registrarUsuario);


//Catalogo
router.get('/productos', controladorProductos.addProducto);



module.exports= router