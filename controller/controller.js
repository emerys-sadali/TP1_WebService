let express = require('express')
let app = express()

app.get('/', (req, res) => {
    res.render("meteo")
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

module.exports = app
