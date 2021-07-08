const createCanvasElement = () =>{
    let canvasElement = document.createElement('canvas');
    canvasElement.setAttribute('id', 'weatherChart');
    document.getElementById('weather-forecast').appendChild(canvasElement);
};

export {createCanvasElement};