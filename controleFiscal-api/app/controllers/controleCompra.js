var mongoose = require('mongoose');
var Compra = require('../models/Compra');
var fs = require('fs');

var pdfPath = '/tmp/boleto.pdf';

var controleOC = {


    mockNovaCompra: function(dados, callback){

        // var a = new A;
        // a.img.data = fs.readFileSync(imgPath);
        // a.img.contentType = 'image/png';

        Compra.create({
            nomeProduto: "TV",
            nomeLoja: "Balao da Info",
            nomeFornecedor: "ACER",
            dataCompra: new Date().toISOString().replace(/T/,' ').replace(/\..+/,''),
            valor: 500,
            tipo: "ELETRONICO",
            documentoPagamento: {
                nrDocumentoPagamento: "000000000000",
                tipo: "BOLETO",
                dataVencimento: new Date().toISOString().replace(/T/,' ').replace(/\..+/,''),
                valor: 600,
                desconto: 100,
                docPagamento: {
                    data: fs.readFileSync(pdfPath),
                    contentType: "application/pdf"
                }
            }
        }, function (err){
            if(err){
                console.log('ocorreu um erro ao gravar o mock');
                throw err;
            }
            else{
                callback();
            }
        });
    },

    salvar: function(dados, callback){
        Compra.create(dados, function(err) {
            if(err){
                console.log("Ocorreu um erro");
                throw err;
            } else{
                callback();
            }
        })
    },

    listar: function (callback) {
        var query = {};
        Compra.find(query, function(err, compras){
            if(err){
                console.log("Nao foi possivel listar os dados");
                throw err;
            }else {
                callback(compras);
            }
        });
    },

    buscar: function (busca, callback) {
        var query = {
            $or:[
                {
                    nomeProduto: {$regex: busca, $options: 'i'}
                },
                {
                    nomeLoja: {$regex: busca, $options: 'i'}
                },
                {
                    nomeFornecedor: {$regex: busca, $options: 'i'}
                },
                {
                    tipo: {$regex: busca, $options: 'i'}
                }
            ]
        };

        Compra.find(query, function(err, compras){
        if(err){
            console.log("Nao foi possivel buscar");
            throw err;
        }else {
            callback(compras);
        }
        });
    }
};

module.exports = controleOC;
