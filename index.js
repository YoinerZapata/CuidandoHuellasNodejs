const exp = require("express")
const path = require('path');
const modeloProducto = require('./src/models/producto.model')

const app = exp();

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(exp.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    // Si tienes lógica de sesión, pásala aquí:
    //   const loggedIn = Boolean(req.session && req.session.pista);
    //   res.render('pagina_principal', { loggedIn });
    res.render('pagina_principal', { loggedIn: false });
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
