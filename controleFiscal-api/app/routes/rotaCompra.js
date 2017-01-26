/*
 * @author romuloscampini
 */

var bodyParser = require('body-parser');
var express = require('express');
var router  = express.Router();
var controleOC = require('../controllers/controleCompra');

router.get('/', function(req, res) {
    var body = req.body;
    var busca = req.query.busca;

    console.log('vai buscar por', busca);
    if (busca) {
        controleOC.buscar(busca, function (err, dados) {
            if(err){
                res.json(err);
            };
            res.json(dados);
        });
    }else {
        controleOC.listar(function(err, dados){
            if(err){
                res.json(err);
            }
            res.status(200).json(dados);
        });
    }
});

module.exports = router;
