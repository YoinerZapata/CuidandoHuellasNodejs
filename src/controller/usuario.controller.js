const modeloUsuario = require('../models/usuario.model');
const dbUsuario = require('../data/usuario.data');

exports.loginUser = async (req, res) => {
    const {correo, contraseña} = req.body;
    try{
        if (!correo || !contraseña) return res.render('signin', {error: "Ingrese todos los datos"});
        const user = await dbUsuario.findOneUser({correo: correo}, {correo: 1, contraseña: 1, rol: 1});
        if (!user) {
            return res.render('signin', {error: "Este Usuario no existe"});
        } else{
            const passwordIsCorrect = await bcrypt.compare(contraseña, user.contraseña);
            if (!passwordIsCorrect) {
                return res.render('signin', {error: "Contraseña Incorrectas"});
            } else {
                return res.cookie('user', user._id).redirect('/profile')
            }
        }
    } catch (error) {
        console.error(error);
        return res.render('500', {
            error: error,
        });
    }
};

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
