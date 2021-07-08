const createSelectList = (selectItems, parentElement) =>{
    let loopingArray = selectItems;
    if (!Array.isArray(selectItems)) {
        loopingArray = Object.keys(selectItems);
    };
    for (let item of loopingArray){
        let optionElement = document.createElement('option');
        optionElement.setAttribute('value', item);
        optionElement.innerHTML = item;
        parentElement.appendChild(optionElement);
    };
};

export {createSelectList};