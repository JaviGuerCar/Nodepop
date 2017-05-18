"use strict";

const Anuncio = require('../models/Anuncio');
const mongoose = require ('mongoose');
const leeJson = require ('./leeJson');
mongoose.Promise = global.Promise;


function cargaAnuncios(callback){

    leeJson('anuncios.json', function(err, listaAnuncios){
    if(err){
        console.log('Ha habido un error');
        return;
    }

    console.log(listaAnuncios);

    // Borramos la colección de Anuncios
    Anuncio.collection.drop();
    console.log('Colección de Anuncios limpia');
    
    // Después insertamos los anuncios del Json
    Anuncio.insertMany(listaAnuncios.anuncios, function(err, anunciosPrecargados){
        if (err) {
            return callback (err);
        }
        console.log('Anuncio dado de alta:', anunciosPrecargados);
    });

});
}

module.exports = cargaAnuncios;