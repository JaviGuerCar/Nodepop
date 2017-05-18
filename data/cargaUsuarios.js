"use strict";

const Usuario = require('../models/Usuario');
const mongoose = require ('mongoose');
const leeJson = require ('./leeJson');
mongoose.Promise = global.Promise;


function cargaUsuarios(callback){

    leeJson('usuarios.json', function(err, listaUsuarios){
    if(err){
        console.log('Ha habido un error');
        return;
    }

    console.log(listaUsuarios);

    // Borramos la colección de Usuarios
    Usuario.collection.drop();
    console.log('Colección de Usuarios limpia');
    
    // Después insertamos los usuarios del Json
    Usuario.insertMany(listaUsuarios.usuarios, function(err, usuariosPrecargados){
        if (err) {
            return callback (err);
        }
        console.log('Usuario dado de alta:', usuariosPrecargados);
    });

});
}

module.exports = cargaUsuarios;