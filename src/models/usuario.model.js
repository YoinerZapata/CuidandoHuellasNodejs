const mongoose = require("../config/connection");

const schemaUsuario = new mongoose.Schema({
    nombre_completo: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
      },
      celular: {
        type: String,
        required: true,
      },
      rol: {
        type: String,
        enum: ['cliente', 'admin'],
        default: 'cliente',
      }
});


const modeloUsuario = mongoose.model("usuario", schemaUsuario);

module.exports = modeloUsuario;