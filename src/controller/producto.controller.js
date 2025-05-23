const modeloProducto = require('../models/producto.model');
const dbProducto = require('../data/producto.data');

exports.addProducto = async (req, res) => {
    try {
        console.log("Solicitud recibida:", req.body); // Verifica si llegan los datos

        const ProductoIsRegistered = await dbProducto.findProducto({ referencia: req.body.referencia });
        console.log("Resultado de la búsqueda:", ProductoIsRegistered);

        if (ProductoIsRegistered) {
            console.log("Producto ya registrado.");
            return res.status(400).json({ error: "Este producto ya se encuentra registrado" });
        }

        const Producto = await dbProducto.createProductoRecord(req.body);
        console.log("Producto guardado:", Producto);

        return res.status(200).json({ mensaje: "Producto registrado con éxito", Producto });
    } catch (error) {
        console.error("Error en la inserción:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

exports.getProductos = async (req, res) => {
    try {
        const productos = await dbProducto.getAllProductos();
        res.status(200).json(productos);
    } catch (error) {
        console.log(error)
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