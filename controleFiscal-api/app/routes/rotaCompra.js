/*
 * @author romuloscampini
 */

var bodyParser = require('body-parser');
var express = require('express');
var router  = express.Router();
var controleOC = require('../controllers/controleCompra');
var controleUtils = require('../controllers/controleUtils');


router.get('/', function(req, res) {
    var body = req.body;
    var busca = req.query.busca;

    console.log('buscar compra por', busca);
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
    var body;
    var filename;

    // var body = controleUtils.uploadFile(req, function () {
    //
    // }



    controleUtils.uploadFile(req, function(dados, err){
        if(err){
            throw err;
        }else {
            filename = dados.filename;
            body = dados;
            console.log(dados.filename);
        }
    });

    console.log('criar compra');
    controleOC.salvar(body, function(err) {
        if (err) {
            res.send(err);
        }
        res.json({mensagem: 'criacao de compra realizada!'});
    });
});

router.route('/:id')
    .get(function(req, res){
        console.log('buscar compra por id');
        controleOC.buscarPorId(req.params.id, function(err, compra){
            if (err) {
                res.send(err);
            }
            res.json(compra);
        });
    })
    .put(function(req, res) {
        console.log('atualizar compra');
        controleOC.salvar({id: req.params.id}, function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ mensagem: 'atualizacao de compra realizada'});
        });
    })
    .delete(function(req, res){
        console.log('apagar compra');
        // controleOC.excluir
    });

router.post('/mock', function(req, res) {
    console.log('criar compra mock');

    controleOC.mockNovaCompra(null, function(err) {
        if (err) {
            res.send(err);
        }
        res.json({mensagem: 'criacao de compra mock realizada!'});
    });
});
module.exports = router;
