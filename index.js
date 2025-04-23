const exp = require("express")
const modeloProducto = require('./src/models/producto.model')

const app = exp();

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
