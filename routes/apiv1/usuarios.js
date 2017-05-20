"use strict";

// Requerimos mongoose y modelo de Usuario y el servicio donde obtenemos el token
const mongoose = require('mongoose');
const Usuario = require('../../models/Usuario');
const services = require('../../services')
const customError = require('../../customError');

// Función de registro de Usuarios
function registroUsuario (req, res) {
    const usuario = new Usuario({
        nombre: req.body.nombre,
        email: req.body.email,
        clave: req.body.clave
    })

    usuario.save((err) => {
        if (err){
            res.status(500).send({message:customError.registroIncorrecto, err});
        }
        console.log(customError.registroCorrecto);
        return res.status(201).send({
            message: customError.registroCorrecto,
            token: services.createToken(usuario)// Enviamos el token
        }); 
    })
}

// Función de logeo de Usuarios
function loginUsuario (req, res) {
    Usuario.findOne({ email: req.body.email.toLowerCase(), clave:req.body.clave.toLowerCase() }, (err, usuario) => {
        if(err){
            return res.status(500).send({message: err});
            
        }
        if(!usuario){
            console.log("No existe el usuario");
            return res.status(404).send({message:customError.loginIncorrecto});
        }
        req.usuario = usuario;
        console.log(usuario)
        res.status(200).send({
            message: customError.loginCorrecto,
            token: services.createToken(usuario) // Enviamos el token
        })
    })
}


module.exports = {
    registroUsuario,
    loginUsuario
}