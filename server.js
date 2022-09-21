var http = require('http');
var express = require('express');
var app = express();
var httpport = 8080
var routes = require('./controller/controller')
const axios = require('axios').default;

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public', {dotfiles: 'allow'}))

app.use('/styles', express.static('public'))
app.use('/images', express.static('public'))
app.use('/js', express.static('public'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded

app.use('/', routes)

http.createServer(app).listen(httpport, 'localhost', function() {
    console.log("server starting on " + httpport);
})



