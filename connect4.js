function initConnect4() {
    const container = document.getElementById('connect4Game');
    if (container.innerHTML.trim() !== '') return;

    container.innerHTML = `
        <button class="back-home-btn" id="c4BackBtn"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title"><i class="fas fa-circle-dot"></i> أربع في خط (Connect 4)</div>
        <div id="c4Board" class="c4-board"></div>
        <div id="c4Status" class="result-card"></div>
        <button id="c4ResetBtn" class="primary">🔄 إعادة اللعبة</button>
    `;

    document.getElementById('c4BackBtn').addEventListener('click', () => window.showMainPage());

    const rows = 6;
    const cols = 7;
    let board = Array(rows).fill().map(() => Array(cols).fill(null));
    let currentPlayer = 'red';
    let gameActive = true;

    function renderBoard() {
        const boardDiv = document.getElementById('c4Board');
        boardDiv.innerHTML = '';
        for (let r = 0; r < rows; r++) {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'c4-row';
            for (let c = 0; c < cols; c++) {
                const cell = document.createElement('div');
                cell.className = 'c4-cell';
                if (board[r][c] === 'red') cell.classList.add('red');
                if (board[r][c] === 'yellow') cell.classList.add('yellow');
                cell.addEventListener('click', () => makeMove(c));
                rowDiv.appendChild(cell);
            }
            boardDiv.appendChild(rowDiv);
        }
    }

    function makeMove(col) {
        if (!gameActive) return;
        // Find the lowest empty row in this column
        for (let r = rows - 1; r >= 0; r--) {
            if (board[r][col] === null) {
                board[r][col] = currentPlayer;
                renderBoard();
                if (checkWin(r, col)) {
                    document.getElementById('c4Status').innerHTML = `🏆 اللاعب ${currentPlayer === 'red' ? 'الأحمر' : 'الأصفر'} فاز!`;
                    gameActive = false;
                    return;
                }
                if (isBoardFull()) {
                    document.getElementById('c4Status').innerHTML = `🤝 تعادل!`;
                    gameActive = false;
                    return;
                }
                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
                document.getElementById('c4Status').innerHTML = `دور اللاعب ${currentPlayer === 'red' ? 'الأحمر' : 'الأصفر'}`;
                return;
            }
        }
    }

    function checkWin(row, col) {
        const directions = [[0,1],[1,0],[1,1],[1,-1]];
        for (let [dr, dc] of directions) {
            let count = 1;
            // positive direction
            for (let step = 1; step <= 3; step++) {
                const nr = row + dr * step, nc = col + dc * step;
                if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) break;
                if (board[nr][nc] === currentPlayer) count++;
                else break;
            }
            // negative direction
            for (let step = 1; step <= 3; step++) {
                const nr = row - dr * step, nc = col - dc * step;
                if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) break;
                if (board[nr][nc] === currentPlayer) count++;
                else break;
            }
            if (count >= 4) return true;
        }
        return false;
    }

    function isBoardFull() {
        for (let c = 0; c < cols; c++) {
            if (board[0][c] === null) return false;
        }
        return true;
    }

    function resetGame() {
        board = Array(rows).fill().map(() => Array(cols).fill(null));
        currentPlayer = 'red';
        gameActive = true;
        renderBoard();
        document.getElementById('c4Status').innerHTML = `دور اللاعب الأحمر`;
    }

    document.getElementById('c4ResetBtn').addEventListener('click', resetGame);
    resetGame();
}
window.initConnect4 = initConnect4;
