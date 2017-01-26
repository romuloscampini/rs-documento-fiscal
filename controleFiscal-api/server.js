var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var routerCompra = require('./app/routes/rotaCompra');

// configuração do banco
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
mongoose.set('debug', true);

// configurações da aplicação
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/compras', routerCompra);
// app.get('/comprar', function(req,res) {
//     controleOC.mockNovaCompra(null, function(compra){
//         res.send(compra);
//     });
// });


var porta = process.env.PORT || 3005;
app.listen(porta);
console.log('Servidor está em pé e escutando a porta: ' + porta);

