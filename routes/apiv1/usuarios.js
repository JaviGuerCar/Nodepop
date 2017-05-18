"use strict";

// Requerimos mongoose y modelo de Usuario y el servicio donde obtenemos el token
const mongoose = require('mongoose');
const Usuario = require('../../models/Usuario');
const services = require('../../services')

// Función de registro de Usuarios
function registroUsuario (req, res) {
    const usuario = new Usuario({
        nombre: req.body.nombre,
        email: req.body.email,
        clave: req.body.clave
    })

    usuario.save((err) => {
        if (err){
            res.status(500).send({message: 'Error al crear el usuario', err});
        }
        return res.status(200).send({token: services.createToken(usuario)}); // Enviamos el token
    })
}

// Función de logeo de Usuarios
function loginUsuario (req, res) {
    Usuario.find({ email: req.body.email }, (err, usuario) => {
        if(err){
            return res.status(500).send({message: err});
        }
        if(!usuario){
            return res.status(404).send({message:'No existe el usuario'});
        }
        req.usuario = usuario;
        res.status(200).send({
            message: 'Te has logeado correctamente',
            token: services.createToken(usuario)
        })
    })
}


module.exports = {
    registroUsuario,
    loginUsuario
}