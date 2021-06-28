const axios = require('axios');
const countriesElement =  document.getElementById('countries');
const citiesElement = document.getElementById('cities');
const showWeatherElement = document.getElementById('showWeather');

(() => {
     async function choseCity(){
        let data = await (fetch('http://localhost:63342/weather-app/json/country.json'));
        let countryList = await (data.json());

                for (let country in countryList){
                    let countryElement = document.createElement('option');
                    countryElement.setAttribute('value', country);
                    countryElement.innerHTML = country;
                    countriesElement.appendChild(countryElement);

                };
                let chosenCountry = '';
                citiesElement.addEventListener('click', ()=>{
                    chosenCountry = countriesElement.value;

                    if (chosenCountry == 'null'){
                        document.getElementById('countries-info').innerHTML = 'Please, chose the country';
                    } else {
                        for (let city of countryList[chosenCountry]){
                            document.getElementById('countries-info').innerHTML = '';
                                let cityElement = document.createElement('option');
                             cityElement.setAttribute('value', city);
                             cityElement.innerHTML = city;
                             citiesElement.appendChild(cityElement);
                        }
                    }
                });
                showWeatherElement.addEventListener('click', ()=>{

                    if (citiesElement.value == 'null'){
                        document.getElementById('cities-info').innerHTML = "Please, chose the city";
                    } else {
                        document.getElementById('cities-info').innerHTML = '';
                        let chosenCity = citiesElement.value;
                       console.log(chosenCity);
                       return chosenCity;
                    }
                });
    };

    choseCity();


})();
