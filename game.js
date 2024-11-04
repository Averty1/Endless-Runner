// game.js
const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
let isJumping = false;
let gravity = 0.5;
let playerVelocity = 0;
let score = 0;

const obstacleSpeed = 3;
let obstacles = [];
let isGameOver = false;

document.addEventListener('keydown', () => {
  if (!isJumping) {
    isJumping = true;
    playerVelocity = -10; // initial jump speed
  }
});

function gameLoop() {
  if (isGameOver) {
    alert(`Game Over! Your Score: ${score}`);
    return;
  }

  // Move the player
  if (isJumping) {
    playerVelocity += gravity;
    player.style.bottom = `${parseFloat(player.style.bottom) + playerVelocity}px`;

    if (parseFloat(player.style.bottom) <= 0) {
      isJumping = false;
      player.style.bottom = '0';
      playerVelocity = 0;
    }
  }

  // Create and move obstacles
  if (Math.random() < 0.02) {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = '100vw'; // Position it off-screen
    gameContainer.appendChild(obstacle);
    obstacles.push(obstacle);
  }

  obstacles.forEach((obstacle, index) => {
    let obstaclePos = parseFloat(obstacle.style.left);
    obstaclePos -= obstacleSpeed;
    obstacle.style.left = `${obstaclePos}px`;

    // Collision detection
    if (
      obstaclePos >= 50 && obstaclePos <= 100 && // Obstacle is within the player's X range
      parseFloat(player.style.bottom) <= 50 // Player is on the ground
    ) {
      if (!isJumping) {
        isGameOver = true; // Player collided with obstacle
      }
    }

    // Remove obstacles that are off-screen
    if (obstaclePos < -50) {
      obstacle.remove();
      obstacles.splice(index, 1);
      score++;
    }
  });

  if (!isGameOver) {
    requestAnimationFrame(gameLoop); // Continue the game loop
  }
}

// Start the game loop
gameLoop();
