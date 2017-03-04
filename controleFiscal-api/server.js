var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var routerCompra = require('./app/routes/CompraRouter');
var formidable = require('formidable');

// configuração do banco
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
mongoose.set('debug', true);

// configurações da aplicação
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.raw());
app.use(bodyParser.text());


//Liberar Cross-origin por causa do ajax no react
app.use(function (req, res, next) {
    // qualquer site pode conectar
    res.setHeader('Access-Control-Allow-Origin', '*');

    // somente estes métodos podem ser usados
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

    // só aceita estes headers
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-access-token');

    next();
});

app.use('/compras', routerCompra);


var porta = process.env.PORT || 3005;
app.listen(porta);
console.log('Servidor está em pé e escutando a porta: ' + porta);

