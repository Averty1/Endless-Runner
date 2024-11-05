// game.js

const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
let isJumping = false;
let isGameOver = false;
let gravity = 0.5;
let playerVelocity = 0;
let playerPosition = 0;
let score = 0;

const obstacleSpeed = 3;
let obstacles = [];

// Player movement
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && !isJumping) {
    // Start jump
    isJumping = true;
    playerVelocity = -10;
  }

  // Move player horizontally with arrow keys
  if (event.code === 'ArrowRight' && !isGameOver) {
    player.style.left = `${parseFloat(player.style.left) + 10}px`; // Move player right
  }
  if (event.code === 'ArrowLeft' && !isGameOver) {
    player.style.left = `${parseFloat(player.style.left) - 10}px`; // Move player left
  }
});

// Main game loop
function gameLoop() {
  if (isGameOver) {
    alert(`Game Over! Your Score: ${score}`);
    return;
  }

  // Handle jump physics
  if (isJumping) {
    playerVelocity += gravity;
    let newBottom = parseFloat(player.style.bottom) + playerVelocity;

    if (newBottom <= 0) {
      isJumping = false;
      player.style.bottom = '0';
      playerVelocity = 0;
    } else {
      player.style.bottom = `${newBottom}px`;
    }
  }

  // Create obstacles and move them left
  if (Math.random() < 0.02) {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = `${gameContainer.offsetWidth}px`; // Position obstacles off-screen
    gameContainer.appendChild(obstacle);
    obstacles.push(obstacle);
  }

  obstacles.forEach((obstacle, index) => {
    let obstaclePos = parseFloat(obstacle.style.left);
    obstaclePos -= obstacleSpeed;
    obstacle.style.left = `${obstaclePos}px`;

    // Check for collisions
    if (
      obstaclePos >= 50 && obstaclePos <= 100 && // Obstacle is within the player's X range
      parseFloat(player.style.bottom) <= 50 // Player is on the ground
    ) {
      if (!isJumping) {
        isGameOver = true; // Player collided with an obstacle
      }
    }

    // Remove obstacles that are off-screen
    if (obstaclePos < -50) {
      obstacle.remove();
      obstacles.splice(index, 1);
      score++;
    }
  });

  requestAnimationFrame(gameLoop); // Continue the game loop
}

// Start the game loop
gameLoop();
