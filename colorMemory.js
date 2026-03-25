function initColorMemory() {
    const container = document.getElementById('colormemoryGame');
    if (container.innerHTML.trim() !== '') return;

    container.innerHTML = `
        <button class="back-home-btn" id="cmBackBtn"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title"><i class="fas fa-palette"></i> تحدى الذاكرة بالألوان</div>
        <div id="cmStatus" class="result-card">اضغط "ابدأ"</div>
        <div id="cmSequence" class="color-sequence"></div>
        <div id="cmMessage" class="log-area"></div>
        <button id="cmStartBtn" class="primary">ابدأ</button>
    `;

    document.getElementById('cmBackBtn').addEventListener('click', () => window.showMainPage());

    const colors = ['#e74c3c', '#2ecc71', '#3498db', '#f1c40f'];
    let sequence = [];
    let playerTurn = false;
    let playerIndex = 0;
    let level = 1;
    let gameActive = false;

    function showSequence() {
        playerTurn = false;
        let i = 0;
        const interval = setInterval(() => {
            if (i >= sequence.length) {
                clearInterval(interval);
                playerTurn = true;
                document.getElementById('cmMessage').innerHTML = 'دورك: اضغط على الألوان بنفس الترتيب';
                playerIndex = 0;
                return;
            }
            const btn = document.querySelector(`.color-btn[data-color="${sequence[i]}"]`);
            btn.classList.add('active');
            setTimeout(() => btn.classList.remove('active'), 300);
            i++;
        }, 700);
    }

    function addToSequence() {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        sequence.push(randomColor);
        showSequence();
        document.getElementById('cmStatus').innerHTML = `المستوى ${level}`;
    }

    function handleColorClick(color) {
        if (!playerTurn || !gameActive) return;
        if (color === sequence[playerIndex]) {
            playerIndex++;
            if (playerIndex === sequence.length) {
                playerTurn = false;
                level++;
                addToSequence();
            }
        } else {
            gameActive = false;
            document.getElementById('cmMessage').innerHTML = `خطأ! انتهت اللعبة. وصلت للمستوى ${level}`;
            document.getElementById('cmStatus').innerHTML = `انتهت! المستوى ${level}`;
            document.getElementById('cmStartBtn').disabled = false;
        }
    }

    function startGame() {
        sequence = [];
        level = 1;
        gameActive = true;
        playerTurn = false;
        document.getElementById('cmMessage').innerHTML = '';
        document.getElementById('cmStartBtn').disabled = true;
        addToSequence();
    }

    function buildButtons() {
        const seqDiv = document.getElementById('cmSequence');
        seqDiv.innerHTML = '';
        colors.forEach(color => {
            const btn = document.createElement('div');
            btn.className = 'color-btn';
            btn.style.backgroundColor = color;
            btn.setAttribute('data-color', color);
            btn.addEventListener('click', () => handleColorClick(color));
            seqDiv.appendChild(btn);
        });
    }

    document.getElementById('cmStartBtn').addEventListener('click', startGame);
    buildButtons();
}
window.initColorMemory = initColorMemory;
