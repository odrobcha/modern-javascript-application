const createCanvasElement = (id) =>{
    console.log(id);
    window.onload = function (){
        const canvasElement = document.createElement('canvas');
        canvasElement.setAttribute('id', 'weatherChart');

        document.getElementById(id).appendChild(canvasElement);
    }

};

export {createCanvasElement};