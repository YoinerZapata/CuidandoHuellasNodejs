const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre_completo: String,
  ciudad: String,
  telefono: String,
  correo: String,
  contraseña: String,
  rol: String
});

module.exports = mongoose.model('Usuario', usuarioSchema);
