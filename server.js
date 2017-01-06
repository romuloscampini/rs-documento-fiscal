var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');

var app = express();


//dep interna
var registrador = require('./app/controller/registrarCompra');

// configuração do banco
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

// configurações da aplicação
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/comprar', function(req,res) {
    registrador.novaCompra(function(compra){
        res.send(compra);
    });
});


var porta = process.env.PORT || 3005;
app.listen(porta);
console.log('Servidor está em pé e escutando a porta: ' + porta);

