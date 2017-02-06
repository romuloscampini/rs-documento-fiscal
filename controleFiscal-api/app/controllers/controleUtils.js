var fs = require('fs');
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');

var controleUtils = {

    uploadFile: function(req, callback){
        upload(req, callback);
    },

    verificaAnexo: function(req, callback){
        checkAttachment(req, callback);
    }

};


function upload(req, callback){
    // create an incoming form object
    var form = new formidable.IncomingForm();
    var filename;
    var dados = {};

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/uploads');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
        console.log("Achou arquivo");
        console.log(file.name);
        fs.rename(file.path, path.join(form.uploadDir, file.name));
        filename = file.name;
    });

    form.on('fields', function(field, value) {
        dados = {
            field:  value
        };
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        res.send(filename);
    });

    // parse the incoming request containing the form data
    form.parse(req);
    callback(dados);
}

function checkAttachment(req, callback){

}

module.exports = controleUtils;
