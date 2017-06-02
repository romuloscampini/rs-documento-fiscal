var DB_HOST = process.env.DB_HOST || 'localhost';
var DB_PORT = process.env.DB_PORT || 27017;
var DB_NAME = process.env.DB_NAME || 'local';

var URL = 'mongodb://' + DB_HOST + ':' + DB_PORT + '/' + DB_NAME;

module.exports = {
    'url' : URL
}
