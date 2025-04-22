const exp = require('express');
const app = exp();

const Usuario = require('./models/Usuario');

app.get('/crear-usuario', async (req, res) => {
  const nuevo = new Usuario({
    nombre_completo: "Elena Prueba",
    ciudad: "Bogotá",
    telefono: "123456789",
    correo: "elena@email.com",
    contraseña: "1234"
  });

  await nuevo.save();
  res.send("✅ Usuario creado");
});

//callback 
app.listen(7777,()=>{
    console.log('servidor en linea, puerto 7777')
});
