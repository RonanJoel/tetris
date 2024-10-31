const boardWidth = 10;
const boardHeight = 20;
let board = Array.from({ length: boardHeight }, () => Array(boardWidth).fill(0));
let score = 0;

// Referencias de HTML
const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');

// Inicializar el tablero de juego en el DOM
function renderBoard() {
  gameBoard.innerHTML = '';
  board.forEach(row => {
    row.forEach(cell => {
      const cellDiv = document.createElement('div');
      cellDiv.className = cell ? 'block' : '';
      gameBoard.appendChild(cellDiv);
    });
  });
}

function updateScore() {
  scoreDisplay.innerText = `Puntuación: ${score}`;
}

// Función principal del juego
function gameLoop() {
  // Aquí irán las funciones para mover y rotar las piezas, detectar colisiones, etc.
  renderBoard();
  updateScore();
}

// Iniciar el juego
gameLoop();
