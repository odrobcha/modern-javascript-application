import {setInnerHTML} from "./setInnerHTML.js";
import {removeCardClass} from "./removeCardClass.js";

const cleanCurrentWeatherInfo = ()=>{
    setInnerHTML('weather-icons', '');
    setInnerHTML('weather-icon', '');
    setInnerHTML('weather-description', '');
    setInnerHTML('temp', '');
    setInnerHTML('temp-feels-like', '');
    setInnerHTML('temp-max', '');
    setInnerHTML('temp-min', '');
    setInnerHTML('humidity', '');
    setInnerHTML('today-weather-title', '');
    setInnerHTML('weather-forecast-title', '');
    setInnerHTML('wind', '');
    removeCardClass('error-info');
    document.getElementById('weather-icon').setAttribute('src', '');
}

export {cleanCurrentWeatherInfo};