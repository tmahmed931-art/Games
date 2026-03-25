function initColorMemory() {
    const container = document.getElementById('colormemoryGame');
    if (container.innerHTML.trim() !== '') return;

    // أنماط CSS محسنة مع تأثير ضغط واضح
    if (!document.getElementById('cm-enhanced-styles')) {
        const style = document.createElement('style');
        style.id = 'cm-enhanced-styles';
        style.textContent = `
            .color-btn {
                transition: transform 0.08s ease, box-shadow 0.08s ease, filter 0.08s ease;
                cursor: pointer;
                border-radius: 20px;
                box-shadow: 0 8px 15px rgba(0,0,0,0.2);
            }
            .color-btn:hover {
                transform: scale(1.02);
                filter: brightness(1.02);
            }
            /* تأثير الضغط القوي - واضح جداً */
            .color-btn.active {
                transform: scale(0.92) !important;
                box-shadow: 0 0 0 3px white, 0 0 0 6px rgba(255,255,255,0.5), 0 4px 8px rgba(0,0,0,0.2) !important;
                filter: brightness(0.85) !important;
                transition: transform 0.05s, box-shadow 0.05s, filter 0.05s;
            }
            #cmSequence {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 18px;
                margin: 25px 0;
            }
            .color-btn {
                width: 85px;
                height: 85px;
                border-radius: 20px;
            }
            .high-score {
                background: rgba(0,0,0,0.6);
                backdrop-filter: blur(4px);
                display: inline-block;
                padding: 8px 18px;
                border-radius: 40px;
                font-weight: bold;
                margin: 10px auto;
                font-size: 1.1rem;
                color: #ffd966;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            }
            .panel-title i, .high-score i {
                margin-left: 8px;
                margin-right: 8px;
            }
            .result-card {
                background: #1e2a3a;
                color: #f0f0f0;
                border-radius: 60px;
                padding: 10px 20px;
                font-weight: bold;
            }
            .log-area {
                background: #2c3e50;
                color: #ecf0f1;
                border-radius: 28px;
                padding: 8px 15px;
                font-size: 1rem;
            }
            @media (max-width: 550px) {
                .color-btn { width: 70px; height: 70px; }
            }
        `;
        document.head.appendChild(style);
    }

    container.innerHTML = `
        <button class="back-home-btn" id="cmBackBtn"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title"><i class="fas fa-palette"></i> تحدى الذاكرة بالألوان</div>
        <div id="cmHighScore" class="high-score"><i class="fas fa-trophy"></i> الرقم القياسي: <span id="highScoreValue">0</span></div>
        <div id="cmStatus" class="result-card">اضغط "ابدأ"</div>
        <div id="cmSequence" class="color-sequence"></div>
        <div id="cmMessage" class="log-area"></div>
        <button id="cmStartBtn" class="primary">ابدأ</button>
    `;

    document.getElementById('cmBackBtn').addEventListener('click', () => window.showMainPage());

    // مجموعة ألوان أكثر جاذبية (8 ألوان)
    const colors = [
        '#e74c3c', '#2ecc71', '#3498db', '#f1c40f',
        '#9b59b6', '#1abc9c', '#e67e22', '#e84393'
    ];
    
    let sequence = [];
    let playerTurn = false;
    let playerIndex = 0;
    let level = 1;
    let gameActive = false;
    let currentInterval = null;
    let highScore = 0;

    // تحميل الرقم القياسي
    function loadHighScore() {
        const saved = localStorage.getItem('colorMemoryHighScore');
        highScore = saved && !isNaN(parseInt(saved)) ? parseInt(saved) : 0;
        document.getElementById('highScoreValue').innerText = highScore;
    }
    loadHighScore();

    function updateHighScore(currentLevel) {
        if (currentLevel > highScore) {
            highScore = currentLevel;
            localStorage.setItem('colorMemoryHighScore', highScore);
            document.getElementById('highScoreValue').innerText = highScore;
            const hsDiv = document.getElementById('cmHighScore');
            hsDiv.style.transform = 'scale(1.05)';
            setTimeout(() => { hsDiv.style.transform = ''; }, 300);
        }
    }

    function getSequenceDelay() {
        let delay = 700 - (level - 1) * 30;
        return Math.max(250, delay);
    }

    // إضافة تأثير ضغط فوري للزر عند النقر (لرد فعل واضح)
    function flashButton(btn) {
        if (!btn) return;
        btn.classList.add('active');
        setTimeout(() => {
            btn.classList.remove('active');
        }, 150);
    }

    function showSequence() {
        if (currentInterval) {
            clearInterval(currentInterval);
            currentInterval = null;
        }
        playerTurn = false;
        let i = 0;
        const delay = getSequenceDelay();
        
        currentInterval = setInterval(() => {
            if (i >= sequence.length) {
                clearInterval(currentInterval);
                currentInterval = null;
                playerTurn = true;
                document.getElementById('cmMessage').innerHTML = '🎯 دورك: اضغط على الألوان بنفس الترتيب';
                playerIndex = 0;
                return;
            }
            const btn = document.querySelector(`.color-btn[data-color="${sequence[i]}"]`);
            if (btn) {
                // تأثير واضح جداً عند ظهور اللون في التسلسل
                btn.classList.add('active');
                setTimeout(() => btn.classList.remove('active'), 200);
            }
            i++;
        }, delay);
    }

    function addToSequence() {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        sequence.push(randomColor);
        showSequence();
        document.getElementById('cmStatus').innerHTML = `✨ المستوى ${level} ✨ | السرعة: ${Math.round(1000 / getSequenceDelay())} نت/ث`;
    }

    function handleColorClick(color) {
        if (!playerTurn || !gameActive) return;
        
        // إضافة تأثير الضغط الفوري على الزر الذي تم النقر عليه
        const clickedBtn = document.querySelector(`.color-btn[data-color="${color}"]`);
        flashButton(clickedBtn);
        
        if (color === sequence[playerIndex]) {
            playerIndex++;
            if (playerIndex === sequence.length) {
                playerTurn = false;
                level++;
                addToSequence();
            }
        } else {
            gameActive = false;
            if (currentInterval) {
                clearInterval(currentInterval);
                currentInterval = null;
            }
            document.getElementById('cmMessage').innerHTML = `❌ خطأ! انتهت اللعبة. وصلت للمستوى ${level}`;
            document.getElementById('cmStatus').innerHTML = `⚠️ انتهت! المستوى ${level} ⚠️`;
            document.getElementById('cmStartBtn').disabled = false;
            updateHighScore(level);
        }
    }

    function startGame() {
        if (currentInterval) {
            clearInterval(currentInterval);
            currentInterval = null;
        }
        sequence = [];
        level = 1;
        gameActive = true;
        playerTurn = false;
        playerIndex = 0;
        document.getElementById('cmMessage').innerHTML = '🎮 جاري تحضير التسلسل...';
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
