const modeloUsuario = require('../models/usuario.model');
const modeloUsurio = require('../models/usuario.model');


exports.findOneUser = async (filter, projection) =>{
    try {
        if (!projection) return await modeloUsurio.findOne(filter);
        else return await modeloUsurio.findOne(filter,projection);
    } catch (error){
        return error;
    }
}

exports.findAllUser = async (filter, projection) =>{
    try {
        if (!projection) return await modeloUsuario.find({}, projection);
        else if (!projection) return await modeloUsuario.find(filter);
        else return await modeloUsuario.find(filter,projection)
    } catch (error){
        return error;
    }
}
exports.createUserRecord = async (UserInfo) =>{
    try{
        return modeloUsuario(UserInfo).save();
    } catch (error){
        return error;
    }
};