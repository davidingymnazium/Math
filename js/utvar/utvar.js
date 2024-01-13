const toggleList = document.querySelector("#toggle-list")
const dropDownImg = document.querySelector("#drop-down-img")


function toggleComponent(sourceID, component) {
    const source = document.getElementById(sourceID);
    const list = document.getElementById(component);
    
    list.classList.toggle('hidden')
    source.classList.toggle('rotate-bottom');
}

function togglePart(sourceID, component) {
    const source = document.getElementById(sourceID);
    const list = document.getElementById(component);
    
    list.classList.toggle('hidden')
    source.classList.toggle('hidden');
}
