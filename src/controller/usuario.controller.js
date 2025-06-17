const modeloUsuario = require('../models/usuario.model');
const dbUsuario = require('../data/usuario.data');
const bcrypt = require('bcrypt');

exports.loginUser = async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        if (!correo || !contraseña) {
            return res.render('iniciar_sesion', { error: "Ingrese todos los datos" });
        }

        const user = await dbUsuario.findOneUser({ correo: correo }, { correo: 1, contraseña: 1, rol: 1 });

        if (!user) {
            return res.render('iniciar_sesion', { mensaje: "El usuario no existe" });
        }

        const passwordIsCorrect = await bcrypt.compare(contraseña, user.contraseña);

        if (!passwordIsCorrect) {
            return res.render('iniciar_sesion', { mensaje: "La contraseña es incorrecta" });
        }

        // Validar rol y redirigir
        res.cookie('user', user._id); // Guardar cookie con el ID

        if (user.rol === 1) {
            return res.redirect('/pagina_administrador'); // página para Usuarios Normales
        } else if (user.rol === 2) {
            return res.redirect('/pagina_usuario'); // página para administradores
        } else {
            return res.render('iniciar_sesion', { mensaje: "Rol no válido" });
        }

    } catch (error) {
        console.error(error);
        return res.render('500', { error: error });
    }
}

exports.logout = async (req, res) =>{
    try{
        return res.clearCookie('user').redirect('/');
    }catch (error){
        console.error(error);
        return res.render('500',{
            error:error,
        })
    }
};

exports.registrarUsuario = async (req, res) => {
    try {
        const { nombre_completo, telefono, correo, contraseña, rol } = req.body;

        // Validar campos básicos
        if (!nombre_completo || !telefono || !correo || !contraseña) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        console.log('Correo recibido:', correo);

        // Verificar si el usuario ya existe (búsqueda insensible a mayúsculas)
        const usuarioExistente = await dbUsuario.findOneUser({ correo: { $regex: new RegExp(`^${correo}$`, 'i') } });

        console.log('Usuario encontrado:', usuarioExistente);

        if (usuarioExistente) {
            return res.status(409).json({ error: 'Este correo ya está registrado' });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Crear objeto de usuario
        const nuevoUsuario = {
            nombre_completo,
            telefono,
            correo,
            contraseña: hashedPassword,
            rol: rol || 1 // por defecto es usuario normal
        };

        // Guardar en la BD
        const usuarioCreado = await dbUsuario.createUserRecord(nuevoUsuario);

        return res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            usuario: {
                id: usuarioCreado._id,
                nombre_completo: usuarioCreado.nombre_completo,
                correo: usuarioCreado.correo,
                rol: usuarioCreado.rol
            }
        });
    } catch (error) {
        console.error('Error en registro:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
