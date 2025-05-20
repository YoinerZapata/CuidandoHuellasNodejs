const exp = require("express")
const path = require('path');
const modeloProducto = require('./src/models/producto.model')


const app = exp();

const session = require('express-session');

// Asegúrate de que esto esté ANTES de cualquier middleware que use session
app.use(session({
    secret: 'tu-secreto-seguro-aqui', // Cambia esto
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // true en producción con HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 1 día
    }
}));

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(exp.static(path.join(__dirname, 'public')));

// Middleware para pasar datos de sesión a las vistas
app.use((req, res, next) => {
  res.locals.session = (req.session && req.session.pista) ? req.session.pista : null;
  next();
});


// Ruta de inicio de sesión (GET)
app.get('/iniciar_sesion', (req, res) => {
  // Si ya está autenticado, redirigir
  if (req.session.pista) {
      return res.redirect('/');
  }
  res.render('iniciar_sesion', { datos_form: {}, messages: [] });
});


// Ruta de inicio de sesión (POST)
app.post('/iniciar_sesion', async (req, res) => {
  if (!req.session) {
    return res.status(500).render('error', { message: 'Error de configuración de sesión' });
  }
  
  // Obtener datos del formulario
  const { correo, contraseña } = req.body;
  const datos_form = { correo }; // Mantener el correo para repoblar el formulario

  try {
    const usuario = await modeloUsuario.findOne({ correo: correo }); // Usar el correo del body
      
    if (!usuario) {
      return res.render('iniciar_sesion', { 
        datos_form, // Ahora está definido
        messages: [{ type: 'error', text: 'El usuario no existe' }]
      });
    }
      
    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
      
    if (!contraseñaValida) {
      return res.render('iniciar_sesion', { 
        datos_form, // Ahora está definido
        messages: [{ type: 'error', text: 'Usuario o contraseña incorrectos...' }]
      });
    }
      
    // Crear sesión
    req.session.pista = {
      foto_perfil: usuario.foto_perfil || null,
      telefono: usuario.telefono,
      id: usuario.id_usuario,
      rol: usuario.rol,
      nombre_completo: usuario.nombre_completo,
      es_administrador: usuario.es_administrador
    };
      
    // Mensaje de bienvenida
    req.session.messages = [{ type: 'success', text: 'Bienvenido a Cuidando Huellas !!' }];
      
    // Redirección según rol
    if (usuario.rol === 1) {
      return res.redirect('/pagina-administrador');
    } else if (usuario.rol === 2) {
      return res.redirect('/pagina-usuario');
    }
      
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.render('iniciar_sesion', { 
      datos_form: { correo: req.body.correo || '' }, // Definido para el caso de error
      messages: [{ type: 'error', text: 'Ocurrió un error al iniciar sesión' }]
    });
  }
});

app.get('/registrarse', (req,res) =>{
  res.render('registrarse', {messages: []});
});


app.get('/', (req, res) => {
    // Si tienes lógica de sesión, pásala aquí:
    //   const loggedIn = Boolean(req.session && req.session.pista);
    //   res.render('pagina_principal', { loggedIn });
    res.render('pagina_principal', { loggedIn: false });
  });
  
// Ruta para cerrar sesión
app.get('/cerrar_sesion', (req, res) => {
  req.session.destroy(err => {
      if (err) {
          console.error('Error al cerrar sesión:', err);
      }
      res.redirect('/');
  });
});

app.get('/productos', async(req, res)=>{
  let listaProducto = await modeloProducto.find({});
  console.log(listaProducto)
  if (listaProducto){
      res.json(listaProducto);
  }else{
      res.json({"Error": "Hubo un error"})
  }

})


//callback 
app.listen(7171,()=>{
    console.log('servidor en linea, puerto 7171')
});
