var http = require('http');
var express = require('express');
var app = express();
const cors= require('cors')
var httpport = 8080
var sqlite3= require('sqlite3')
var routes = require('./controller/controller')

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public', {dotfiles: 'allow'}))

app.use('/styles', express.static('public'))
app.use('/images', express.static('public'))
app.use('/js', express.static('public'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded
app.use(cors())
app.use('/', routes)

http.createServer(app).listen(httpport, 'localhost', function() {
    console.log("server starting on " + httpport);
})
let db_name=new sqlite3.Database('WebService.db')
db_name.run("CREATE TABLE IF NOT EXISTS utilisateur (id	INTEGER PRIMARY KEY AUTOINCREMENT, login TEXT NOT NULL, 'mdp' TEXT NOT NULL, 'credit' REAL, 'token'	TEXT NOT NULL)");


db_name.close();