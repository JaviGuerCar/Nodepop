"use strict";

const cargaAnuncios = require('./data/cargaAnuncios');
const cargaUsuarios = require('./data/cargaUsuarios');
const cargaTags = require('./data/cargaTags');

require('./lib/connectMongoose'); // Se llama a BBDD y se conecta

console.log('Inicianlizando la Base de Datos...');

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

// Llamamos a la función de carga de tags de muestra en la BD
cargaTags((err, listaTags) => {
    if (err) {
    console.log('Error:', err);
    process.exit(1);
  }
  console.log('Carga de tags terminada.');
});

