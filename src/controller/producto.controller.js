const modeloProducto = require('../models/Usuario');


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