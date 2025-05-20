const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');

module.exports = {
    iniciarSesion: async (req, res) => {
        try {
            const { correo, contraseña } = req.body;
            const usuario = await Usuario.findOne({ correo });
            
            if (!usuario || !(await bcrypt.compare(contraseña, usuario.contraseña))) {
                return res.render('iniciar_sesion', {
                    datos_form: { correo },
                    messages: [{ type: 'error', text: 'Credenciales inválidas' }]
                });
            }

            req.session.pista = {
                id: usuario._id,
                nombre_completo: usuario.nombre_completo,
                correo: usuario.correo,
                rol: usuario.rol,
                foto_perfil: usuario.foto_perfil
            };

            const redirectPath = usuario.rol === 1 ? '/admin' : '/';
            res.redirect(redirectPath);

        } catch (error) {
            console.error('Login error:', error);
            res.status(500).render('iniciar_sesion', {
                datos_form: req.body,
                messages: [{ type: 'error', text: 'Error del servidor' }]
            });
        }
    },

    cerrarSesion: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/iniciar_sesion');
        });
    },

    registrarUsuario: async (req, res) => {
        try {
            const { nombre_completo, correo, contraseña, telefono } = req.body;
            
            if (await Usuario.findOne({ correo })) {
                return res.render('registrarse', {
                    values: req.body,
                    messages: [{ type: 'error', text: 'El correo ya existe' }]
                });
            }

            const nuevoUsuario = new Usuario({
                nombre_completo,
                correo,
                contraseña,
                telefono,
                rol: 2
            });

            await nuevoUsuario.save();
            res.redirect('/iniciar_sesion?registro=exitoso');

        } catch (error) {
            console.error('Register error:', error);
            res.render('registrarse', {
                values: req.body,
                messages: [{ type: 'error', text: 'Error al registrar' }]
            });
        }
    }
};