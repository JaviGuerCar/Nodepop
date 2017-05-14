"use strict";

// Requerimos el módulo mongoose
const mongoose = require('mongoose');

// Creamos el esquema de Anuncio
const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

// Creamos un método estático para filtrar
anuncioSchema.statics.list = function (filter, limit, fields, sort, callback){
    const query = Anuncio.find(filter);
    query.limit(limit);
    query.select(fields);
    query.sort(sort);
    query.exec(callback);
}

// Creamos el modelo de Anuncio
var Anuncio = mongoose.model('Anuncio', anuncioSchema);

// Exportamos el modelo de Anuncio
module.exports = Anuncio;