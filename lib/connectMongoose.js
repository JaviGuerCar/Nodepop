"use strict";

const mongoose = require ('mongoose');

// creamos un objeto conexion
const conn = mongoose.connection;

// le decimos a Mongoose que libreria de promesas vamos a usar
mongoose.Promise = global.Promise;

// Escuchamos el evento por si da error (EventEmitter)
conn.on('error', err => {
    console.log('Error de conexion', err);
    process.exit(1);
});

// Lanzamos un evento si arranca bien, pero solo una vez con "once"
conn.once('open', () => {
    console.log('Conectado a MongoDB');
})

//mongoose.connect('mongodb://localhost/nodepop');
mongoose.connect('mongodb://nodepop:nodemola@localhost/nodepop');

// NO necesitamos exportar nada, ya que mongoose se guarda la conexion internamente
