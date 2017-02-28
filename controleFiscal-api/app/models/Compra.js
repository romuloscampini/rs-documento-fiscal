var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schemaCompra = new Schema({
    nomeProduto: String,
    nomeLoja: String,
    nomeFornecedor: String,
    dataCompra: Date,
    valor:  Number,
    tipo: String,
    categoria: String,
    documentosPagamento: [{
        nrDocumentoPagamento: String,
        tipo: String,
        dataVencimento: Date,
        valor: Number,
        desconto: Number,
        documento: {
            data: Buffer,
            contentType: String
        }
    }],
    comprovantes: [{
        dataPagamento: Date,
        valorPago: Number,
        contaDebito: String,
        documento: {
            data: Buffer,
            contentType: String
        }
    }],
    documentoFiscal: [{
        dataRecebimento: Date,
        obs: String,
        documento: {
            data: Buffer,
            contentType: String
        }
    }],
    registroFiscal: [{
        tipo: String,
        documento: {
            data: Buffer,
            contentType: String
        }
    }]
});

module.exports = mongoose.model('Compra', schemaCompra);
