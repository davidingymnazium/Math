//Tohle je old version :((


const parameterA = document.querySelector("#a-parametr");
const parameterB = document.querySelector("#b-parametr");
const parameterC = document.querySelector("#c-parametr");

const yCoordinateA = document.querySelector("#y-souřadnice-A");
const xCoordinateB = document.querySelector("#x-souřadnice-B");

const inputRovnice = document.querySelector("#inputRovnice");
const setPoint = document.querySelector("#setPoint");

const paraEquation1 = document.querySelector(".equation-para-1");
const paraEquation2 = document.querySelector(".equation-para-2");

const slopeEquation1 = document.querySelector(".equation-slope-1");
const slopeEquation2 = document.querySelector(".equation-slope-2");

const comment = document.getElementById("comment")



let a, b, c, y;
const xA = 1;
const yB = 1;
let pointA, pointB, lineEquation;

//Směrnice k
let k;

// Průsečík s osou Oy - M[0,m]
let m;
let pointM;

// Průsečík s osou Ox -  N[n,0]
let n;
let pointN;

// směrový vektor
let s;

function evalInput(input) {
  ggbApplet.evalCommand(input);
  return false;
}

inputRovnice.addEventListener("submit", (e) => {
  e.preventDefault();
  ggbApplet.setGridVisible(true)
  a = parseInt(parameterA.value);
  b = parseInt(parameterB.value);
  c = parseInt(parameterC.value);

  //-- Obecná rovnice přímky p
  lineEquation = `${a}x + ${b}y + ${c} = 0`;
  //-- Bod A
  resultA = (-c - a * xA) / b;
  let yA = math.fraction(resultA).toFraction();
  yCoordinateA.textContent = `$${yA}$`;
  pointA = `(${xA}, ${yA})`;

  //-- Bod B
  resultB = (-c - b * yB) / a;
  let xB = math.fraction(resultB).toFraction();
  xCoordinateB.textContent = `$${xB}$`;
  pointB = `(${xB}, ${yB})`;

  //-- Geogebra kreslení přímky
  evalInput(pointA);
  evalInput(pointB);
  evalInput(lineEquation);

  //-  Parametrická rovnice
  //-- Parametrická rovnice pro A[1,y_A]
  paraEquation1.innerHTML = `$p: X = A + ts \\quad \\Leftrightarrow \\quad p: 
              \\left\\{\\begin{matrix} x = ${xA} + ${b}t
              \\\\ y = {${yA}} + ${-a}t
              \\end{matrix}\\right.$`;
  //-- Parametrická rovnice pro B[x_B,1]
  paraEquation2.innerHTML = `$p: X = B + ts \\quad \\Leftrightarrow \\quad p: 
              \\left\\{\\begin{matrix} x = ${xB} + ${b}t
              \\\\ y = {${yB}} + ${-a}t
              \\end{matrix}\\right.$`;

  // směrový vektor
  s = `(${b}, ${-a})`;

  //-- Směrnice k
  let směrnice = -a / b;
  k = math.fraction(směrnice);

  //-- Průsečík s Oy
  let průsečíkY = -c / b;
  m = math.fraction(průsečíkY);
  pointM = `(0, ${m})`;

  if (b != 0) {
    //-- Směrnicový tvar
    //-- Rovnice 1
    slopeEquation1.innerHTML = `$p: y = -\\frac{${k.n}}{${k.d}}x +  \\frac{${m.n}}{${m.d}}$`;
    //-- Rovnice 2
    if (resultA < 0) {
      yA = `(${yA})`;
    }
    slopeEquation2.innerHTML = `\\( p: \\frac{y-${yA}}{x-${xA}} = \\frac{${-a}}{${b}}\\)`;
  } else {
    slopeEquation1.textContent = "$p: neexistuje";
    slopeEquation2.textContent = "$p: neexistuje";
  }

  MathJax.typesetPromise([
    paraEquation1,
    paraEquation2,
    yCoordinateA,
    xCoordinateB,
    slopeEquation1,
    slopeEquation2,
  ]);
});

function resetButton() {
  parameterA.value = 0;
  parameterB.value = 0;
  parameterC.value = 0;

  yCoordinateA.textContent = "$y$";
  xCoordinateB.textContent = "$x$";
  MathJax.typesetPromise([yCoordinateA, xCoordinateB]);
  paraEquation1.textContent = "";
  paraEquation2.textContent = "";
  slopeEquation1.textContent = "";
  slopeEquation2.textContent = "";
  ggbApplet.reset();
}
