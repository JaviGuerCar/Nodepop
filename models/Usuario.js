"use strict";

// Requerimos el módulo Mongoose y el bcrypt para encriptar la contraseña
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// Creamos el esquema del Usuario
const usuarioSchema = mongoose.Schema({
    nombre: { type: String, lowercase: true, index: true },
    email: { type: String, lowercase: true, index: true, unique: true },
    clave: { type: String, select: false },
    fechaRegistro: { type: Date, default: Date.now() },
    ultimaConexion: Date
}); 

// Usamos el pre para hacer el hash antes de guardar el usuario
usuarioSchema.pre('save', function(next) {
    var usuario = this;
    if (!usuario.isModified('clave')){
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err){
            return next();
        }
        bcrypt.hash(usuario.clave, salt, null, (err, hash) => {
            if (err){
                return next();
            }
            usuario.clave = hash;
            next();     
        })
    });
});
// Creamos el modelo de Anuncio
var Usuario = mongoose.model('Usuario', usuarioSchema);

// Exportamos el modelo de Anuncio
module.exports = Usuario;