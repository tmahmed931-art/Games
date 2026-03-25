function initDrawGuess() {
    const container = document.getElementById('drawguessGame');
    if (container.innerHTML.trim() !== '') return;

    container.innerHTML = `
        <button class="back-home-btn" id="dgBackBtn"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title"><i class="fas fa-paintbrush"></i> ارسم وخمّن</div>
        
        <!-- Drawing area -->
        <canvas id="drawCanvas" class="draw-canvas" width="400" height="400" style="background:white; border-radius:1rem;"></canvas>
        
        <!-- Color picker and tools -->
        <div class="draw-tools">
            <label>لون الرسم:</label>
            <input type="color" id="drawColor" value="#000000">
            <button id="clearCanvasBtn" class="primary">مسح الرسم</button>
        </div>
        
        <!-- Secret word setup (drawer) -->
        <div class="setup-section">
            <div class="input-group"><label>الكلمة السرية (اختر كلمة)</label><input type="text" id="secretWord" placeholder="أدخل كلمة"></div>
            <button id="setWordBtn" class="primary">تعيين الكلمة</button>
        </div>
        
        <!-- Players management -->
        <div class="players-section">
            <div class="input-group"><label>اسم اللاعب الجديد</label><input type="text" id="newPlayerName" placeholder="اسم اللاعب"></div>
            <button id="addPlayerBtn" class="primary">إضافة لاعب</button>
            <div id="playersList" class="players-list"></div>
            <div id="currentGuesserDisplay" class="current-guesser"></div>
        </div>
        
        <!-- Guessing area -->
        <div id="dgGuess" class="result-card"></div>
        <div class="word-chain-input">
            <input type="text" id="guessInput" placeholder="خمن الكلمة">
            <button id="submitGuessBtn" class="primary">خمّن</button>
        </div>
        <div id="dgFeedback" class="log-area"></div>
    `;

    // Back button
    document.getElementById('dgBackBtn').addEventListener('click', () => window.showMainPage());

    // Canvas drawing setup
    const canvas = document.getElementById('drawCanvas');
    const ctx = canvas.getContext('2d');
    let drawing = false;
    let currentWord = '';
    let currentGuesser = null; // { name, points }
    let players = [];

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    // Color picker
    const colorPicker = document.getElementById('drawColor');
    colorPicker.addEventListener('input', (e) => {
        ctx.strokeStyle = e.target.value;
    });

    // Drawing functions
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

    // Clear canvas
    document.getElementById('clearCanvasBtn').addEventListener('click', () => {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.strokeStyle = colorPicker.value; // restore current color
    });

    // Set secret word
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

    // Player management
    function updatePlayersUI() {
        const playersDiv = document.getElementById('playersList');
        if (!playersDiv) return;
        if (players.length === 0) {
            playersDiv.innerHTML = '<div class="empty-list">لا يوجد لاعبون. أضف لاعباً أولاً.</div>';
            document.getElementById('currentGuesserDisplay').innerHTML = '';
            return;
        }
        let html = '<div class="players-header"><span>اللاعب</span><span>النقاط</span><span></span></div>';
        players.forEach((player, idx) => {
            html += `
                <div class="player-row">
                    <span>${escapeHtml(player.name)}</span>
                    <span>${player.points}</span>
                    <button class="select-player-btn" data-name="${escapeHtml(player.name)}">اختر</button>
                </div>
            `;
        });
        playersDiv.innerHTML = html;

        // Attach select events
        document.querySelectorAll('.select-player-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const name = btn.getAttribute('data-name');
                const player = players.find(p => p.name === name);
                if (player) {
                    currentGuesser = player;
                    document.getElementById('currentGuesserDisplay').innerHTML = `اللاعب الحالي: ${escapeHtml(player.name)} (${player.points} نقطة)`;
                    document.getElementById('dgFeedback').innerHTML = `تم اختيار ${escapeHtml(player.name)} كمخمن.`;
                }
            });
        });
    }

    function addPlayer(name) {
        name = name.trim();
        if (!name) {
            document.getElementById('dgFeedback').innerHTML = 'الرجاء إدخال اسم اللاعب.';
            return false;
        }
        if (players.some(p => p.name === name)) {
            document.getElementById('dgFeedback').innerHTML = 'هذا الاسم موجود مسبقاً.';
            return false;
        }
        players.push({ name, points: 0 });
        updatePlayersUI();
        document.getElementById('newPlayerName').value = '';
        document.getElementById('dgFeedback').innerHTML = `تمت إضافة اللاعب ${escapeHtml(name)}.`;
        return true;
    }

    document.getElementById('addPlayerBtn').addEventListener('click', () => {
        const nameInput = document.getElementById('newPlayerName');
        addPlayer(nameInput.value);
    });

    // Guess submission
    document.getElementById('submitGuessBtn').addEventListener('click', () => {
        const guess = document.getElementById('guessInput').value.trim();
        if (!currentWord) {
            document.getElementById('dgFeedback').innerHTML = 'لم يتم تعيين كلمة بعد!';
            return;
        }
        if (!currentGuesser) {
            document.getElementById('dgFeedback').innerHTML = 'لم يتم اختيار لاعب مخمن! اختر لاعباً من القائمة.';
            return;
        }
        if (guess === currentWord) {
            // Correct guess: award point to current guesser
            currentGuesser.points += 1;
            updatePlayersUI(); // refresh points display
            document.getElementById('dgFeedback').innerHTML = `🎉 إجابة صحيحة! ${escapeHtml(currentGuesser.name)} يحصل على نقطة! 🎉`;
            document.getElementById('dgGuess').innerHTML = `الكلمة كانت: ${currentWord}`;
            // Reset secret word and clear canvas optionally
            currentWord = '';
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = colorPicker.value;
            // Clear secret word input and guess input
            document.getElementById('secretWord').value = '';
            document.getElementById('guessInput').value = '';
            document.getElementById('dgGuess').innerHTML = '';
            // Show current guesser again
            if (currentGuesser) {
                document.getElementById('currentGuesserDisplay').innerHTML = `اللاعب الحالي: ${escapeHtml(currentGuesser.name)} (${currentGuesser.points} نقطة)`;
            }
        } else {
            document.getElementById('dgFeedback').innerHTML = `❌ خطأ! حاول مرة أخرى.`;
        }
    });

    // Helper: escape HTML to prevent XSS
    function escapeHtml(str) {
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function(c) {
            return c;
        });
    }

    // Initial empty players list
    updatePlayersUI();
}

window.initDrawGuess = initDrawGuess;
