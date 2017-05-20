"use strict";
// Requerimos los modulos creados con las funciones de Carga
const cargaAnuncios = require('./data/cargaAnuncios');
const cargaUsuarios = require('./data/cargaUsuarios');

require('./lib/connectMongoose'); // Se llama a BBDD y se conecta

console.log('Inicializando la Base de Datos...');

// Llamamos a la función de carga de anuncios de muestra en la BD
cargaAnuncios((err, listaAnuncios) => {
    if (err) {
    console.log('Error:', err);
    process.exit(1);
  }
  console.log('Carga de anuncios terminada.');
});

// Llamamos a la función de carga de usuarios de muestra en la BD
cargaUsuarios((err, listaUsuarios) => {
    if (err) {
    console.log('Error:', err);
    process.exit(1);
  }
  console.log('Carga de usuarios terminada.');
});

