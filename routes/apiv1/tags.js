"use strict";

// cargamos los módulos requeridos
var express = require('express');
var router = express.Router();

const tags = ["work", "lifestyle", "motor", "mobile"]

router.get('/', function(req, res, next) {
 res.json({success: true, tags: tags 
  });
});

module.exports = router;