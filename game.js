const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
let isJumping = false;
let gravity = 0.5;
let playerVelocity = 0;
let score = 0;

const obstacleSpeed = 3;
let obstacles = [];
let isGameOver = false;
let playerPositionX = 50; // Starting position of player on X axis
const playerSpeed = 5; // How fast the player moves left/right

// Handle key events
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && !isJumping) {
    isJumping = true;
    playerVelocity = -10; // Initial jump speed
  } else if (event.code === 'ArrowRight') {
    playerPositionX += playerSpeed; // Move player to the right
  } else if (event.code === 'ArrowLeft') {
    playerPositionX -= playerSpeed; // Move player to the left
  }

  // Prevent player from going off-screen
  if (playerPositionX < 0) playerPositionX = 0; // Left boundary
  if (playerPositionX > window.innerWidth - 50) playerPositionX = window.innerWidth - 50; // Right boundary
});

function gameLoop() {
  if (isGameOver) {
    alert(`Game Over! Your Score: ${score}`);
    return;
  }

  // Move the player vertically (jumping)
  if (isJumping) {
    playerVelocity += gravity;
    player.style.bottom = `${parseFloat(player.style.
