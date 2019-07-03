var crypto = require ('./node_modules/crypto');
var uuid =  require ('./node_modules/require');
var express = require ('./node_modules/express');
var mysql = require ('./node_modules/mysql');
var bodyParser = require ('./node_modules/body-parser');

//connect to mysql

var con = mysql.createConnection({
localhost : 'localhost',
user : 'root',
password: 'root',
database : 'DemoNodeJS'

});

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.listen(3000,() => {
console.log('RESTFull running on port 3000');
})
