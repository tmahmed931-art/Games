function initSpeedClick() {
    const container = document.getElementById('speedclickGame');
    if (container.innerHTML.trim() !== '') return;

    container.innerHTML = `
        <button class="back-home-btn" id="scBackBtn"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title"><i class="fas fa-tachometer-alt"></i> تحدى السرعة</div>
        <div id="scTarget" class="speed-target">🎯</div>
        <div id="scScore" class="result-card">النقاط: 0</div>
        <div id="scTimer" class="log-area">الوقت: 30 ثانية</div>
        <button id="scStartBtn" class="primary">ابدأ</button>
    `;

    document.getElementById('scBackBtn').addEventListener('click', () => window.showMainPage());

    let score = 0;
    let timeLeft = 30;
    let gameActive = false;
    let timerInterval = null;
    let targetInterval = null;

    function updateUI() {
        document.getElementById('scScore').innerHTML = `النقاط: ${score}`;
        document.getElementById('scTimer').innerHTML = `الوقت: ${timeLeft} ثانية`;
    }

    function moveTarget() {
        if (!gameActive) return;
        const target = document.getElementById('scTarget');
        const containerRect = target.parentElement.getBoundingClientRect();
        const maxX = containerRect.width - target.offsetWidth - 20;
        const maxY = containerRect.height - target.offsetHeight - 100;
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        target.style.position = 'relative';
        target.style.left = `${x}px`;
        target.style.top = `${y}px`;
    }

    function startGame() {
        if (timerInterval) clearInterval(timerInterval);
        if (targetInterval) clearInterval(targetInterval);
        score = 0;
        timeLeft = 30;
        gameActive = true;
        updateUI();
        document.getElementById('scStartBtn').disabled = true;
        document.getElementById('scTarget').style.display = 'flex';
        moveTarget();

        timerInterval = setInterval(() => {
            if (!gameActive) return;
            timeLeft--;
            updateUI();
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                clearInterval(targetInterval);
                gameActive = false;
                document.getElementById('scStartBtn').disabled = false;
                document.getElementById('scTarget').style.display = 'none';
                document.getElementById('scTimer').innerHTML = 'انتهى الوقت! اضغط ابدأ للعب مرة أخرى';
            }
        }, 1000);

        targetInterval = setInterval(() => {
            if (gameActive) moveTarget();
        }, 800);
    }

    document.getElementById('scTarget').addEventListener('click', () => {
        if (!gameActive) return;
        score++;
        updateUI();
        moveTarget();
    });

    document.getElementById('scStartBtn').addEventListener('click', startGame);
    document.getElementById('scTarget').style.display = 'none';
}
window.initSpeedClick = initSpeedClick;
