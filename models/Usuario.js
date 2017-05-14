"use strict";

// Requerimos el módulo Mongoose
const mongoose = require('mongoose');

// Creamos el esquema del Usuario
const usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
}); 

// Creamos el modelo de Anuncio
var Usuario = mongoose.model('Usuario', anuncioSchema);

// Exportamos el modelo de Anuncio
module.exports = Usuario;