function initSnakesLadders() {
    const container = document.getElementById('snakesladdersGame');
    if (container.innerHTML.trim() !== '') return;

    container.innerHTML = `
        <button class="back-home-btn" id="slBackBtn"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title"><i class="fas fa-chart-line"></i> السلم والثعبان</div>
        <div class="setup-section">
            <div class="input-group"><label>عدد اللاعبين</label><input type="number" id="slPlayersCount" min="2" max="4" value="2"></div>
            <button id="slSetPlayersBtn" class="primary">تأكيد</button>
        </div>
        <div id="slBoard" class="sl-board"></div>
        <div id="slStatus" class="result-card"></div>
        <button id="slRollBtn" class="primary">🎲 رمي النرد</button>
        <button id="slResetBtn" class="primary">🔄 إعادة اللعبة</button>
    `;

    document.getElementById('slBackBtn').addEventListener('click', () => window.showMainPage());

    const cells = 100;
    const snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
    const ladders = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };
    
    let players = [];
    let currentPlayer = 0;
    let gameActive = true;
    let playersCount = 2;

    function initPlayers(count) {
        players = [];
        for (let i = 0; i < count; i++) {
            players.push({ name: `لاعب ${i+1}`, position: 1 });
        }
        currentPlayer = 0;
        gameActive = true;
        document.getElementById('slRollBtn').disabled = false;
        renderBoard();
        updateStatus();
    }

    function renderBoard() {
        const boardDiv = document.getElementById('slBoard');
        boardDiv.innerHTML = '';
        for (let i = 1; i <= cells; i++) {
            const cell = document.createElement('div');
            cell.className = 'sl-cell';
            cell.textContent = i;
            if (snakes[i]) cell.style.background = '#e74c3c';
            if (ladders[i]) cell.style.background = '#2ecc71';
            const playersHere = players.filter(p => p.position === i);
            if (playersHere.length) {
                const marker = document.createElement('span');
                marker.className = 'sl-player';
                marker.textContent = playersHere.map((_, idx) => `👤${idx+1}`).join('');
                cell.appendChild(marker);
            }
            boardDiv.appendChild(cell);
        }
    }

    function updateStatus() {
        document.getElementById('slStatus').innerHTML = `دور اللاعب ${players[currentPlayer].name}`;
    }

    function rollDice() {
        if (!gameActive) return;
        const dice = Math.floor(Math.random() * 6) + 1;
        let newPos = players[currentPlayer].position + dice;
        if (newPos > cells) {
            document.getElementById('slStatus').innerHTML = `${players[currentPlayer].name} رمى ${dice}، تحتاج إلى رقم أقل للوصول.`;
            nextPlayer();
            return;
        }
        players[currentPlayer].position = newPos;
        if (snakes[players[currentPlayer].position]) {
            players[currentPlayer].position = snakes[players[currentPlayer].position];
            document.getElementById('slStatus').innerHTML = `${players[currentPlayer].name} رمى ${dice}، ثعبان! تهبط إلى ${players[currentPlayer].position}`;
        } else if (ladders[players[currentPlayer].position]) {
            players[currentPlayer].position = ladders[players[currentPlayer].position];
            document.getElementById('slStatus').innerHTML = `${players[currentPlayer].name} رمى ${dice}، سلم! تصعد إلى ${players[currentPlayer].position}`;
        } else {
            document.getElementById('slStatus').innerHTML = `${players[currentPlayer].name} رمى ${dice}، تقدم إلى ${players[currentPlayer].position}`;
        }
        renderBoard();
        if (players[currentPlayer].position === cells) {
            gameActive = false;
            document.getElementById('slStatus').innerHTML = `🎉 ${players[currentPlayer].name} فاز! 🎉`;
            document.getElementById('slRollBtn').disabled = true;
            return;
        }
        nextPlayer();
    }

    function nextPlayer() {
        currentPlayer = (currentPlayer + 1) % players.length;
        updateStatus();
    }

    function resetGame() {
        initPlayers(playersCount);
    }

    function setPlayers() {
        const count = parseInt(document.getElementById('slPlayersCount').value);
        if (count >= 2 && count <= 4) {
            playersCount = count;
            initPlayers(playersCount);
        } else {
            alert('عدد اللاعبين يجب أن يكون بين 2 و 4');
        }
    }

    document.getElementById('slSetPlayersBtn').addEventListener('click', setPlayers);
    document.getElementById('slRollBtn').addEventListener('click', rollDice);
    document.getElementById('slResetBtn').addEventListener('click', resetGame);
    
    initPlayers(playersCount);
}
window.initSnakesLadders = initSnakesLadders;
