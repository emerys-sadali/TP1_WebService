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
         
            axios.get('http://api.weatherstack.com/current?access_key=a72c5353b7830d1bdb2ab4a2226c60f2&query='+ ville, cb, {})
            .then(function (res) {
                cb(res.data)
            })
            .catch(function (error) {
                 cb(error.message)
            })

            
            }

        static getInfo3(ville, cb) {
         
                axios.get('https://api.weatherbit.io/v2.0/current?city='+ ville +'&country=fr&key=5c745d584bbc4003b16382ad72bb3d96', cb, {})
            .then(function (res) {
                cb(res.data)
            })
            .catch(function (error) {
                 cb(error.message)
            })

                
          }

}

module.exports = M_Source
