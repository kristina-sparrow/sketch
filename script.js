let buttons = document.querySelectorAll("button");
let gridToggleBtn = document.querySelector(".gridline-toggle");

buttons.forEach(button => {
    button.addEventListener("click", function () {
        createGrid(button.id);
    })
})

function createGrid (size) {
    resetGrid();
    document.documentElement.style.setProperty('--gridSize', size);
    let container = document.querySelector(".container");
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let div = document.createElement("div");
            div.classList.add("grid-square");
            container.appendChild(div);
        }
    }
}

function resetGrid () {
    let container = document.querySelector(".container");
    container.querySelectorAll('*').forEach(function(child) {
        child.remove();
    });
}

gridToggleBtn.addEventListener("change", function () {
    toggleGridlines();
})

function toggleGridlines () {
    let cells = document.querySelectorAll(".grid-square");
    cells.forEach(cell => {
        cell.classList.toggle("no-gridlines");
    });
}

createGrid(16);