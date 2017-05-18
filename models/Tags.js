"use strict";

// Requerimos el módulo mongoose
const mongoose = require('mongoose');

// Creamos el esquema de Tags
const tagsSchema = mongoose.Schema({
    nombre: {type: String, index: true},
});

// Creamos el modelo de Anuncio
var Tags = mongoose.model('Tags', tagsSchema);

// Exportamos el modelo de Anuncio
module.exports = Tags;