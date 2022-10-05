const axios = require('axios').default;
const sqlite3 = require('sqlite3')
var jwt = require('jsonwebtoken');
let dbname = new sqlite3.Database('WebService.db')

class M_Source {

static getInfo1(ville, cb) {

    axios.get('https://www.prevision-meteo.ch/services/json/'+ ville, cb, {})
      .then(function (res) {
        cb(res.data)
      })
      .catch(function (error) {
        cb(error.message)
      })        
    }

  static getInfo2(ville, cb) {
         
            axios.get('http://api.weatherstack.com/current?access_key=b740540da775cb6b705327d3bba62b5b&query='+ ville, cb, {})
            .then(function (res) {
                cb(res.data)
        })
          .catch(function (error) {
                 cb(error.message)
            })

            
            }

        static getInfo3(ville, cb) {
        
                axios.get('https://api.weatherbit.io/v2.0/current?city='+ ville +'&country=fr&key=7b4f81e6011c4efa8fd6903d52c7a88e', cb, {})
            .then(function (res) {
                cb(res.data)
            })
            .catch(function (error) {
                 cb(error.message)
            })

                
          }

          static async inscription(userID, userMDP) {
            try {
              var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
              dbname.run("CREATE TABLE IF NOT EXISTS utilisateur (id INTEGER PRIMARY KEY AUTOINCREMENT, login TEXT NOT NULL, mdp TEXT NOT NULL, credit REAL, token TEXT NOT NULL)")
              dbname.run(`insert into utilisateur (login, mdp, credit, token) values ("${userID}", "${userMDP}", 10, "${token}")`)
            } catch (err) {
                throw (err.message)
            }
          }
          
          static async connection(userID, userMDP, cb) {

            try{
              dbname.run("CREATE TABLE IF NOT EXISTS utilisateur (id INTEGER PRIMARY KEY AUTOINCREMENT, login TEXT NOT NULL, mdp TEXT NOT NULL, credit REAL, token TEXT NOT NULL)")
              dbname.all(`select login,mdp, token from utilisateur where login="${userID}" and mdp="${userMDP}"`, (err, rows) => {
                  cb(rows)
              })	
             
            } catch (err) {
              throw (err.message)
            }
          }

          static async getCredit(token, cb){

            try{
              dbname.run("CREATE TABLE IF NOT EXISTS utilisateur (id INTEGER PRIMARY KEY AUTOINCREMENT, login TEXT NOT NULL, mdp TEXT NOT NULL, credit REAL, token TEXT NOT NULL)")
              dbname.all(`select credit from utilisateur where token="${token}"`, (err, rows) => {
                  cb(rows)
              })	
             
            } catch (err) {
              throw (err.message)
            }
          }


          static async updateCredit(token){

            try{
              dbname.run("CREATE TABLE IF NOT EXISTS utilisateur (id INTEGER PRIMARY KEY AUTOINCREMENT, login TEXT NOT NULL, mdp TEXT NOT NULL, credit REAL, token TEXT NOT NULL)")
              dbname.all(`update utilisateur set credit=credit-0.5 where token="${token}" `, (err, rows) => {})	
             
            } catch (err) {
              throw (err.message)
            }
          }

          static async addCredit(token, nombre){

            try{
              dbname.run("CREATE TABLE IF NOT EXISTS utilisateur (id INTEGER PRIMARY KEY AUTOINCREMENT, login TEXT NOT NULL, mdp TEXT NOT NULL, credit REAL, token TEXT NOT NULL)")
              dbname.all(`update utilisateur set credit=credit+"${nombre}" where token="${token}" `, (err, rows) => {})	
            } catch (err) {
              throw (err.message)
            }
          }

          static async getToken(user, cb){

            try{
              dbname.run("CREATE TABLE IF NOT EXISTS utilisateur (id INTEGER PRIMARY KEY AUTOINCREMENT, login TEXT NOT NULL, mdp TEXT NOT NULL, credit REAL, token TEXT NOT NULL)")
              dbname.all(`select token from utilisateur where login="${user}"`, (err, rows) => {
                  cb(rows)
              })	
             
            } catch (err) {
              throw (err.message)
            }
          }

}

module.exports = M_Source
