const mongoose = require("../config/connection");

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const schemaUsuario = new mongoose.Schema({
    nombre_completo: {
        type: String,
        required: [true, 'Por favor ingrese su nombre completo'],
        trim: true
    },
    correo: {
        type: String,
        required: [true, 'Por favor ingrese un correo electrónico'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Por favor ingrese un correo válido']
    },
    contraseña: {
        type: String,
        required: [true, 'Por favor ingrese una contraseña'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    telefono: {
        type: String,
        required: [true, 'Por favor ingrese un número de teléfono'],
        match: [/^[0-9]{10,15}$/, 'Por favor ingrese un número de teléfono válido']
    },
    foto_perfil: {
        type: String,
        default: null
    },
    rol: {
        type: Number,
        enum: [1, 2], // 1 = Administrador, 2 = Usuario normal
        default: 2
    },
    es_administrador: {
        type: Boolean,
        default: false
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    }
});


const modeloUsuario = mongoose.model("usuario", schemaUsuario);

module.exports = modeloUsuario;

