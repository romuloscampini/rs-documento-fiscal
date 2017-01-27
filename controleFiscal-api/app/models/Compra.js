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
        docPagamento: {
            data: Buffer,
            contentType: String
        }
    }],
    comprovantes: [{
        dataPagamento: Date,
        valorPago: Number,
        contaDebito: String,
        docComprovante: {
            data: Buffer,
            contentType: String
        }
    }],
    documentoFiscal: [{
        dataRecebimento: Date,
        obs: String,
        docFiscal: {
            data: Buffer,
            contentType: String
        }
    }],
    registroFiscal: [{
        tipo: String,
        docRegFiscal: {
            data: Buffer,
            contentType: String
        }
    }]
});

module.exports = mongoose.model('Compra', schemaCompra);
