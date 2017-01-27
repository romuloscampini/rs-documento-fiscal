var mongoose = require('mongoose');
var Compra = require('../models/Compra');
var fs = require('fs');

var pdfPath = '/tmp/boleto.pdf';

var controleOC = {

    salvar: function(dados, callback){
        if(dados.id){
            //Já existe e só faz update
            save(dados, callback);
        }else {
            //Cria um novo
            var compra = new Compra();
            compra.nomeProduto  =  dados.nomeProduto;
            compra.nomeLoja     = dados.nomeLoja;
            nomeFornecedor      =  dados.nomeFornecedor;
            compra.dataCompra   = dados.dataCompra;
            compra.valor        =  dados.valor;
            compra.tipo         = dados.tipo;
            compra.categoria    = dados.categoria;
            compra.documentosPagamento = [{
                nrDocumentoPagamento: dados.documentoPagamento.nrDocumentoPagamento,
                tipo: dados.documentoPagamento.tipo,
                dataVencimento: dados.documentoPagamento.dataVencimento,
                valor: dados.documentoPagamento.valor,
                desconto: dados.documentoPagamento.desconto,
                docPagamento: {
                    data: dados.documentoPagamento.docPagamento.data,
                    contentType: dados.documentoPagamento.docPagamento.contentType
                }
            }];
            compra.comprovante = [{
                dataPagamento: dados.comprovante.dataPagamento,
                valorPago: dados.comprovante.valorPago,
                contaDebito: dados.comprovante.contaDebito,
                docComprovante: {
                    data: dados.comprovante.docComprovante.data,
                    contentType: dados.comprovante.docComprovante.contentType
                }
            }];
            compra.documentoFiscal = [{
                dataRecebimento: dados.documentoFiscal.dataRecebimento,
                obs: dados.documentoFiscal.obs,
                docFiscal: {
                    data: dados.documentoFiscal.docFiscal.data,
                    contentType: dados.documentoFiscal.docFiscal.contentType
                }
            }];
            compra.registroFiscal = [{
                tipo: dados.registroFiscal.tipo,
                docRegFiscal: {
                    data: dados.registroFiscal.docFiscal.data,
                    contentType: dados.registroFiscal.docFiscal.contentType
                }
            }];
            save(compra, callback);
        }
    },

    listar: function(callback) {
        var filtro = {};
        find(filtro, callback);
    },

    buscar: function(busca, callback) {
        var filtro = {
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
        find(filtro, callback);
    },

    buscarPorId: function(id, callback) {
        console.log(id);
        findById(id, callback);
    },

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
            documentosPagamento: [{
                nrDocumentoPagamento: "000000000000",
                tipo: "BOLETO",
                dataVencimento: new Date().toISOString().replace(/T/,' ').replace(/\..+/,''),
                valor: 600,
                desconto: 100,
                docPagamento: {
                    data: fs.readFileSync(pdfPath),
                    contentType: "application/pdf"
                }
            }]
        }, function (err){
            if(err){
                console.log('ocorreu um erro ao gravar o mock');
                throw err;
            }
            else{
                callback();
            }
        });
    }
};


function find(filtro, callback){
    Compra.find(filtro, function(err, compras){
        if(err){
            console.log("Nao foi possivel buscar");
            throw err;
        }else {
            callback(compras);
        }
    });
};

function findById(id, callback){
    Compra.findById(id, function(err, compra){
        if(err){
            console.log("Nao foi possivel buscar");
            throw err;
        }else {
            callback(compra);
        }
    });
};

function save(compra, callback){
    Compra.save(compra, function(err) {
        if(err){
            console.log("Ocorreu um erro");
            throw err;
        } else{
            callback();
        }
    })

}

module.exports = controleOC;
