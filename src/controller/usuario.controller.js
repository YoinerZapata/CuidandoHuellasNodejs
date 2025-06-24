const modeloUsuario = require('../models/usuario.model');
const dbUsuario = require('../data/usuario.data');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

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
        res.cookie('user', user._id); 

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
        const rolDefinido = rol || 1;

        if (!nombre_completo || !ciudad || !telefono || !correo || !contraseña || !confirmar_contraseña) {
            return res.render("registrarse", {
                mensaje: "Todos los campos son obligatorios",
                error: null
            });
        }

        if (contraseña !== confirmar_contraseña) {
            return res.render("registrarse", {
                mensaje: "Las contraseñas no coinciden",
                error: null
            });
        }

        const usuarioExistente = await dbUsuario.findOneUser({ correo });
        if (usuarioExistente) {
            return res.render("registrarse", {
                mensaje: "El correo ya está registrado",
                error: null
            });
        }

        const salt = await bcrypt.genSalt(10);
        const contraseñaHash = await bcrypt.hash(contraseña, salt);

        const nuevoUsuario = {
            nombre_completo,
            ciudad,
            telefono,
            correo,
            contraseña: contraseñaHash,
            rol: rolDefinido
        };

        await dbUsuario.createUserRecord(nuevoUsuario);

        // Intentar enviar el correo electrónico
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: correo,
                subject: "Bienvenido a Cuidando Huellas",
                text: `Hola ${nombre_completo}, ¡gracias por registrarte, Disfruta de todos nuestros servicios.!`
            };

            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            console.error("Error al enviar correo:", emailError);
            return res.render("registrarse", {
                mensaje: "Registro exitoso, pero no se pudo enviar el correo de bienvenida.",
                error: null
            });
        }

        return res.render("registrarse", {
            mensaje: "¡Registro exitoso! Ahora puedes iniciar sesión.",
            error: null
        });

    } catch (error) {
        console.error("Error en registro:", error);
        return res.render("registrarse", {
            mensaje: "Error interno al registrar usuario.",
            error: null
        });
    }
};
