

const countriesElement =  document.getElementById('countries');
const citiesElement = document.getElementById('cities');
const showWeatherElement = document.getElementById('showWeather');

(() => {
    let chosenCity = '';
    const apiKey = '541c440577df233591f68f4da09a2991';
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

                    countriesElement.addEventListener('click', ()=>{
                        document.getElementById('error-info').innerHTML ='';
                        chosenCountry = countriesElement.value;
                        let chosenCitiesList = countryList[chosenCountry];


                        if (chosenCountry == 'null'){
                            document.getElementById('countries-info').innerHTML = 'Please, chose the country';
                        } else {
                            citiesElement.innerHTML = '';
                            for (let city of chosenCitiesList){

                                document.getElementById('countries-info').innerHTML = '';
                                let cityElement = document.createElement('option');
                                 cityElement.setAttribute('value', city);
                                 cityElement.innerHTML = city
                                 citiesElement.appendChild(cityElement);
                            }
                        }
                    });
                showWeatherElement.addEventListener('click', ()=>{

                    if (citiesElement.value == 'null'){
                        document.getElementById('cities-info').innerHTML = "Please, chose the city";
                    } else {
                        document.getElementById('cities-info').innerHTML = '';
                        chosenCity = citiesElement.value;
                        console.log(chosenCity);
                        getWeather(chosenCity);

                       return chosenCity;
                    }
                });
    };

    async function getWeather(city) {
        try {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
            const weather = await response.data.main;


            document.getElementById('temp').innerHTML = `Now: ${(weather.temp).toFixed(1)}&#8451`;
            document.getElementById('temp-feels-like').innerHTML =`Feels like: ${(weather.feels_like).toFixed(1)}&#8451`;
            document.getElementById('temp-max').innerHTML = `Max: ${(weather.temp_max).toFixed(1)}&#8451`;
            document.getElementById('temp-min').innerHTML = `Min: ${(weather.temp_min).toFixed(1)}&#8451`;
            document.getElementById('humidity').innerHTML = `Humidity: ${(weather.humidity).toFixed(1)}%`;



            console.log(weather);
        } catch (error) {
            document.getElementById('error-info').innerHTML = 'Sorry, no data for this city'
            console.error(error);
        }
    };

    choseCity();

})();
