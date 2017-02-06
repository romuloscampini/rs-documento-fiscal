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

app.use('/compras', routerCompra);

app.post('/', function (req, res) {
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
})
// app.get('/comprar', function(req,res) {
//     controleOC.mockNovaCompra(null, function(compra){
//         res.send(compra);
//     });
// });


var porta = process.env.PORT || 3005;
app.listen(porta);
console.log('Servidor está em pé e escutando a porta: ' + porta);

