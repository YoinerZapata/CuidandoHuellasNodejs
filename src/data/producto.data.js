const modeloProducto = require('../models/producto.model');

exports.createProductoRecord = async (ProductoInfo) =>{
        try{
            return new modeloProducto(ProductoInfo).save();
        } catch (error){
            return error;
        }
};

exports.findProducto = async (filter, projection) =>{
    try {
        if (!projection) return await modeloProducto.findOne(filter);
        else return await modeloProducto.finProducto.findOne(filter,projection);
    } catch (error){
        return error;
    }
}

exports.updateProductoRecord = async (filter, projection) =>{

}