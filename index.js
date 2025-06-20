const exp = require("express")
const app = exp();

const path = require('path');
const dbProducto = require("./src/data/producto.data");
const passport = require('passport');
require('dotenv').config();
require('./src/auth/google'); // importa la configuración Google

const route = require("./routes/router")

const session = require('express-session');

// Middleware para procesar JSON y formularios
app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));

// Configurar sesiones
app.use(session({
  secret: 'secreto123',
  resave: false,
  saveUninitialized: false
}));


// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());


// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(exp.static(path.join(__dirname, 'public')));

app.use(route)

// Rutas Google OAuth
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/iniciar_sesion' }),
  (req, res) => {
    console.log(req.user); 
    if (!req.user) {
      req.session.messages = [{ type: 'error', text: 'Error al autenticar usuario.' }];
      return res.redirect('/iniciar_sesion');
    }
    req.session.messages = [{ type: 'success', text: `¡Bienvenido, ${req.user.nombre_completo}!` }];
    res.redirect('/');
  }
);

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

app.get('/', (req, res) => {
  const messages = req.session.messages || [];
  req.session.messages = []; // ayuda a limpiar mensajes después de mostrarlos
  res.render('pagina_principal', { messages });
});

// Ruta de inicio de sesión (GET)
app.get('/iniciar_sesion', (req, res) => {
  res.render('iniciar_sesion', { mensaje: null });
});


app.get('/registrar', (req,res) =>{
  res.render('registrarse', {mensaje: null});
});

app.get("/pagina_administrador", (req, res) => {
  res.render("pagina_administrador");
});
 
app.get('/', (req, res) => {
    // Si tienes lógica de sesión, pásala aquí:
    res.render('pagina_principal', { loggedIn: false });
  });
  
app.get("/productos", async (req, res) => {
  try {
    const productos = await dbProducto.getAllProductos();
    console.log("Productos obtenidos:", productos);
    res.render("productos", { productos });
  } catch (error) {
    console.error("Error cargando los productos:", error);
    res.status(500).send("Error cargando los productos");
  }
});


//callback 
app.listen(7171,()=>{
    console.log('servidor en linea, puerto 7171')
});
