function initColorMemory() {
    const container = document.getElementById('colormemoryGame');
    if (container.innerHTML.trim() !== '') return;

    // إضافة أنماط CSS محسنة لجعل الألوان أكثر نعومة وجاذبية
    if (!document.getElementById('cm-enhanced-styles')) {
        const style = document.createElement('style');
        style.id = 'cm-enhanced-styles';
        style.textContent = `
            .color-btn {
                transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.1s ease;
                cursor: pointer;
                border-radius: 16px;
                box-shadow: 0 8px 15px rgba(0,0,0,0.2);
            }
            .color-btn:hover {
                transform: scale(1.03);
                box-shadow: 0 12px 20px rgba(0,0,0,0.25);
                filter: brightness(1.02);
            }
            .color-btn.active {
                transform: scale(0.97);
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                filter: brightness(1.2);
                transition: transform 0.05s, filter 0.05s;
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

    // --- مجموعة ألوان أكثر جاذبية ووضوح (8 ألوان نقية) ---
    const colors = [
        '#e74c3c', // أحمر ناصع
        '#2ecc71', // أخضر زمردي
        '#3498db', // أزرق سماوي
        '#f1c40f', // ذهبي
        '#9b59b6', // بنفسجي عميق
        '#1abc9c', // فيروزي
        '#e67e22', // برتقالي
        '#e84393'  // وردي فاقع
    ];
    
    let sequence = [];
    let playerTurn = false;
    let playerIndex = 0;
    let level = 1;
    let gameActive = false;
    let currentInterval = null;      // لتتبع المؤقت وتجنب التداخل
    let highScore = 0;

    // تحميل الرقم القياسي من localStorage
    function loadHighScore() {
        const saved = localStorage.getItem('colorMemoryHighScore');
        if (saved && !isNaN(parseInt(saved))) {
            highScore = parseInt(saved);
        } else {
            highScore = 0;
        }
        document.getElementById('highScoreValue').innerText = highScore;
    }
    loadHighScore();

    // تحديث الرقم القياسي إذا تم كسر الرقم
    function updateHighScore(currentLevel) {
        if (currentLevel > highScore) {
            highScore = currentLevel;
            localStorage.setItem('colorMemoryHighScore', highScore);
            document.getElementById('highScoreValue').innerText = highScore;
            // تأثير بسيط للاحتفال
            const hsDiv = document.getElementById('cmHighScore');
            hsDiv.style.transform = 'scale(1.05)';
            setTimeout(() => { hsDiv.style.transform = ''; }, 300);
        }
    }

    // حساب سرعة ظهور التسلسل حسب المستوى (تزداد مع كل مستوى)
    function getSequenceDelay() {
        let delay = 700 - (level - 1) * 30;   // 700ms في المستوى1، تنقص 30ms لكل مستوى
        return Math.max(250, delay);          // لا تقل عن 250ms للحفاظ على التحدي المناسب
    }

    // عرض التسلسل للمستخدم بسرعة متغيرة
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
                btn.classList.add('active');
                setTimeout(() => btn.classList.remove('active'), 200); // وميض سريع وناعم
            }
            i++;
        }, delay);
    }

    // إضافة لون جديد للتسلسل ورفع المستوى
    function addToSequence() {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        sequence.push(randomColor);
        showSequence();
        document.getElementById('cmStatus').innerHTML = `✨ المستوى ${level} ✨ | السرعة: ${Math.round(1000 / getSequenceDelay())} نت/ث`;
    }

    // معالجة الضغط على الزر الملون
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
            // انتهاء اللعبة بسبب خطأ
            gameActive = false;
            if (currentInterval) {
                clearInterval(currentInterval);
                currentInterval = null;
            }
            const message = `❌ خطأ! انتهت اللعبة. وصلت للمستوى ${level}`;
            document.getElementById('cmMessage').innerHTML = message;
            document.getElementById('cmStatus').innerHTML = `⚠️ انتهت! المستوى ${level} ⚠️`;
            document.getElementById('cmStartBtn').disabled = false;
            
            // تحديث الرقم القياسي (نخزن أعلى مستوى تم الوصول إليه حتى لو فشل)
            updateHighScore(level);
        }
    }

    // بدء لعبة جديدة
    function startGame() {
        // إيقاف أي مؤتمر جاري لتجنب التداخل
        if (currentInterval) {
            clearInterval(currentInterval);
            currentInterval = null;
        }
        // إعادة ضبط المتغيرات
        sequence = [];
        level = 1;
        gameActive = true;
        playerTurn = false;
        playerIndex = 0;
        
        document.getElementById('cmMessage').innerHTML = '🎮 جاري تحضير التسلسل...';
        document.getElementById('cmStartBtn').disabled = true;
        
        // بدء أول تسلسل
        addToSequence();
    }

    // بناء الأزرار الملونة (مع تحسينات بصرية)
    function buildButtons() {
        const seqDiv = document.getElementById('cmSequence');
        seqDiv.innerHTML = '';
        colors.forEach(color => {
            const btn = document.createElement('div');
            btn.className = 'color-btn';
            btn.style.backgroundColor = color;
            btn.setAttribute('data-color', color);
            btn.setAttribute('aria-label', `لون ${color}`);
            btn.addEventListener('click', () => handleColorClick(color));
            seqDiv.appendChild(btn);
        });
    }

    document.getElementById('cmStartBtn').addEventListener('click', startGame);
    buildButtons();
}
window.initColorMemory = initColorMemory;
