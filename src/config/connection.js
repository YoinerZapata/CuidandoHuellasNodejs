const mongoose = require('mongoose');
require('dotenv').config();

const URI = `mongodb+srv://${process.env.USUARIOBD}:${process.env.PASSBD}@adso2846458.b305v.mongodb.net/${process.env.BD}`

mongoose.connect(URI)

module.exports = mongoose;

mongoose.connection.on('connected', () => {
    console.log('Conexión establecida exitosamente');
  });
  
  mongoose.connection.on('error', (err) => {
    console.error('Error en la conexión:', err);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('La conexión se ha cerrado');
  });