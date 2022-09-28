var http = require('http');
var express = require('express');
var app = express();
var httpport = 8080
var routes = require('./controller/controller')
var cors = require('cors')
const sqlite3 = require('sqlite3')
const axios = require('axios').default;

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public', {dotfiles: 'allow'}))

app.use('/styles', express.static('public'))
app.use('/images', express.static('public'))
app.use('/js', express.static('public'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded

app.use('/', routes)
app.use(cors())

http.createServer(app).listen(httpport, 'localhost', function() {
    console.log("server starting on " + httpport);
})


let dbname = new sqlite3.Database('WebService.db')
dbname.run("CREATE TABLE IF NOT EXISTS utilisateur (id INTEGER PRIMARY KEY AUTOINCREMENT, login TEXT NOT NULL, mdp TEXT NOT NULL, credit REAL, token TEXT NOT NULL)")



