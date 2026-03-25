function initTicTacToe() {
    const container = document.getElementById('tictactoeGame');
    if (container.innerHTML.trim() !== '') return;

    container.innerHTML = `
        <button class="back-home-btn" id="tttBackBtn"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title"><i class="fas fa-grip-lines"></i> إكس أو (Tic Tac Toe)</div>
        <div id="tttBoard" class="ttt-board"></div>
        <div id="tttStatus" class="result-card"></div>
        <button id="tttResetBtn" class="primary">🔄 إعادة اللعبة</button>
    `;

    document.getElementById('tttBackBtn').addEventListener('click', () => window.showMainPage());

    let board = Array(9).fill(null);
    let currentPlayer = 'X';
    let gameActive = true;
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    function renderBoard() {
        const boardDiv = document.getElementById('tttBoard');
        boardDiv.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'ttt-cell';
            cell.textContent = board[i] || '';
            cell.addEventListener('click', () => handleMove(i));
            boardDiv.appendChild(cell);
        }
    }

    function handleMove(index) {
        if (!gameActive || board[index]) return;
        board[index] = currentPlayer;
        renderBoard();

        if (checkWin(currentPlayer)) {
            document.getElementById('tttStatus').innerHTML = `🏆 اللاعب ${currentPlayer} فاز!`;
            gameActive = false;
            return;
        }
        if (board.every(cell => cell !== null)) {
            document.getElementById('tttStatus').innerHTML = `🤝 تعادل!`;
            gameActive = false;
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('tttStatus').innerHTML = `دور اللاعب ${currentPlayer}`;
    }

    function checkWin(player) {
        return winPatterns.some(pattern => pattern.every(idx => board[idx] === player));
    }

    function resetGame() {
        board.fill(null);
        currentPlayer = 'X';
        gameActive = true;
        renderBoard();
        document.getElementById('tttStatus').innerHTML = `دور اللاعب X`;
    }

    document.getElementById('tttResetBtn').addEventListener('click', resetGame);
    resetGame();
}
window.initTicTacToe = initTicTacToe;
