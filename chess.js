const chessboard = document.getElementById('chessboard');
let selectedPiece = null;
let selectedSquare = null;

// Initial positions of chess pieces
const initialBoard = [
  ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
  ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
  ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜']
];

// Create the chessboard
function createBoard() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement('div');
      square.classList.add('square');
      if ((row + col) % 2 === 0) {
        square.classList.add('white');
      } else {
        square.classList.add('black');
      }

       // Add pieces to the board
       if (initialBoard[row][col]) {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        piece.textContent = initialBoard[row][col];
        piece.dataset.row = row;
        piece.dataset.col = col;
        square.appendChild(piece);
      }

      // Add click event to each square
      square.addEventListener('click', () => handleSquareClick(row, col, square));
      chessboard.appendChild(square);
    }
  }
}

// Handle square click (for moving pieces)
function handleSquareClick(row, col, square) {
  const piece = square.querySelector('.piece');

  // If a piece is already selected
  if (selectedPiece) {
    if (piece) {
      // If another piece is selected, deselect the current piece
      selectedPiece.classList.remove('selected');
    }

    // Move the piece to the new square
    const targetSquare = chessboard.children[row * 8 + col];
    if (targetSquare && !targetSquare.contains(piece)) {
      targetSquare.appendChild(selectedPiece);
      selectedPiece.classList.remove('selected');
      selectedPiece = null;
    }
  } else {
    // Select the piece
    if (piece) {
      selectedPiece = piece;
      selectedPiece.classList.add('selected');
      selectedSquare = square;
    }
  }
}

// Initialize the board when the page loads
createBoard();