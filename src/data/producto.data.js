const modeloProducto = require('../models/producto.model');

exports.createProductoRecord = async (ProductoInfo) =>{
        try{
            return new Producto(ProductoInfo).save();
        } catch (error){
            return error;
        }
};

exports.findProducto = async (Filter, projection) =>{
    try {
        if (!projection) return await Producto.findOne(filter);
        else return await Producto.finProducto.findOne(filter,projection);
    } catch (error){
        return error;
    }
}

exports.updateProductoRecord = async (filter, projection) =>{

}