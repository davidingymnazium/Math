const all = document.querySelector("#all")
const points = document.querySelector("#points")
const vectors = document.querySelector("#vectors")
const equation = document.querySelector("#equation")

const body = document.querySelector("#body")
const vektory = document.querySelector("#vektory")
const result = document.querySelector(".result")
const none = document.querySelector("#none")

all.addEventListener("click", () => {
    body.classList.remove("hidden");
    vektory.classList.remove("hidden");
    result.classList.remove("hidden");
})

points.addEventListener("click", () => {
    body.classList.remove("hidden");
    vektory.classList.add("hidden");
    result.classList.add("hidden");
})

vectors.addEventListener("click", () => {
    body.classList.add("hidden");
    vektory.classList.remove("hidden");
    result.classList.add("hidden");
})

equation.addEventListener("click", () => {
    body.classList.add("hidden");
    vektory.classList.add("hidden");
    result.classList.remove("hidden");
})


none.addEventListener("click", () => {
    body.classList.add("hidden");
    vektory.classList.add("hidden");
    result.classList.add("hidden");
})

document.addEventListener("DOMContentLoaded", () => {
    body.classList.add("hidden");
    vektory.classList.add("hidden");
    result.classList.add("hidden");
})

