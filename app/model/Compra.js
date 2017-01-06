var mongoose = require('mongoose');

var schemaCompra = mongoose.Schema({
    nomeProduto: String,
    nomeLoja: String,
    nomeFornecedor: String,
    dataCompra: Date,
    valor:  Number,
    tipo: String,
    documentoPagamento: {
        nrDocumentoPagamento: String,
        tipo: String,
        dataVencimento: Date,
        valor: Number,
        desconto: Number
        // docPag: Binary
    },
    comprovante: {
        dataPagamento: Date,
        valorPago: Number,
        contaDebito: String
        // docComprovante: Binary
    },
    documentoFiscal: {
        dataRecebimento: Date,
        obs: String
        // docFiscal: Binary
    },
    registroFiscal: {
        tipo: String
        // docRegFiscal: Binary
    }
});

module.exports = mongoose.model('Compra', schemaCompra);
