"use strict";

// Requerimos el módulo mongoose
const mongoose = require('mongoose');

// Creamos el esquema de Anuncio
const anuncioSchema = mongoose.Schema({
    nombre: {type: String, index: true},
    venta: Boolean,
    precio: {type: Number, default: 0, index:true},
    foto: String,
    tags: [String]
});

// Creamos un método estático para filtrar
anuncioSchema.statics.list = function (filter, limit, skip, fields, sort, callback){
    const query = Anuncio.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    query.exec(callback);
}

// Creamos método estático para listar los Tags usados en la base de datos
anuncioSchema.statics.listaTags = function(callback){
    Anuncio.distinct('tags',callback);
};

// Creamos el modelo de Anuncio
var Anuncio = mongoose.model('Anuncio', anuncioSchema);

// Exportamos el modelo de Anuncio
module.exports = Anuncio;