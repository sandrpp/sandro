const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 10;
const paddleHeight = 60;
let paddleSpeed = 5;

let player1 = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    dy: 0,
    score: 0,
    powerUpActive: false
};

let player2 = {
    x: canvas.width - 20,
    y: canvas.height / 2 - paddleHeight / 2,
    dy: 0,
    score: 0,
    powerUpActive: false
};

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    dx: 5,
    dy: 5,
    radius: 8
};

let powerUp = {
    x: 0,
    y: 0,
    active: false
};

function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    ctx.fillStyle = "#fff";
    ctx.fillRect(player1.x, player1.y, paddleWidth, paddleHeight);
    ctx.fillRect(player2.x, player2.y, paddleWidth, paddleHeight);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
    
    // Draw scores
    ctx.font = "20px Arial";
    ctx.fillText("Player 1: " + player1.score, 50, 30);
    ctx.fillText("Player 2: " + player2.score, canvas.width - 150, 30);
}

function update() {
    // Update paddle positions
    player1.y += player1.dy;
    player2.y += player2.dy;

    // Boundary checking for paddles
    player1.y = Math.max(0, Math.min(canvas.height - paddleHeight, player1.y));
    player2.y = Math.max(0, Math.min(canvas.height - paddleHeight, player2.y));

    // Update ball position
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top and bottom walls
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.dy *= -1;
    }

    // Ball collision with paddles
    if (
    (ball.x - ball.radius < player1.x + paddleWidth &&
        ball.y > player1.y &&
        ball.y < player1.y + paddleHeight) ||
    (ball.x + ball.radius > player2.x &&
        ball.y > player2.y &&
        ball.y < player2.y + paddleHeight)
    ) {
    ball.dx *= -1;
    }

    // Check for scoring
    if (ball.x - ball.radius < 0) {
    player2.score++;
    reset();
    } else if (ball.x + ball.radius > canvas.width) {
    player1.score++;
    reset();
    }

    // Increase ball speed every 5 hits
    if ((player1.score + player2.score) % 5 === 0 && (player1.score + player2.score) > 0) {
    ball.dx = (ball.dx > 0 ? 1 : -1) * Math.abs(ball.dx) * 1.1;
    ball.dy = (ball.dy > 0 ? 1 : -1) * Math.abs(ball.dy) * 1.1;
    }

    // Power-up logic
    if (powerUp.active) {
    if (
        ball.x - ball.radius < powerUp.x + 10 &&
        ball.x + ball.radius > powerUp.x &&
        ball.y - ball.radius < powerUp.y + 10 &&
        ball.y + ball.radius > powerUp.y
    ) {
        // Apply power-up effect to the player with the ball
        if (ball.dx > 0) {
        player1.powerUpActive = true;
        } else {
        player2.powerUpActive = true;
        }

        // Deactivate power-up
        powerUp.active = false;

        // Reset power-up after 5 seconds
        setTimeout(() => {
        player1.powerUpActive = false;
        player2.powerUpActive = false;
        }, 5000);
    }
    } else {
    // Activate power-up randomly
    if (Math.random() < 0.01) {
        powerUp.active = true;
        powerUp.x = Math.random() * (canvas.width - 10);
        powerUp.y = Math.random() * (canvas.height - 10);
    }
    }

    // Apply paddle speed changes due to power-up
    if (player1.powerUpActive) {
    paddleSpeed = 10;
    } else {
    paddleSpeed = 5;
    }
}

function reset() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = Math.abs(ball.dx);
    ball.dy = Math.abs(ball.dy);
}

function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

function keyDownHandler(e) {
    if (e.key === "W" || e.key === "w") {
    player1.dy = -paddleSpeed;
    } else if (e.key === "S" || e.key === "s") {
    player1.dy = paddleSpeed;
    }

    if (e.key === "ArrowUp") {
    player2.dy = -paddleSpeed;
    } else if (e.key === "ArrowDown") {
    player2.dy = paddleSpeed;
    }
}

function keyUpHandler(e) {
    if (e.key === "W" || e.key === "w" || e.key === "S" || e.key === "s") {
    player1.dy = 0;
    }

    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    player2.dy = 0;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

gameLoop();