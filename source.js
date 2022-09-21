

async function getDon1() {
let ville = document.getElementById('ville').value;
let temp1= new Date().getTime();
return fetch('http://api.weatherstack.com/current?access_key=a72c5353b7830d1bdb2ab4a2226c60f2&query=' + ville)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    document.getElementById("aff1").innerHTML = "";
    document.getElementById('aff1').append('La météo à '+ ville+' est de '+ value.current.temperature+ ' degrès Celcius d\'après Weatherstack')
    console.log(new Date().getTime()-temp1);
    return value.current.temperature;
  })
  .catch(function(err) {
    throw err
  })

}

async function getDon2() {
  let ville = document.getElementById('ville').value;
  let temp1= new Date().getTime();
  return fetch('https://www.prevision-meteo.ch/services/json/'+ville)
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      document.getElementById("aff2").innerHTML = ""
      document.getElementById('aff2').append('\nLa météo à '+ ville+' est de '+ value.current_condition.tmp + ' degrès Celcius d\'après Prevision-meteo')
      console.log(new Date().getTime()-temp1);
      return value.current_condition.tmp;
    })
    .catch(function(err) {
      throw err
    })
  
  }

   async function getDon3() {
    let ville = document.getElementById('ville').value;
    let temp1= new Date().getTime();

    return fetch('https://api.weatherbit.io/v2.0/current?city='+ville+'&country=fr&key=5c745d584bbc4003b16382ad72bb3d96')
      .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function(value) {
        document.getElementById("aff3").innerHTML = "";
        document.getElementById('aff3').append('\nLa météo à '+ ville+' est de '+ value.data[0].temp + ' degrès Celcius d\'après Weatherbit');
        console.log(new Date().getTime()-temp1);
        return value.data[0].temp;
      })
      .catch(function(err) {
        throw err;
      })
    
    }

    async function getDon(){
        let total = 0;
        
        document.getElementById("aff").innerHTML = "";
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
