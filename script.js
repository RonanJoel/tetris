const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const row = 20;
const col = 10;
const squareSize = 30;
const emptyColor = "#f0f0f0";

let score = 0;

// Tablero de juego
let board = Array.from({ length: row }, () => Array(col).fill(emptyColor));

// Dibujar un cuadrado
function drawSquare(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
    context.strokeStyle = "#fff";
    context.strokeRect(x * squareSize, y * squareSize, squareSize, squareSize);
}

// Dibujar el tablero
function drawBoard() {
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}
drawBoard();

// Definición de las formas de las piezas
const I = [
    [[1, 1, 1, 1]],
    [[1], [1], [1], [1]]
];

const J = [
    [[1, 0, 0], [1, 1, 1]],
    [[1, 1], [1, 0], [1, 0]],
    [[1, 1, 1], [0, 0, 1]],
    [[0, 1], [0, 1], [1, 1]]
];

const L = [
    [[0, 0, 1], [1, 1, 1]],
    [[1, 0], [1, 0], [1, 1]],
    [[1, 1, 1], [1, 0, 0]],
    [[1, 1], [0, 1], [0, 1]]
];

const O = [
    [[1, 1], [1, 1]]
];

const S = [
    [[0, 1, 1], [1, 1, 0]],
    [[1, 0], [1, 1], [0, 1]]
];

const T = [
    [[0, 1, 0], [1, 1, 1]],
    [[1, 0], [1, 1], [1, 0]],
    [[1, 1, 1], [0, 1, 0]],
    [[0, 1], [1, 1], [0, 1]]
];

const Z = [
    [[1, 1, 0], [0, 1, 1]],
    [[0, 1], [1, 1], [1, 0]]
];

// Piezas y sus colores
const pieces = [
    [Z, "#f44336"],
    [S, "#4caf50"],
    [T, "#9c27b0"],
    [O, "#ffeb3b"],
    [L, "#ff9800"],
    [I, "#2196f3"],
    [J, "#3f51b5"]
];

// Generar piezas aleatorias
function randomPiece() {
    let r = Math.floor(Math.random() * pieces.length);
    return new Piece(pieces[r][0], pieces[r][1]);
}

// La clase de la pieza
class Piece {
    constructor(shape, color) {
        this.shape = shape;
        this.color = color;
        this.shapeIndex = 0;
        this.activeShape = this.shape[this.shapeIndex];
        this.x = 3;
        this.y = -2;
    }

    // Dibujar la pieza
    draw() {
        this.fill(this.color);
    }

    // Borrar la pieza
    unDraw() {
        this.fill(emptyColor);
    }

    // Rellenar la pieza
    fill(color) {
        for (let r = 0; r < this.activeShape.length; r++) {
            for (let c = 0; c < this.activeShape.length; c++) {
                if (this.activeShape[r][c]) {
                    drawSquare(this.x + c, this.y + r, color);
                }
            }
        }
    }

    // Mover la pieza abajo
    moveDown() {
        if (!this.collision(0, 1, this.activeShape)) {
            this.unDraw();
            this.y++;
            this.draw();
        } else {
            this.lock();
            piece = randomPiece();
        }
    }

    // Mover la pieza a la izquierda
    moveLeft() {
        if (!this.collision(-1, 0, this.activeShape)) {
            this.unDraw();
            this.x--;
            this.draw();
        }
    }

    // Mover la pieza a la derecha
    moveRight() {
        if (!this.collision(1, 0, this.activeShape)) {
            this.unDraw();
            this.x++;
            this.draw();
        }
    }

    // Rotar la pieza
    rotate() {
        let nextPattern = this.shape[(this.shapeIndex + 1) % this.shape.length];
        if (!this.collision(0, 0, nextPattern)) {
            this.unDraw();
            this.shapeIndex = (this.shapeIndex + 1) % this.shape.length;
            this.activeShape = this.shape[this.shapeIndex];
            this.draw();
        }
    }

    // Verificar colisiones
    collision(x, y, piece) {
        for (let r = 0; r < piece.length; r++) {
            for (let c = 0; c < piece.length; c++) {
                if (!piece[r][c]) continue;
                let newX = this.x + c + x;
                let newY = this.y + r + y;
                if (newX < 0 || newX >= col || newY >= row) return true;
                if (newY >= 0 && board[newY][newX] !== emptyColor) return true;
            }
        }
        return false;
    }

    // Bloquear la pieza
    lock() {
        for (let r = 0; r < this.activeShape.length; r++) {
            for (let c = 0; c < this.activeShape.length; c++) {
                if (!this.activeShape[r][c]) continue;
                if (this.y + r < 0) {
                    alert("Juego terminado");
                    board = Array.from({ length: row }, () => Array(col).fill(emptyColor));
                    score = 0;
                    drawBoard();
                    return;
                }
                board[this.y + r][this.x + c] = this.color;
            }
        }
        for (let r = 0; r < row; r++) {
            if (board[r].every((cell) => cell !== emptyColor)) {
                board.splice(r, 1);
                board.unshift(Array(col).fill(emptyColor));
                score += 10;
            }
        }
        scoreElement.innerHTML = score;
        drawBoard();
    }
}

// Control del juego
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") piece.moveLeft();
    else if (event.key === "ArrowRight") piece.moveRight();
    else if (event.key === "ArrowDown") piece.moveDown();
    else if (event.key === "ArrowUp") piece.rotate();
});

// Iniciar el juego
let piece = randomPiece();
let game = setInterval(() => piece.moveDown(), 500);









