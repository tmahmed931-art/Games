function initSnakesLadders() {
    const container = document.getElementById('snakesladdersGame');
    if (container.innerHTML.trim() !== '') return;

    container.innerHTML = `
        <button class="back-home-btn" id="slBackBtn"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title"><i class="fas fa-chart-line"></i> السلم والثعبان</div>
        <div id="slBoard" class="sl-board"></div>
        <div id="slStatus" class="result-card"></div>
        <button id="slRollBtn" class="primary">🎲 رمي النرد</button>
        <button id="slResetBtn" class="primary">🔄 إعادة اللعبة</button>
    `;

    document.getElementById('slBackBtn').addEventListener('click', () => window.showMainPage());

    const size = 10;
    const cells = 100;
    const snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
    const ladders = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };
    let playerPos = 1;
    let gameActive = true;

    function renderBoard() {
        const boardDiv = document.getElementById('slBoard');
        boardDiv.innerHTML = '';
        for (let i = 1; i <= cells; i++) {
            const cell = document.createElement('div');
            cell.className = 'sl-cell';
            cell.textContent = i;
            if (snakes[i]) cell.style.background = '#e74c3c';
            if (ladders[i]) cell.style.background = '#2ecc71';
            if (i === playerPos) {
                const playerMarker = document.createElement('span');
                playerMarker.className = 'sl-player';
                playerMarker.textContent = '👤';
                cell.appendChild(playerMarker);
            }
            boardDiv.appendChild(cell);
        }
    }

    function rollDice() {
        if (!gameActive) return;
        const dice = Math.floor(Math.random() * 6) + 1;
        let newPos = playerPos + dice;
        if (newPos > cells) {
            document.getElementById('slStatus').innerHTML = `رميت ${dice}، تحتاج إلى رقم أقل للوصول.`;
            return;
        }
        playerPos = newPos;
        if (snakes[playerPos]) {
            playerPos = snakes[playerPos];
            document.getElementById('slStatus').innerHTML = `رميت ${dice}، ثعبان! تهبط إلى ${playerPos}`;
        } else if (ladders[playerPos]) {
            playerPos = ladders[playerPos];
            document.getElementById('slStatus').innerHTML = `رميت ${dice}، سلم! تصعد إلى ${playerPos}`;
        } else {
            document.getElementById('slStatus').innerHTML = `رميت ${dice}، تقدم إلى ${playerPos}`;
        }
        renderBoard();
        if (playerPos === cells) {
            gameActive = false;
            document.getElementById('slStatus').innerHTML = `🎉 لقد فزت! 🎉`;
            document.getElementById('slRollBtn').disabled = true;
        }
    }

    function resetGame() {
        playerPos = 1;
        gameActive = true;
        document.getElementById('slRollBtn').disabled = false;
        renderBoard();
        document.getElementById('slStatus').innerHTML = 'اضغط على زر النرد لبدء اللعبة';
    }

    document.getElementById('slRollBtn').addEventListener('click', rollDice);
    document.getElementById('slResetBtn').addEventListener('click', resetGame);
    renderBoard();
    document.getElementById('slStatus').innerHTML = 'اضغط على زر النرد لبدء اللعبة';
}
window.initSnakesLadders = initSnakesLadders;
