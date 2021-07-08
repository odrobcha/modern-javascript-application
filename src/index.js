import _ from 'lodash';

import "../src/styles/styles.scss";

const axios = require('axios');

import {addCardClass} from "./scripts/modules/addCardClass.js";
import {removeCardClass} from "./scripts/modules/removeCardClass.js";
import {apiKey} from './scripts/modules/var.js'
import {setInnerHTML} from './scripts/modules/setInnerHTML.js';
import {createSelectList} from './scripts/modules/createSelectList.js';
import {cleanCurrentWeatherInfo} from "./scripts/modules/cleanCurrentWeatherInfo.js";
import {createCanvasElement} from './scripts/modules/createCanvasElement.js';
import {createCitiesList} from "./scripts/modules/createCitiesList.js";
import {builtWeatherChart} from './scripts/modules/builtWeatherChart';

(() => {
    const countriesElement =  document.getElementById('countries');
    const citiesElement = document.getElementById('cities');
    const showWeatherElement = document.getElementById('showWeather');
    let chosenCity = '';

    const displayWeather = () =>{
        createCanvasElement();
        setInnerHTML('error-info', '');
        removeCardClass('error-info');
        removeCardClass('cities-info');

        if (citiesElement.value === 'null'){
            setInnerHTML('cities-info', 'Please, chose the city');
            addCardClass('cities-info');
            return;
        } ;

        cleanCurrentWeatherInfo();
        document.getElementById('weatherChart').remove();
        chosenCity = citiesElement.value;
        getCurrentWeather(chosenCity);
        getWeatherForecast(chosenCity);

        addCardClass('weather-forecast');
        addCardClass('today-weather');
        setInnerHTML('cities-info', '');
        setInnerHTML('today-weather-title', 'Now');
        setInnerHTML('weather-forecast-title', 'Weather forecast');
    }

    async function getCurrentWeather(city) {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);

            const weather = await response.data.main;
            const weatherDescription = await response.data.weather[0];
            const weatherIconSrc = await `https://openweathermap.org/img/wn/${weatherDescription.icon}@2x.png`;
            const windSpeed = await response.data.wind.speed;

            document.getElementById('weather-icon').setAttribute('src',  weatherIconSrc);

            setInnerHTML('weather-description', weatherDescription.description);
            setInnerHTML('temp', `Now: ${(weather.temp).toFixed(1)}&#8451`);
            setInnerHTML('temp-feels-like', `Feels like: ${(weather.feels_like).toFixed(1)}&#8451`);
            setInnerHTML('temp-max', `Max: ${(weather.temp_max).toFixed(1)}&#8451`);
            setInnerHTML('temp-min', `Min: ${(weather.temp_min).toFixed(1)}&#8451`);
            setInnerHTML('humidity', `Humidity: ${(weather.humidity).toFixed(1)}%`);
            setInnerHTML('wind', `Wind: ${(windSpeed).toFixed(1)}km/h`);

        } catch (error) {
            cleanCurrentWeatherInfo();
            removeCardClass('today-weather');
            removeCardClass('weather-forecast');
            setInnerHTML('error-info', 'Sorry, no data for this city')
            addCardClass('error-info');

        };
    };

    async function getWeatherForecast(city) {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);

            let weatherForecastData = await response.data.list;
            let daysLabels =[];
            let maxTemp = [];
            let weatherIcon = [];
            let weatherDescription = [];

            weatherForecastData.find((item)=>{
                if (item.dt_txt.includes("15:00:00")){
                    let day = item.dt_txt.substring(item.dt_txt.indexOf('-')+1 ,item.dt_txt.indexOf(' ')).split('-');
                    let date = day[1] + '/' + day[0];
                    daysLabels.push(date);
                    weatherIcon.push(`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`);
                    maxTemp.push((item.main.temp_max).toFixed(1));
                    weatherDescription.push(item.weather[0].description);
                };
            });

            for (let i=0; i<daysLabels.length; i++){
                let iconImg = document.createElement('img');
                iconImg.setAttribute('src', weatherIcon[i]);

                let iconDescription = document.createElement("p");
                iconDescription.innerHTML = weatherDescription[i];

                let iconContainer = document.createElement('div');
                iconContainer.setAttribute('class', 'icon-container');

                iconContainer.appendChild(iconImg);
                iconContainer.appendChild(iconDescription);

                document.getElementById('weather-icons').appendChild(iconContainer);

            };
            builtWeatherChart (maxTemp, daysLabels, maxTemp[0]> 0 ? true : false);
        } catch (error) {
            cleanCurrentWeatherInfo();
            removeCardClass('today-weather');
            removeCardClass('weather-forecast');
            addCardClass('error-info');
            setInnerHTML ('error-info', 'Sorry, no data for this city');

        }
    };
    async function choseCityEndDisplayWeather(){
        let data = await (fetch('../src/json/country.json'));
        let countryList = await (data.json());

        createSelectList (countryList, countriesElement);

        countriesElement.addEventListener('click', ()=>{
            createCitiesList(countryList, citiesElement);
        });

        showWeatherElement.addEventListener('click', ()=>{
            displayWeather();
        });
    }


    choseCityEndDisplayWeather();

})();
