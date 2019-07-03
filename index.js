var uuid =  require ('./node_modules/uuid');
var express = require ('./node_modules/express');
var mysql = require ('./node_modules/mysql');
var bodyParser = require ('./node_modules/body-parser');

//connect to mysql

var con = mysql.createConnection({
localhost : 'localhost',
user : 'root',
password: 'root',
database : 'demonodejs'

});
//-----
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//METODO POST PARA OBTENER DATOS Y GUARDARLOS EN LA BASE DE DATOS -------------

app.post('/register/', (req, res, next) => {
    var post_data = req.body;
    var uid = uuid.v4();
    var plaint_password = post_data.password;
    var name = post_data.name;
    var email = post_data.email;

    con.query('SELECT * FROM user where email=?',[email],function(err,result,fields){
        con.on('error', function(err){
            console.log('[MYSQL error]', err);
        });
        
    if(result && result.length)
    res.json('user already exists!!!');
    else{
        con.query('INSERT INTO `user`(`unique_id`, `name`, `email`, `encrypted_password`, `salt`, `created_at`, `updated_at`) VALUES (?,?,?,?,NOW(),NOW())', [uid, name, email, plaint_password]), function(err,result,fields){
            con.on('error', function(err){
                console.log('[MYSQL error]', err);
                res.json('register error:', err)
            });
            res.json('register succesfull');
        };
    }
        
    });

})

//-----------------------------------------------------------------

app.listen(3000,() => {
console.log('RESTFull running on port 3000');
})
