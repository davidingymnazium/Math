const parameterA = document.querySelector("#a-parametr");
const parameterB = document.querySelector("#b-parametr");
const parameterC = document.querySelector("#c-parametr");

const yCoordinateA = document.querySelector("#y-souřadnice-A");
const xCoordinateB = document.querySelector("#x-souřadnice-B");
const xOx = document.querySelector("#x-Ox")
const yOy = document.querySelector("#y-Oy")

const inputRovnice = document.querySelector("#inputRovnice");
const setPoint = document.querySelector("#setPoint");

const paraEquation1 = document.querySelector(".equation-para-1");
const paraEquation2 = document.querySelector(".equation-para-2");

const slopeEquation1 = document.querySelector(".equation-slope-1");
const slopeEquation2 = document.querySelector(".equation-slope-2");

const xyEquation = document.querySelector(".equation-intercept")

const direction = document.querySelector(".direction")
const normal = document.querySelector(".normal")

let compareArray = (array1, array2) => array1.length === array2.length && array1.every((value, index) => value === array2[index])

const comment = document.getElementById("comment")
let memo = {
    times: 0,
}


function evalInput(input) {
    ggbApplet.evalCommand(input);
    return false;
}

inputRovnice.addEventListener("submit", (e) => {
    e.preventDefault();

    
    let a = parseInt(parameterA.value);
    let b = parseInt(parameterB.value);
    let c = parseInt(parameterC.value);
    
    if(a*b === 0) alert("Prosím vyberte jiné číslo než 0!!!\nMoje aplikace teď nepodporuje lineární rovnice.\nDěkuji za pochopení.")  

    if(memo.times === 0) {
        memo.previous = [a,b,c]
    }
    else {
        memo.now = [a,b,c]
    }
    memo.times++;

    if(memo.now != null && !compareArray(memo.now, memo.previous)) {
        ggbApplet.reset();
        memo.times = 0;
    }


    let k = new Line(a,b,c);
    let A = k.pointA
    let B = k.pointB 
    let X = k.pointX
    let Y = k.pointY

    evalInput(A.display())
    evalInput(B.display())
    evalInput(k.pointX.display())
    ggbApplet.renameObject("C", "X")
    evalInput(k.pointY.display())
    ggbApplet.renameObject("C", "Y")

    ggbApplet.setLabelStyle("A", 1)
    ggbApplet.setLabelStyle("B", 1)
    ggbApplet.setLabelStyle("X", 1)
    ggbApplet.setLabelStyle("Y", 1)

    evalInput(`k : ${k.line}`)
    ggbApplet.setLabelStyle("k", 1)


    // Set coordination in the web form
   yCoordinateA.textContent = `$${A.y.display("latex")}$`;
   xCoordinateB.textContent = `$${B.x.display("latex")}$`;
   xOx.textContent = `$${X.x.display("latex")}$`;
   yOy.textContent = `$${Y.y.display("latex")}$`;
   
    //Vector
    direction.textContent = `$${k.directionVector.display()}$`
    normal.textContent = `$${k.normalVector.display()}$`

    // Parametric equation
    paraEquation1.textContent = `$${k.parameter(true).pointA}$`
    paraEquation2.textContent = `$${k.parameter(true).pointB}$`

   // Slope equation 
    slopeEquation1.textContent = `$$${k.slope()}$$`
    slopeEquation2.textContent = `$$${k.slope(false)}$$`

    //Intercept equation
    xyEquation.textContent = `$$${k.intercept()}$$`

    //Mathjax - Latex
    MathJax.typesetPromise([
        paraEquation1,
        paraEquation2,

        slopeEquation1,
        slopeEquation2,

        xyEquation,

        yCoordinateA,
        xCoordinateB,

        xOx,
        yOy,

        direction,
        normal
    ]);

    //-------------------

    body.classList.remove("hidden");
    vektory.classList.remove("hidden");
    result.classList.remove("hidden");
})

function resetButton() {
    parameterA.value = 0;
    parameterB.value = 0;
    parameterC.value = 0;
  
    yCoordinateA.textContent = "$y$";
    xCoordinateB.textContent = "$x$";
    xOx.textContent = "$ x $";
    yOy.textContent = "$ y $";

    MathJax.typesetPromise([yCoordinateA, xCoordinateB, xOx, yOy]);

    paraEquation1.textContent = "";
    paraEquation2.textContent = "";
    slopeEquation1.textContent = "";
    slopeEquation2.textContent = "";
    xyEquation.textContent = ``


    direction.textContent = ``
    normal.textContent = ``


    ggbApplet.reset();

    body.classList.add("hidden");
    vektory.classList.add("hidden");
    result.classList.add("hidden");
  }

//-------------------------------

