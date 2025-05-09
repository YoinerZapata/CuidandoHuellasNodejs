const modeloProducto = require('../models/producto.model');
const dbProducto = require('../data/producto.data');

exports.addProducto = async (req, res) => {
    try{
        const ProductoIsRegistered = await dbProducto.findProducto({referencia: req.body.referencia});
        if (ProductoIsRegistered){
            return res.status(400).json({error: 'Este producto ya se encuentra registrado'})
        }
        const Producto = await dbProducto.createProductoRecord(req.body);
        return res.status(200).json({mensaje: 'Producto registrado con exito', Producto});
    }catch(error){
        console.error(error);
        return res.render('500', {error: error,});
    }
};

exports.consultar = async (req, res) => {
    try {
      const productos = await dbProducto.getAllProductos();
      res.status(200).json(productos)// renderiza la vista productos.ejs
    } catch (error) {
      console.log(error);
    }
  };





























exports.consultar = async (req,res)=>{
    let listaProductos = await modeloProducto.find({});
    console.log(listaProductos)
    if (listaProductos){
        // res.json(listaProductos)
        res.render('pages/index', {listaProductos})
    }else{
        res.json({"Error":"Hubo un error"})
    }
};

exports.registrar = async (req,res)=>{
    let listaProductos = await modeloProducto.find({});
    console.log(listaProductos)
    if (listaProductos){
        res.json(listaProductos)
    }else{
        res.json({"Error":"Hubo un error"})
    }
};