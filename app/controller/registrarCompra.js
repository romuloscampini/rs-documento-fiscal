var mongoose = require('mongoose');
var Compra = require('../model/Compra');


var registrador = {

    novaCompra: function(callback){
        Compra.create({
            nomeProduto: "TV",
            nomeLoja: "FastShop",
            nomeFornecedor: "ACER",
            dataCompra: new Date().toISOString().replace(/T/,' ').replace(/\..+/,''),
            valor: 100,
            tipo: "ELETRONICO",
            documentoPagamento: {
                nrDocumentoPagamento: "000000000000",
                tipo: "BOLETO",
                dataVencimento: new Date().toISOString().replace(/T/,' ').replace(/\..+/,''),
                valor: 110,
                desconto: 10
            }
        }, function (err){
            if(err) console.log('ocorreu um erro no momento de registrar os sorteio!');
            else{
                callback("Registro OK");
            }
        });
    }
};

module.exports = registrador;
