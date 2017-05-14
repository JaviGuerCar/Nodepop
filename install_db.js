"use strict";

// cargamos los modulos necesarios como:
// - fs para leer el fichero json, path para la ruta
// - modelo de anuncio
// - mongoose para la conexión a base de datos
const fs = require('fs');
const path = require('path');
const Anuncio = require('./models/Anuncio');
const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;


function installDB(callback){

    const fichero = path.join('./data', 'anuncios.json');
    //console.log(fichero);
    // Leemos contenido de un archivo anuncios.json
    fs.readFile(fichero, 'utf-8', (err, data) => {
        if (err){
            callback(err);
            return;
        }
        try {
             // Parsear el contenido del archivo convirtiendolo en un objeto
            var anunciosJson = JSON.parse(data);
            //console.log(anunciosJson);         
        } catch (err){
            callback(err);
            return;
        }
        // llamamos al callback, pasando el error y los datos
        callback(null, anunciosJson);

    });

}

installDB(function(err, listaAnuncios){
    if(err){
        console.log('Ha habido un error');
        return;
    }

    // Primero borramos la BD
    mongoose.connect('mongodb://localhost/nodepop', function(err,anunciosBorrados){
        if (err) {
            return callback (err);
        }
        mongoose.connection.db.dropDatabase();
        console.log('Anuncios borrados correctamente');
    });
    
    
    // Después insertamos los anuncios del Json
    Anuncio.insertMany(listaAnuncios.anuncios, function(err, anunciosPrecargados){
        if (err) {
            return callback (err);
        }
        console.log('Anuncio dado de alta:', anunciosPrecargados);
    });

});

module.exports = installDB;