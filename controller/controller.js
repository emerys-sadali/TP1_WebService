let express = require('express')
let app = express()
const sqlite3 = require('sqlite3')
const fs = require("fs");
const { stringify } = require("csv-stringify");
let dbname = new sqlite3.Database('WebService.db')

app.get('/accueil', (req, res) => {
    if(req.session.token == undefined) {
        res.redirect('/')
    } else {
        res.render("meteo") 
    }
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

app.get('/apimeteo', (req, res) => {
    let total = 0
    let ville = req.query.ville
    let token = req.query.token
    let don = require('../models/données')
    don.getCredit(token, cb7 => {
        if (cb7[0].credit < 0.5){
            res.json('Token erroné ou crédit insuffisant')
        } else {
    don.updateCredit(token)
    don.getInfo1(ville, cb => {
    total = total + cb.current_condition.tmp
        don.getInfo2(ville, cb2 => {
        total = total + cb2.current.temperature
            don.getInfo3(ville, cb3 => {
               total = total + cb3.data[0].app_temp
               total = total / 3
               res.json({temperature: Math.round(total * 100) / 100})
        })
    })

    })
}
})
})

app.post('/inscrire', (req,res) => {

    let user = req.query.user
    let mdp = req.query.mdp

    let don = require('../models/données')
    don.inscription(user, mdp)
    .then((result) => {
        res.redirect('/')
    })
    
})

app.post('/login', (req,res) => {

    let user = req.query.user
    let mdp = req.query.mdp
   
    let don = require('../models/données')
    don.connection(user, mdp, (cb) => {
        
        for(row of cb) {
            if(row.login == user && row.mdp==mdp)
                req.session.userID = row.login
                req.session.userMDp = row.mdp
                req.session.token = row.token
                req.session.identifiant = row.id
                res.json({"msg": "ok", "token": row.token})
        } 
    })
    })

    app.get('/getCredit', (req, res) => {
       
        let don = require('../models/données')
        don.getCredit(req.session.token, cb => {
    
            res.json(cb)
        })
    })

    app.get('/getTransactions', (req, res) => {
        const filename = "Transactions/Transactions_"+req.session.userID+".csv";
        const writableStream = fs.createWriteStream(filename);
        const columns = [
        "id_t",
        "type",
        "date",
        "montant",
        "id_user",
        ];
        
        const stringifier = stringify({ header: true, columns: columns });
        dbname.each(`select * from Transactions where id_user="${req.session.identifiant}"`, (error, row) => {
        if (error) {
            return error.message;
        }
        stringifier.write(row);
        });
        stringifier.pipe(writableStream); 
        res.json("L'ensemble de vos transactions ont été exportées au format csv, disponibles dans le fichier Transactions/Transactions_"+ req.session.userID +" du projet \n\n\nPS: pensez à actualiser le projet sur VSCode s'il le fichier n'est pas visible immédiatement")  
    })        

    app.get('/getToken', (req, res) => {
       
        let don = require('../models/données')
        don.getToken(req.session.userID, cb => {
            res.json(cb)
        })
    })
    
    app.post('/subCredit', (req, res) => {
        let don = require('../models/données')
        don.updateCredit(req.session.token, req.session.identifiant)
        res.json("Soustraction effectuée")
    })

    app.post('/deconnexion', (req,res) => {

        req.session.userID = undefined
        req.session.userMDp = undefined
        req.session.token = undefined
        req.session.identifiant = undefined
        res.redirect("/")
    })

    app.post('/addCredit', (req, res) => {
        let don = require('../models/données')
        don.addCredit(req.session.token, req.query.nombre, req.session.identifiant)
        res.json("Ajout effectué")
    }) 

    
        
module.exports = app