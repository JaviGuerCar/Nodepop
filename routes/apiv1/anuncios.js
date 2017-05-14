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
    const tags = req.query.tags;
    const venta = req.query.venta;
    const limit = parseInt(req.query.limit);
    const fields = req.query.fields;
    const sort = req.query.sort;

    // Creo el filtro vacio
    const filter = {};

    if (nombre) {
        filter.nombre = nombre;
    }

    if (tags) {
        filter.tags = tags;
    }
    
    if (venta) {
        filter.venta = venta;
    }

    Anuncio.list(filter, limit, fields, sort, (err, anuncios) => {
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

module.exports = router;