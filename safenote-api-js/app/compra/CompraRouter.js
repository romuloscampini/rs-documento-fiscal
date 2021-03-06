/*
 * @author romuloscampini
 */

var bodyParser = require('body-parser');
var express = require('express');
var router  = express.Router();
var controleOC = require('./CompraController');
var controleUtils = require('../controllers/UtilsController');


router.get('/', function(req, res) {
    var body = req.body;
    var busca = req.query.busca;

    console.log('buscar model por', busca);
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

router.post('/criar', function(req, res) {
    var body = req.body;

    console.log('criar model');
    controleOC.salvar(body, function(err, dados) {
        if (err) {
            res.status(200).json(err);
        }
        res.status(200).json({mensagem: 'criacao de model realizada! '});
    });

});

router.post('/upload', function(req, res) {
    var body;
    var filename;

    controleUtils.uploadFile(req, function(dados, err){
        if(err){
            res.status(200).json(err);
        }else {
            filename = dados.path;
            body = dados;
            console.log(dados.path);
            res.status(200).json(dados);
        }
    });

});


router.route('/:id')
    .get(function(req, res){
        console.log('buscar model por id');
        controleOC.buscarPorId(req.params.id, function(err, compra){
            if (err) {
                res.send(err);
            }
            res.json(compra);
        });
    })
    .put(function(req, res) {
        console.log('atualizar model');
        controleOC.salvar({id: req.params.id}, function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ mensagem: 'atualizacao de model realizada'});
        });
    })
    .delete(function(req, res){
        console.log('apagar model');
        // controleOC.excluir
    });

router.post('/mock', function(req, res) {
    console.log('criar model mock');

    controleOC.mockNovaCompra(null, function(err) {
        if (err) {
            res.send(err);
        }
        res.json({mensagem: 'criacao de model mock realizada!'});
    });
});
module.exports = router;
