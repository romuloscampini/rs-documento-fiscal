var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schemaCompra = new Schema({
    id: Number,
    nomeProduto: String,
    nomeLoja: String,
    nomeFornecedor: String,
    dataCompra: Date,
    valor:  Number,
    tipo: String,
    categoria: String,
    // documentos: {
        documentosPagamento: [{
            nrDocumentoPagamento: String,
            tipo: String,
            dataVencimento: Date,
            valor: Number,
            desconto: Number,
            documento: {
                id: Number,
                data: Buffer,
                contentType: String
            }
        }],
        comprovantes: [{
            dataPagamento: Date,
            valorPago: Number,
            contaDebito: String,
            documento: {
                id: Number,
                data: Buffer,
                contentType: String
            }
        }],
        documentoFiscal: [{
            dataRecebimento: Date,
            obs: String,
            documento: {
                id: Number,
                data: Buffer,
                contentType: String
            }
        }],
        registroFiscal: [{
            tipo: String,
            documento: {
                id: Number,
                data: Buffer,
                contentType: String
            }
        }]
    // }
});

module.exports = mongoose.model('Compra', schemaCompra);
