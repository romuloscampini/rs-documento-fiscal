var mongoose = require('mongoose');
var Compra = require('./Compra');
var fs = require('fs');

var pdfPath = '/tmp/boleto.pdf';

var controleOC = {

    salvar: function(dadosCompra, callback){
        if(dadosCompra.id){
            Compra.findById(dadosCompra.id, function(err, compra){
                compra.nomeProduto  =  dadosCompra.nomeProduto;
                compra.nomeLoja     = dadosCompra.nomeLoja;
                nomeFornecedor      =  dadosCompra.nomeFornecedor;
                compra.dataCompra   = dadosCompra.dataCompra;
                compra.valor        =  dadosCompra.valor;
                compra.tipo         = dadosCompra.tipo;
                compra.categoria    = dadosCompra.categoria;

                //Já existe e só faz update
                save(compra, callback);
            });
        }else {
            //Cria um novo
            var compra = new Compra();
            console.log(dadosCompra);

            compra.nomeProduto          =  dadosCompra.nomeProduto;
            compra.nomeLoja             = dadosCompra.nomeLoja;
            nomeFornecedor              =  dadosCompra.nomeFornecedor;
            compra.dataCompra           = dadosCompra.dataCompra;
            compra.valor                =  dadosCompra.valor;
            compra.tipo                 = dadosCompra.tipo;
            compra.categoria            = dadosCompra.categoria;
            compra.documentosPagamento  = dadosCompra.documentosPagamento;
            compra.comprovantes         = dadosCompra.comprovantes;
            compra.documentoFiscal      = dadosCompra.documentoFiscal;
            compra.registroFiscal       = dadosCompra.registroFiscal;

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
    compra.save(function(err) {
        if(err){
            console.log("Ocorreu um erro");
            throw err;
        } else{
            callback();
        }
    })

}

module.exports = controleOC;
