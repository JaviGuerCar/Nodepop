"use strict";

// Requerimos las librerías JWT para la autenticación
// Requerimos moment para controlar las fechas de expiración del token
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');
const customError = require('../customError');


// Función para enviar y crear el token
function createToken (usuario){
    const payload = {
        sub: usuario._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
    }

    return jwt.encode(payload, config.SECRET_TOKEN);
}

// Función para decodificar el token
function decodeToken (token) {
    // Creamos una promesa
    const decoded = new Promise((resolve, reject) => {
        try {
            // Creamos el objeto payload y llamamos a la función decode de JWT
            const payload = jwt.decode(token, config.SECRET_TOKEN);
            
            // validamos que el token no esté caducado
            if (payload.exp <= moment().unix()){
                reject({
                    status: 401,
                    message: customError.tokenExpirado
                })
            };
            // Si no está caducado, hacemos resolve
            resolve(payload.sub);

        } catch (err) {
            console.log('Token invalido');
            reject({
                status: 500,
                message: customError.tokenInvalido
            })
        }
    }) 
    
    return decoded;
    
}

module.exports = {
    createToken,
    decodeToken
}