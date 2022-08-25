    function addressSearch () {
        let cep = document.querySelector('#cep').value;
        let url = `https://viacep.com.br/ws/${cep}/json/ `;

        if (cep.length !== 8) {
            alert(`O cep ${cep} é invalido. Digite apenas números e não utilize "-".`);
            document.querySelector('#cep').value = '';
            return;       
        } 

        fetch(url)
            .then((response)=>{
                return response.json()})
                    .then((data) => {displayResults(data)});
    
    }

    function displayResults(objData) {
        let dataResults = document.querySelector('#dataResults');
              
        if (objData.erro) {
            dataResults.innerHTML = `Não foi possível localizar o endereço. Por favor, tente um novo CEP.`;            
        } else {
            dataResults.innerHTML = `<h2>Onde Estou</h2><p>Endereço: ${objData.logradouro}</p><p>Complemento: ${objData.complemento}</p><p>Bairro: ${objData.bairro}</p><p>Cidade/UF: ${objData.localidade} / ${objData.uf}</p>`
            dataClimate(objData.localidade);
        }
    }

    function dataClimate (locate) {
        let dataClimaResults = document.querySelector('#dataClimateResults');

        let urlClimate = `https://api.hgbrasil.com/weather?format=json-cors&key=aff4f98c&city_name=${locate},SP`

        fetch(urlClimate)
               .then((response)=>{
                   return response.json()})
                      .then((dataClimateJson) => { 

                        dataClimaResults.innerHTML = `<h2>Como está o clima agora em ${dataClimateJson.results.city_name}</h2><p>Data: ${dataClimateJson.results.date}</p><p>Hora: ${dataClimateJson.results.time}</p><p>Clima: ${dataClimateJson.results.description}</p><p>Temperatura: ${dataClimateJson.results.temp}°C</p><p>Velocidade do Vento: ${dataClimateJson.results.wind_speedy}</p>`;               
                        });        
    }
    
    function cleanFields () {
        let dataClimaResults = document.querySelector('#dataClimateResults');
        cep.value = "";
        dataResults.innerHTML = ""; 
        dataClimaResults.innerHTML = "";
        dataResults.innerHTML = "";
    }

