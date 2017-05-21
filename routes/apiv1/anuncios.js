"use strict";

// cargamos los módulos requeridos
var express = require('express');
var router = express.Router();
const Anuncio = require('../../models/Anuncio');

// Filtros
// GET /apiv1/agentes
router.get('/', (req, res, next) => {

    // Campos por los que filtrar
    const nombre = req.query.nombre;
    const venta = req.query.venta;
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const fields = req.query.fields;
    const sort = req.query.sort;
    const precio = req.query.precio;
    const tags = req.query.tags;

    // Creo el filtro vacio
    const filter = {};
    // le añadimos filtro por nombre
    if (nombre) {
         filter.nombre = new RegExp('^' + nombre, "i"); // Ponemos i para que sea case-insensitive
     }
    // le añadimos filtro por venta
    if (venta) {
        filter.venta = venta;
    }
    
    // Filtro para rangos de precios.
    if (precio){
        // Metemos el rango en un array suprimiendo el signo "-""
        let rangoPrecios = precio.split('-');
        console.log(rangoPrecios);
        // Definimos dos variables:
        // RangoInferior es el primer valor del array
        // RangoSuperior es el segundo valor del array
        let rangoInferior = rangoPrecios[0];
        let rangoSuperior = rangoPrecios[1];
        // Si en el array existen los dos elementos, es que está filtrando entre dos valores
        if(rangoInferior&&rangoSuperior){
            filter.precio = {
                    $gte: rangoInferior,
                    $lte: rangoSuperior
                };
        } else { // Si nos dan el rango inferior seguido de -, filtramos desde el rangoInferior
            if (isNaN(precio)) {
                 if(rangoInferior){
                    filter.precio={
                        $gte: rangoInferior
                    }
                 }
             // Si nos dan el signo - seguido del rangoSuperior, filtramos hasta el rangoSuperior
            } else if(rangoSuperior){
                filter.precio={
                    $lte: rangoSuperior
                }
            } else { // Si solo nos dan un valor, filtramos por ese valor
                filter.precio = precio;
            }
        }   
    }


    // Añadir filtrado por tags
    if (tags) {
        // Los diferentes tags los separamos por comas "," y los metemos en un array
        let listaTags = tags.split(",")
        console.log(listaTags);

        // Recuperamos todos los tags en la listaTags
        filter.tags = { $in: listaTags };
    }

    // Hacemos la búsqueda y le pasamos los parámetros de filtrado
    Anuncio.list(filter, limit, skip, fields, sort, (err, anuncios) => {
        if(err){
            // llamamos al middleware de error
            next(err);
            return;
        }
        res.json({success: true, anuncios: anuncios});
    });


});


// Creamos anuncios para probar (no necesario para la práctica)
// POST /apiv1/agentes
router.post('/', (req, res, next) => {
    console.log(req.body);
    // Creamos un objeto de tipo Anuncio
    const anuncio = new Anuncio(req.body);
    //lo guardamos en BD
    anuncio.save((err, anuncioNuevo) => {
        if(err) {
            next(err);
            return;
        }
        res.json({success:true, anuncios: anuncioNuevo});
    });

})

/*lista de Tags existentes */
router.get('/tags', (req, res, next) => {
     Anuncio.listaTags((err, lista) => {
            if (err){
                next(err);
                return;
            }
            res.json({success: true, result: lista});
     });  

});


module.exports = router;

