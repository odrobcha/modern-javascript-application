import {createSelectList} from "./createSelectList.js";

const createCitiesList = (coutries, parentElement) =>{
    let chosenCountry = document.getElementById('countries').value;
    let chosenCitiesList = coutries[chosenCountry];
    if (chosenCitiesList === undefined){
        return
    }
    document.getElementById('country-first-option').setAttribute('disabled', 'disabled');
    parentElement.innerHTML = '';
    createSelectList (chosenCitiesList, parentElement);
}

export {createCitiesList}
