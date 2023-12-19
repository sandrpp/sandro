document.addEventListener('DOMContentLoaded', function () {
    const paddle1 = document.getElementById('paddle1');
    const paddle2 = document.getElementById('paddle2');
    const ball = document.getElementById('ball');
  
    document.addEventListener('keydown', function (event) {
      // Player 1 controls
      if (event.key === 'w' && parseInt(paddle1.style.top) > 0) {
        paddle1.style.top = `${parseInt(paddle1.style.top) - 10}px`;
      } else if (event.key === 's' && parseInt(paddle1.style.top) < 300) {
        paddle1.style.top = `${parseInt(paddle1.style.top) + 10}px`;
      }
  
      // Player 2 controls
      if (event.key === 'ArrowUp' && parseInt(paddle2.style.top) > 0) {
        paddle2.style.top = `${parseInt(paddle2.style.top) - 10}px`;
      } else if (event.key === 'ArrowDown' && parseInt(paddle2.style.top) < 300) {
        paddle2.style.top = `${parseInt(paddle2.style.top) + 10}px`;
      }
    });
  });