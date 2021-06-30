
const countriesElement =  document.getElementById('countries');
const citiesElement = document.getElementById('cities');
const showWeatherElement = document.getElementById('showWeather');

const cleanCurrentWeatherInfo = ()=>{
    document.getElementById('weather-icons').innerHTML= '';
    document.getElementById('weather-icon').innerHTML = '';
    document.getElementById('weather-description').innerHTML = '';
    document.getElementById('temp').innerHTML = '';
    document.getElementById('temp-feels-like').innerHTML = '';
    document.getElementById('temp-max').innerHTML = '';
    document.getElementById('temp-min').innerHTML = '';
    document.getElementById('humidity').innerHTML = '';
    document.getElementById('weather-icon').setAttribute('src', '');
    document.getElementById('today-weather-title').innerHTML = '';
    document.getElementById('weather-forecast-title').innerHTML = '';
    document.getElementById('error-info').classList.remove('card');
}

const createCanvasElement = () =>{
    let canvasElement = document.createElement('canvas');
    canvasElement.setAttribute('id', 'myChart');
    document.getElementById('weather-forecast').appendChild(canvasElement);
}

(() => {
    let chosenCity = '';
    const apiKey = '541c440577df233591f68f4da09a2991';

    async function choseCity(){
        let data = await (fetch('/weather-app/json/country.json'));
        let countryList = await (data.json());

        countriesElement.addEventListener('click', ()=>{
            document.getElementById('error-info').innerHTML ='';
        });

        for (let country in countryList){
            let countryElement = document.createElement('option');
            countryElement.setAttribute('value', country);
            countryElement.innerHTML = country;
            countriesElement.appendChild(countryElement);

        };

        let chosenCountry = '';

        countriesElement.addEventListener('click', ()=>{
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
        createCanvasElement();
        document.getElementById('error-info').innerHTML = '';



        if (citiesElement.value == 'null'){
            document.getElementById('cities-info').innerHTML = "Please, chose the city";
        } else {
            document.getElementById('myChart').remove();
            document.getElementById('today-weather').classList.add('card');
            document.getElementById('weather-forecast').classList.add('card');
            cleanCurrentWeatherInfo();
            document.getElementById('cities-info').innerHTML = '';
            document.getElementById('today-weather-title').innerHTML = 'Now';
            document.getElementById('weather-forecast-title').innerHTML = 'Weather forecast for next days';
                chosenCity = citiesElement.value;
            getCurrentWeather(chosenCity);
            getWeatherForecast(chosenCity);
        }
    });
    };

    async function getCurrentWeather(city) {
        try {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
            const weather = await response.data.main;

            const weatherDescription = await response.data.weather[0];
            const weatherIconSrc = await `http://openweathermap.org/img/wn/${weatherDescription.icon}@2x.png`;

            document.getElementById('weather-icon').setAttribute('src',  weatherIconSrc);
            document.getElementById('weather-description').innerHTML =weatherDescription.description;


            document.getElementById('temp').innerHTML = `Now: ${(weather.temp).toFixed(1)}&#8451`;
            document.getElementById('temp-feels-like').innerHTML =`Feels like: ${(weather.feels_like).toFixed(1)}&#8451`;
            document.getElementById('temp-max').innerHTML = `Max: ${(weather.temp_max).toFixed(1)}&#8451`;
            document.getElementById('temp-min').innerHTML = `Min: ${(weather.temp_min).toFixed(1)}&#8451`;
            document.getElementById('humidity').innerHTML = `Humidity: ${(weather.humidity).toFixed(1)}%`;


        } catch (error) {
            cleanCurrentWeatherInfo();
            document.getElementById('today-weather').classList.remove('card');
            document.getElementById('weather-forecast').classList.remove('card');
            document.getElementById('error-info').innerHTML = 'Sorry, no data for this city';

        }
    };

    async function getWeatherForecast(city) {
        try {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);

            let weatherForecastData = await response.data.list;
            let daysLabels =[];
            let maxTemp = [];
            let weatherIcon = [];


            weatherForecastData.find((item)=>{
                if (item.dt_txt.includes("15:00:00")){
                    let day = item.dt_txt.substring(item.dt_txt.indexOf('-')+1 ,item.dt_txt.indexOf(' ')).split('-');
                    let date = day[1] + '/' + day[0];
                    weatherIcon.push(`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`);
                    daysLabels.push(date);
                    maxTemp.push((item.main.temp_max).toFixed(1));
                };
            });

            for (i=0; i<daysLabels.length; i++){
                let iconImg = document.createElement('img');
                iconImg.setAttribute('src', weatherIcon[i]);
                document.getElementById('weather-icons').appendChild(iconImg);
            };
            myWeatherChart(maxTemp, daysLabels, maxTemp[0]> 0 ? true : false);
        } catch (error) {
            cleanCurrentWeatherInfo();
            document.getElementById('today-weather').classList.remove('card');
            document.getElementById('weather-forecast').classList.remove('card');
            document.getElementById('error-info').innerHTML = 'Sorry, no data for this city';
            document.getElementById('error-info').classList.add('card');

        }
    };
    choseCity();
})();
