function initF1TimeTrial() {
    const container = document.getElementById('f1TimeTrialGame');
    container.innerHTML = `
        <button class="back-home-btn" onclick="showMainPage()"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title">${lang[currentLang].game_f1TimeTrial}</div>
        <div id="f1ttStatus" class="result-card">اضغط على زر "انطلق" لبدء اللفة</div>
        <div class="f1-track" id="f1ttTrack"></div>
        <button id="f1ttStart" class="primary">انطلق</button>
        <div id="f1ttTime" class="result-card">الزمن: --:--</div>
    `;
    let startTime = null;
    let interval = null;
    let active = false;
    const trackDiv = document.getElementById('f1ttTrack');
    const timeDiv = document.getElementById('f1ttTime');
    const statusDiv = document.getElementById('f1ttStatus');
    const startBtn = document.getElementById('f1ttStart');

    function generateTrack() {
        trackDiv.innerHTML = '';
        const turns = ['يسار', 'يمين', 'مستقيم', 'يسار', 'يمين', 'يمين', 'مستقيم', 'يسار'];
        turns.forEach((turn, idx) => {
            const div = document.createElement('div');
            div.className = 'f1-turn';
            div.innerText = turn;
            div.setAttribute('data-turn', turn);
            trackDiv.appendChild(div);
        });
    }

    function startLap() {
        if (interval) clearInterval(interval);
        active = true;
        startTime = Date.now();
        interval = setInterval(() => {
            if (!active) return;
            const elapsed = (Date.now() - startTime) / 1000;
            timeDiv.innerHTML = `الزمن: ${elapsed.toFixed(2)} ثانية`;
        }, 100);
        statusDiv.innerHTML = 'قم بالنقر على المنعطفات بالترتيب الصحيح!';
        let currentTurn = 0;
        const turns = document.querySelectorAll('.f1-turn');
        turns.forEach((turn, idx) => {
            turn.style.cursor = 'pointer';
            turn.onclick = () => {
                if (!active) return;
                if (idx === currentTurn) {
                    currentTurn++;
                    turn.style.background = '#4caf50';
                    if (currentTurn === turns.length) {
                        active = false;
                        clearInterval(interval);
                        const finalTime = ((Date.now() - startTime) / 1000).toFixed(2);
                        statusDiv.innerHTML = `أكملت اللفة! الزمن: ${finalTime} ثانية`;
                        timeDiv.innerHTML = `الزمن: ${finalTime}`;
                    }
                } else {
                    statusDiv.innerHTML = 'خطأ! ترتيب خاطئ. ابدأ من جديد.';
                    active = false;
                    clearInterval(interval);
                }
            };
        });
    }

    startBtn.onclick = () => {
        generateTrack();
        startLap();
    };
    generateTrack();
}
