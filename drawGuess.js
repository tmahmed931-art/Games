function initDrawGuess() {
    const container = document.getElementById('drawguessGame');
    if (container.innerHTML.trim() !== '') return;

    container.innerHTML = `
        <button class="back-home-btn" id="dgBackBtn"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title"><i class="fas fa-paintbrush"></i> ارسم وخمّن</div>
        <canvas id="drawCanvas" class="draw-canvas" width="400" height="400" style="background:white; border-radius:1rem;"></canvas>
        <div class="setup-section">
            <div class="input-group"><label>الكلمة السرية (اختر كلمة)</label><input type="text" id="secretWord" placeholder="أدخل كلمة"></div>
            <button id="setWordBtn" class="primary">تعيين الكلمة</button>
            <button id="clearCanvasBtn" class="primary">مسح الرسم</button>
        </div>
        <div id="dgGuess" class="result-card"></div>
        <div class="word-chain-input">
            <input type="text" id="guessInput" placeholder="خمن الكلمة">
            <button id="submitGuessBtn" class="primary">خمّن</button>
        </div>
        <div id="dgFeedback" class="log-area"></div>
    `;

    document.getElementById('dgBackBtn').addEventListener('click', () => window.showMainPage());

    const canvas = document.getElementById('drawCanvas');
    const ctx = canvas.getContext('2d');
    let drawing = false;
    let currentWord = '';

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    function startDrawing(e) {
        drawing = true;
        const pos = getMousePos(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    }

    function draw(e) {
        if (!drawing) return;
        const pos = getMousePos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    }

    function stopDrawing() {
        drawing = false;
        ctx.beginPath();
    }

    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        let clientX, clientY;
        if (e.touches) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);

    document.getElementById('clearCanvasBtn').addEventListener('click', () => {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
    });

    document.getElementById('setWordBtn').addEventListener('click', () => {
        const word = document.getElementById('secretWord').value.trim();
        if (word) {
            currentWord = word;
            document.getElementById('dgGuess').innerHTML = `الكلمة السرية: ${word.replace(/./g, '*')}`;
            document.getElementById('dgFeedback').innerHTML = 'تم تعيين الكلمة. ابدأ الرسم!';
            document.getElementById('guessInput').value = '';
        } else {
            document.getElementById('dgFeedback').innerHTML = 'أدخل كلمة أولاً';
        }
    });

    document.getElementById('submitGuessBtn').addEventListener('click', () => {
        const guess = document.getElementById('guessInput').value.trim();
        if (!currentWord) {
            document.getElementById('dgFeedback').innerHTML = 'لم يتم تعيين كلمة بعد!';
            return;
        }
        if (guess === currentWord) {
            document.getElementById('dgFeedback').innerHTML = '🎉 إجابة صحيحة! أحسنت! 🎉';
            document.getElementById('dgGuess').innerHTML = `الكلمة كانت: ${currentWord}`;
            currentWord = '';
        } else {
            document.getElementById('dgFeedback').innerHTML = `❌ خطأ! حاول مرة أخرى.`;
        }
    });
}
window.initDrawGuess = initDrawGuess;
