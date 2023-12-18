// Canvas und Kontext holen
const canvas = document.getElementById('pingPongCanvas');
const ctx = canvas.getContext('2d');

// Schläger
const paddleWidth = 10, paddleHeight = 60;
let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;

// Ball
const ballSize = 10;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 5, ballSpeedY = 2;

// Spielersteuerung
let leftPlayerUp = false, leftPlayerDown = false;
let rightPlayerUp = false, rightPlayerDown = false;

// Zeichenfunktion
function draw() {
    // Spielfeld löschen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ball zeichnen
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.closePath();

    // Linken Schläger zeichnen
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);

    // Rechten Schläger zeichnen
    ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
}

// Animationsschleife
function gameLoop() {
    draw();

    // Ballbewegung
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Kollision mit Wand oben/unten
    if (ballY - ballSize < 0 || ballY + ballSize > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Kollision mit linkem Schläger
    if (ballX - ballSize < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Kollision mit rechtem Schläger
    if (ballX + ballSize > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Schlägerbewegung für Spieler 1 (WASD)
    if (leftPlayerUp && leftPaddleY > 0) {
        leftPaddleY -= 5;
    }
    if (leftPlayerDown && leftPaddleY < canvas.height - paddleHeight) {
        leftPaddleY += 5;
    }

    // Schlägerbewegung für Spieler 2 (Pfeiltasten)
    if (rightPlayerUp && rightPaddleY > 0) {
        rightPaddleY -= 5;
    }
    if (rightPlayerDown && rightPaddleY < canvas.height - paddleHeight) {
        rightPaddleY += 5;
    }

    requestAnimationFrame(gameLoop);
}

// Tastenereignisse für Spieler 1 (WASD)
document.addEventListener('keydown', (e) => {
    if (e.key === 'w') leftPlayerUp = true;
    if (e.key === 's') leftPlayerDown = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'w') leftPlayerUp = false;
    if (e.key === 's') leftPlayerDown = false;
});

// Tastenereignisse für Spieler 2 (Pfeiltasten)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') rightPlayerUp = true;
    if (e.key === 'ArrowDown') rightPlayerDown = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp') rightPlayerUp = false;
    if (e.key === 'ArrowDown') rightPlayerDown = false;
});

// Spiel starten
gameLoop();
