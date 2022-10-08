

getCredit()
getToken()

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
    document.getElementById('aff3').append('La météo à '+ ville +' est de '+ res.data.data[0].app_temp + ' degrès Celcius d\'après Weatherbit')
    return res.data.data[0].app_temp
  })
  .catch((err) => {
    throw err
  })
}
   
    async function getDon(){
      let ville = document.getElementById('ville').value
      if(ville == ""){
        document.getElementById('aff').innerHTML = 'Saisissez une ville !'
        document.getElementById('aff2').innerHTML = ''
        document.getElementById('aff3').innerHTML = ''
      } else {
      let credit = await getCredit()
      if(credit<0.5 ){
        document.getElementById('aff').innerHTML = 'Crédit insuffisant !'
        document.getElementById('aff1').innerHTML = ''
        document.getElementById('aff2').innerHTML = ''
        document.getElementById('aff3').innerHTML = ''
        
      } else {

      await subCredit()
      await getCredit().then(res => {
        document.getElementById('credit').innerHTML = 'Votre crédit est de '+res +' €'
      })

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
      document.getElementById('aff').innerHTML = 'La température moyenne à '+ document.getElementById('ville').value +' est de '+ Math.round(total * 100) / 100 + ' degrès Celcius'
    }
  }
  }

  async function inscription(){
   
    let user = document.getElementById('iuser').value
    let mdp = document.getElementById('imdp').value
    
   await axios.post('http://localhost:8080/inscrire?user='+ user +'&mdp='+ mdp, {})
    .then( (res) => {
      document.location.href = ("/")
      return res  })
    .catch((err) => {
      throw err
    })


  }

  async function connection(){
    getToken()
    let user = document.getElementById('user').value
    let mdp = document.getElementById('mdp').value
    
   await axios.post('http://localhost:8080/login?user='+ user +'&mdp='+ mdp, {})
    .then( (res) => {
      if (res.data.msg == 'ok'){
        document.location.href = ("/accueil")
      }
    })
    .catch((err) => {
      throw err
    })

  }

    async function getCredit(){
      
    return await axios.get('http://localhost:8080/getCredit', {})
      .then( (res) => {
        document.getElementById('credit').innerHTML = 'Votre crédit est de '+ res.data[0].credit+' €'
        return res.data[0].credit
      })
      .catch((err) => {
        throw err
      })
    }

      async function getToken(){
      
        return await axios.get('http://localhost:8080/getToken', {})
          .then( (res) => {
            document.getElementById('token').innerHTML = 'Votre token est : '+ res.data[0].token
            return res.data[0].token
          })
          .catch((err) => {
            throw err
          })


      }
      async function getTransactions() {
         
        return await axios.get('http://localhost:8080/getTransactions', {})
        .then( (res) => {
          alert(res.data)
          return res.data;
        })
        .catch((err) => {
          throw err
        })
      }
  async function subCredit(){
  await axios.post('http://localhost:8080/subCredit', {})
  }

  async function deconnexion(){
    await axios.post('http://localhost:8080/deconnexion',{})
    .then((res)=>{
      document.location.href = ("/")
    })
  }

  async function addCredit(){
    let nombre = document.getElementById('rech').value
    await axios.post('http://localhost:8080/addCredit?nombre='+nombre,{})
    .then((res)=>{
      document.location.href = ("/accueil")
    })
   
  }