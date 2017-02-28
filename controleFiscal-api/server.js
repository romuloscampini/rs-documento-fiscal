var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var routerCompra = require('./app/routes/rotaCompra');
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

app.post('/upload', function (req, res) {

    var form = new formidable.IncomingForm();

    form.on('field', function(name, value) {
        console.log("Nome do campo: " + name);
        console.log("Valor: " + value);
    });

    form.parse(req, function(err, fields, files){
        if(err){
            console.log("Error");
        }

        if(fields){
            console.log("achou campos");
        }

        if(files){
            console.log("achou arq");
        }
    });

    // console.log(maoe);
    res.send("Post ok");
});


var porta = process.env.PORT || 3005;
app.listen(porta);
console.log('Servidor está em pé e escutando a porta: ' + porta);

