const modeloProducto = require('../models/producto.model');

exports.createProductoRecord = async (productoInfo) =>{
    try {
        return new modeloProducto(productoInfo).save();
    } catch (error) {
        return error;
    }
};

exports.findProducto = async (filter, projection) =>{
    try {
        if (!projection) return await modeloProducto.findOne(filter);
        else return await modeloProducto.findOne(filter, projection);
    } catch (error){
        return error;
    }
};

exports.getAllProductos = async () => {
    try {
        return await modeloProducto.find(); // Devuelve la lista completa de productos
    } catch (error) {
        return error;
    }
};


exports.updateProductoRecord = async (filter, projection) => {
    
}