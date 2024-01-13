
//-------------------------------------

MathJax = {
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ], // Define delimiters for inline math
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ], // Define delimiters for display math
    processEscapes: true, // Process escaped LaTeX in the text content
  },
  options: {
    skipHtmlTags: ["script", "noscript", "style", "textarea", "pre"], // Skip these HTML tags
  },
};

//----------------------------------------------

const iconLink = document.createElement('link');
iconLink.rel = 'icon';
iconLink.href = '../img/axis.png';

document.head.appendChild(iconLink); 


// Vytvoří (a opráví) automaticky nadpis od h1 - h6 pro obsah (TOC)
    const headers = document.querySelectorAll("h1, h2, h3, h4, h5");
    const obsah = document.getElementById("obsah");
    const obsahList = document.createElement("ul");
    
    if(headers != null && obsah != null && obsahList != null) {

        headers.forEach((header) => {
            const listItem = document.createElement("li")
            const link = document.createElement("a")
            link.href = `#${header.id}`
            link.textContent = `${header.id}) ${header.textContent}`
            listItem.appendChild(link)
            obsahList.appendChild(listItem)
        })
    
        obsah.appendChild(obsahList);
    
    }
//-------------------------------------

let menu = document.querySelector("#menu")
let sideMenu = document.querySelector("#sideMenu")
let playground = document.querySelector(".playground")

if(menu != null) {
  menu.addEventListener("click", () => {
    sideMenu.classList.toggle("slide-out-elliptic-right-bck")
    playground.classList.toggle("slide-out-elliptic-right-bck")
  
})
}


