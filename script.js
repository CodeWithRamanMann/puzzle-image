let pieces = [];
let selectedPiece = null;
let offsetX = 0;
let offsetY = 0;

document.addEventListener('DOMContentLoaded', function() {
    const puzzleContainer = document.getElementById('puzzleContainer');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const imageInput = document.getElementById('imageInput');

    // Create puzzle pieces
    for (let i = 0; i < 9; i++) {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        piece.style.backgroundImage = 'url("nature.jpg")'; // Replace 'your-image-url.jpg' with your image URL
        piece.style.backgroundSize = '600px 600px';
        const row = Math.floor(i / 3);
        const col = i % 3;
        piece.style.backgroundPosition = `-${col * 200}px -${row * 200}px`;
        piece.style.left = `${col * 200}px`;
        piece.style.top = `${row * 200}px`;
        piece.setAttribute('data-row', row);
        piece.setAttribute('data-col', col);
        puzzleContainer.appendChild(piece);
        pieces.push(piece);
    }

    // Add mouse events
    pieces.forEach(piece => {
        piece.addEventListener('mousedown', e => {
            selectedPiece = piece;
            offsetX = e.clientX - piece.offsetLeft;
            offsetY = e.clientY - piece.offsetTop;
        });

        piece.addEventListener('mousemove', e => {
            if (selectedPiece === piece) {
                const newX = e.clientX - offsetX;
                const newY = e.clientY - offsetY;
                piece.style.left = `${newX}px`;
                piece.style.top = `${newY}px`;
            }
        });

        piece.addEventListener('mouseup', () => {
            selectedPiece = null;
            snapToGrid(piece);
            checkSolution();
        });
    });

    // Snaps piece to nearest grid position
    function snapToGrid(piece) {
        const row = Math.round(parseFloat(piece.style.top) / 200);
        const col = Math.round(parseFloat(piece.style.left) / 200);
        piece.style.left = `${col * 200}px`;
        piece.style.top = `${row * 200}px`;
    }

    // Checks if puzzle is solved
    function checkSolution() {
        let solved = true;
        pieces.forEach(piece => {
            const row = parseInt(piece.getAttribute('data-row'));
            const col = parseInt(piece.getAttribute('data-col'));
            const currentRow = Math.round(parseFloat(piece.style.top) / 200);
            const currentCol = Math.round(parseFloat(piece.style.left) / 200);
            if (row !== currentRow || col !== currentCol) {
                solved = false;
            }
        });
        if (solved) {
            alert('Congratulations! You solved the puzzle!');
        }
    }

    // Shuffle puzzle pieces
    shuffleBtn.addEventListener('click', shufflePuzzle);

    // Handle image selection via drag and drop
    puzzleContainer.addEventListener('dragover', dragOverHandler);
    puzzleContainer.addEventListener('drop', dropHandler);
    imageInput.addEventListener('change', handleImageUpload);
});

function shufflePuzzle() {
    pieces.forEach(piece => {
        const row = Math.floor(Math.random() * 3);
        const col = Math.floor(Math.random() * 3);
        piece.style.left = `${col * 200}px`;
        piece.style.top = `${row * 200}px`;
    });
}

function dragOverHandler(event) {
    event.preventDefault();
}

function dropHandler(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            pieces.forEach(piece => {
                piece.style.backgroundImage = `url(${imageUrl})`;
            });
        };
        reader.readAsDataURL(file);
    }
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            pieces.forEach(piece => {
                piece.style.backgroundImage = `url(${imageUrl})`;
            });
        };
        reader.readAsDataURL(file);
    }
}
