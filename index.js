const exp = require("express")
const path = require('path');
const modeloProducto = require('./src/models/producto.model')
const dbProducto = require("./src/data/producto.data");

const route = require("./routes/router")


const app = exp();

// Middleware para procesar JSON y formularios
app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));


// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(exp.static(path.join(__dirname, 'public')));

app.use(route)


// Ruta de inicio de sesión (GET)
app.get('/iniciar_sesion', (req, res) => {
  res.render('iniciar_sesion', { messages: [] });
});


app.get('/registrar', (req,res) =>{
  res.render('registrarse', {messages: []});
});


app.get('/', (req, res) => {
    // Si tienes lógica de sesión, pásala aquí:
    //   const loggedIn = Boolean(req.session && req.session.pista);
    //   res.render('pagina_principal', { loggedIn });
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
