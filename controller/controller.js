let express = require('express')
let app = express()

app.get('/accueil', (req, res) => {
    res.render("meteo")
})

app.get('/', (req, res) => {
    res.render("connection")
})

app.get('/inscription', (req, res) => {
    res.render("inscription")
})

app.get('/source1', (req, res) => {
    let ville = req.query.ville
    let don = require('../models/données')
    don.getInfo1(ville, cb => {
        res.json(cb)
    })
})

app.get('/source2', (req, res) => {
    let ville = req.query.ville
    let don = require('../models/données')
    don.getInfo2(ville, cb => {
        res.json(cb)
    })
})

app.get('/source3', (req, res) => {
    let ville = req.query.ville
    let don = require('../models/données')
    don.getInfo3(ville, cb => {
        res.json(cb)
    })
})

app.post('/inscrire', (req,res) => {

    let user = req.query.user
    let mdp = req.query.mdp

    let don = require('../models/données')
    don.inscription(user, mdp)
    .then((result) => {

    })
    
})

app.post('/login', (req,res) => {

    let user = req.query.user
    let mdp = req.query.mdp
   
    let don = require('../models/données')
    don.connection(user, mdp, (cb) => {
        console.log(cb)
        for(row of cb) {
            if(row.login == user && row.mdp==mdp)
                return res.json({"msg": "ok", "token": row.token})
        } 
    })
    })



module.exports = app
