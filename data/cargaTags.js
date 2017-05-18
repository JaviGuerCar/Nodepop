"use strict";

const Tags = require('../models/Tags');
const mongoose = require ('mongoose');
const leeJson = require ('./leeJson');
mongoose.Promise = global.Promise;


function cargaTags(callback){

    leeJson('tags.json', function(err, listaTags){
    if(err){
        console.log('Ha habido un error');
        return;
    }

    console.log(listaTags);

    // Borramos la colección de Tags
    Tags.collection.drop();
    console.log('Colección de Tags limpia');
    
    // Después insertamos los tags del Json
    Tags.insertMany(listaTags.tags, function(err, tagsPrecargados){
        if (err) {
            return callback (err);
        }
        console.log('Tags dados de alta:', tagsPrecargados);
    });

});
}

module.exports = cargaTags;