async function getDon1() {

let ville = document.getElementById('ville').value

return await axios.get('http://localhost:8080/source1?ville='+ville, {})
  .then(function (res) {
    document.getElementById("aff1").innerHTML = ""
    document.getElementById('aff1').append('La météo à '+ ville+' est de '+ res.data.current_condition.tmp + ' degrès Celcius d\'après prevision-meteo.ch')
    return res.data.current_condition.tmp
  })
  .catch(function(err) {
    throw err
  })
}


async function getDon2() {
  let ville = document.getElementById('ville').value

return await axios.get('http://localhost:8080/source2?ville='+ville, {})
  .then((res) => {
    document.getElementById("aff2").innerHTML = ""
    document.getElementById('aff2').append('La météo à '+ ville +' est de '+ res.data.current.temperature + ' degrès Celcius d\'après Weatherstack')
    return res.data.current.temperature})
  .catch((err) => {
    throw err
  })
}

async function getDon3() {
  let ville = document.getElementById('ville').value

return await axios.get('http://localhost:8080/source3?ville='+ville, {})
  .then((res) => {
    document.getElementById("aff3").innerHTML = ""
    document.getElementById('aff3').append('La météo à '+ ville +' est de '+ res.data.data[0].app_temp + ' degrès Celcius d\'après Weatherstack')
    return res.data.data[0].app_temp
  })
  .catch((err) => {
    throw err
  })
}
    
   
    async function getDon(){
 
      let total = 0
      
      document.getElementById("aff").innerHTML = ""
      await getDon1().then((res) => {
        total = total + res
      })
      await getDon2().then((res) => {
        total = total + res
      })
      await getDon3().then((res) => {
        total = total + res
      })

      total = total / 3
      document.getElementById('aff').append('La température moyenne à '+ document.getElementById('ville').value +' est de '+ Math.round(total * 100) / 100 + ' degrès Celcius')

  }