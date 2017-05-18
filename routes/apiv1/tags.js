"use strict";

// cargamos los módulos requeridos
var express = require('express');
var router = express.Router();
const Tags = require('../../models/Tags');

//GET /apiv1/tags
router.get('/', function(req, res, next) {
    Tags.find().exec((err, tags) => {
        if(err){
            // llamamos al middleware de error
            next(err);
            return;
        }
        res.json({success: true, result: tags});
    });
});

module.exports = router;