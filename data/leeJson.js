"use strict";

// cargamos los modulos necesarios como:
// - fs para leer el fichero json, path para la ruta
const fs = require('fs');
const path = require('path');

function leeJson(archivo, callback){

    const fichero = path.join('./data', archivo);
    //console.log(fichero);
    // Leemos contenido de un archivo anuncios.json
    let archivoJson = {};
    fs.readFile(fichero, (err, data) => {
        if (err){
            callback(err);
            return;
        }
        try {
             // Parsear el contenido del archivo convirtiendolo en un objeto
            var archivoJson = JSON.parse(data);         
        } catch (err){
            callback(err);
            return;
        }
        // llamamos al callback, pasando el error y los datos
        callback(null, archivoJson);

    });

}

module.exports = leeJson;