const axios = require('axios').default;

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

}

module.exports = M_Source
