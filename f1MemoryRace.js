function initF1MemoryRace() {
    const container = document.getElementById('f1MemoryRaceGame');
    container.innerHTML = `
        <button class="back-home-btn" onclick="showMainPage()"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title">${lang[currentLang].game_f1MemoryRace}</div>
        <div id="memSequence" class="result-card"></div>
        <div id="memInput" class="setup-section"></div>
        <div id="memResult" class="result-card"></div>
        <button id="memStart" class="primary">ابدأ</button>
    `;
    let sequence = [];
    let userInput = [];
    let level = 1;

    function generateSequence() {
        const turns = ['← يسار', '→ يمين', '↑ مستقيم'];
        sequence = [];
        for (let i = 0; i < level + 2; i++) {
            sequence.push(turns[Math.floor(Math.random() * 3)]);
        }
    }

    function showSequence() {
        const seqDiv = document.getElementById('memSequence');
        seqDiv.innerHTML = 'تذكر التسلسل:';
        let i = 0;
        const interval = setInterval(() => {
            if (i >= sequence.length) {
                clearInterval(interval);
                seqDiv.innerHTML = 'الآن قم بإعادة التسلسل بالضغط على الأزرار.';
                enableButtons();
                return;
            }
            seqDiv.innerHTML = `تذكر: ${sequence[i]}`;
            i++;
        }, 1000);
    }

    function enableButtons() {
        const inputDiv = document.getElementById('memInput');
        inputDiv.innerHTML = '';
        const turns = ['← يسار', '→ يمين', '↑ مستقيم'];
        turns.forEach(turn => {
            const btn = document.createElement('button');
            btn.className = 'primary';
            btn.innerText = turn;
            btn.onclick = () => {
                userInput.push(turn);
                if (userInput.length === sequence.length) {
                    checkInput();
                } else {
                    document.getElementById('memResult').innerHTML = `أدخل ${sequence.length - userInput.length} حركات متبقية.`;
                }
            };
            inputDiv.appendChild(btn);
        });
    }

    function checkInput() {
        let correct = true;
        for (let i = 0; i < sequence.length; i++) {
            if (sequence[i] !== userInput[i]) {
                correct = false;
                break;
            }
        }
        if (correct) {
            level++;
            document.getElementById('memResult').innerHTML = `✅ صحيح! المستوى ${level}`;
            resetGame();
        } else {
            document.getElementById('memResult').innerHTML = `❌ خطأ! التسلسل كان: ${sequence.join(' - ')}. انتهت اللعبة.`;
            document.getElementById('memStart').disabled = false;
            document.getElementById('memInput').innerHTML = '';
        }
    }

    function resetGame() {
        userInput = [];
        generateSequence();
        showSequence();
    }

    document.getElementById('memStart').onclick = () => {
        level = 1;
        userInput = [];
        generateSequence();
        showSequence();
        document.getElementById('memStart').disabled = true;
        document.getElementById('memResult').innerHTML = '';
    };
}
