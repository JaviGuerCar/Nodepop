"use strict";

const services = require('../services');

// Funcion Autenticacion
function isAuth (req, res, next) {
    //Comprobamos si en el req.headers existe un campo Authorization
    if(!req.headers.authorization){
        return res.status(403).send({message: 'No tienes autorización'});
    }
    // Si existe la cabecera creamos la variabla token para recoger la cabecera
    const token = req.headers.authorization.split(' ')[1];
    
    // Decodificamos el token
    services.decodeToken(token)
        .then(response => {
            req.usuario = response;
            next();
        })
        .catch(response => {
            res.status(response.status)
        })
}


module.exports = isAuth;