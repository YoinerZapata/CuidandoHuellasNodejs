const mongoose = require("../config/connection");

const schemaUsuario = new mongoose.Schema({
    nombre_completo: {
        type: String,
        required: [true, 'Por favor ingrese su nombre completo'],
        trim: true
    },
    telefono: {
        type: Number,
        required: [true, 'Por favor ingrese un número de teléfono'],
        match: [/^[0-9]{10,15}$/, 'Por favor ingrese un número de teléfono válido'],
        default: 1, 
    },
    correo: {
        type: String,
        required: [true, 'Por favor ingrese un correo electrónico'],
        unique: true,
        lowercase: true,
    },
    contraseña: {
        type: String,
        required: [true, 'Por favor ingrese una contraseña'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    rol: {
        type: Number,
        enum: [1, 2], // 1 = Administrador, 2 = Usuario normal
        default: 2
    },
});


const modeloUsuario = mongoose.model("usuario", schemaUsuario);

module.exports = modeloUsuario;

