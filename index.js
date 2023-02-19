const sizeButtons = document.querySelectorAll(".btn-size");
const colorButtons = document.querySelectorAll(".btn-color");
const container = document.querySelector(".grid-container");
const color = document.querySelector("#colorpicker");
const gridToggleBtn = document.querySelector(".gridline-toggle");
let cells = document.querySelectorAll(".cell");

sizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    createGrid(button.id);
  });
});

function createGrid(size) {
  resetGrid();
  document.documentElement.style.setProperty("--gridSize", size);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let div = document.createElement("div");
      div.classList.add("cell");
      container.appendChild(div);
    }
  }
  let currentCells = document.querySelectorAll(".cell");
  let currentColor = document.querySelector("#colorpicker");
  colorMouseDown(currentCells, currentColor);
}

function resetGrid() {
  container.querySelectorAll("*").forEach(function (child) {
    child.remove();
  });
}

gridToggleBtn.addEventListener("change", () => {
  let currentCells = document.querySelectorAll(".cell");
  toggleGridlines(currentCells);
});

function toggleGridlines(cells) {
  cells.forEach((cell) => {
    cell.classList.toggle("no-gridlines");
  });
}

colorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    changeColorMode(button.id);
  });
});

function changeColorMode(input) {
  colorMode = input;
}

function getRandomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function colorMouseDown(cells, color) {
  let isMouseDown = false;
  cells.forEach((cell) => {
    cell.addEventListener("mousedown", () => {
      isMouseDown = true;
    });
    cell.addEventListener("mouseup", () => {
      isMouseDown = false;
    });
    cell.addEventListener("mousemove", (event) => {
      if (isMouseDown) {
        switch (colorMode) {
          case "single-color":
            cell.style.backgroundColor = color.value;
            break;
          case "rainbow-mode":
            cell.style.backgroundColor = getRandomColor();
            break;
          case "eraser":
            cell.style.backgroundColor = container.style.backgroundColor;
            break;
        }
      }
    });
  });
}

createGrid(16);
