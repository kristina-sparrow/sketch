// Declarations
const sizeButtons = document.querySelectorAll(".btn-size");
const colorButtons = document.querySelectorAll(".btn-color");
const gridContainer = document.querySelector(".grid-container");
const gridToggleBtn = document.querySelector(".gridline-toggle");
const cells = document.querySelectorAll(".cell");
const color = document.querySelector("#colorpicker");
let colorMode = "single-color";

// Functions
function createGrid(size) {
  resetGrid();
  document.documentElement.style.setProperty("--gridSize", size);
  const cellArray = Array.from({ length: size ** 2 }).fill(null);
  cellArray.forEach(() => {
    const div = document.createElement("div");
    div.classList.add("cell");
    gridContainer.appendChild(div);
  });
  let currentCells = document.querySelectorAll(".cell");
  let currentColor = document.querySelector("#colorpicker");
  colorMouseDown(currentCells, currentColor);
}

function resetGrid() {
  gridContainer.querySelectorAll("*").forEach((child) => {
    child.remove();
  });
}

function toggleGridlines(cells) {
  cells.forEach((cell) => {
    cell.classList.toggle("no-gridlines");
  });
}

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
    cell.addEventListener("mousemove", () => {
      if (isMouseDown) {
        switch (colorMode) {
          case "single-color":
            cell.style.backgroundColor = color.value;
            break;
          case "rainbow-mode":
            cell.style.backgroundColor = getRandomColor();
            break;
          case "eraser":
            cell.style.backgroundColor = gridContainer.style.backgroundColor;
            break;
        }
      }
    });
  });
}

// Event Listeners
sizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    createGrid(button.id);
  });
});

colorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    changeColorMode(button.id);
  });
});

gridToggleBtn.addEventListener("change", () => {
  let currentCells = document.querySelectorAll(".cell");
  toggleGridlines(currentCells);
});

// Init
createGrid(16);
