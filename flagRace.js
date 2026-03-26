function initFlagRace() {
    const container = document.getElementById('flagRaceGame');
    container.innerHTML = `
        <button class="back-home-btn" onclick="showMainPage()"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title">${lang[currentLang].game_flagRace}</div>
        <div id="raceTarget" class="result-card" style="font-size:3rem;">🎯 اضغط على العلم المطلوب</div>
        <div id="raceFlags" class="flag-options"></div>
        <div id="raceScore" class="result-card">النقاط: 0 | الوقت: 0</div>
        <button id="raceStart" class="primary">ابدأ السباق</button>
    `;
    const flags = [
        { emoji: "🇪🇬", name: "مصر" },
        { emoji: "🇸🇦", name: "السعودية" },
        { emoji: "🇺🇸", name: "الولايات المتحدة" },
        { emoji: "🇫🇷", name: "فرنسا" },
        { emoji: "🇩🇪", name: "ألمانيا" },
        { emoji: "🇧🇷", name: "البرازيل" }
    ];
    let active = false;
    let score = 0;
    let timeLeft = 30;
    let timerInterval;
    let currentTarget;

    function getRandomFlag() {
        return flags[Math.floor(Math.random() * flags.length)];
    }

    function updateTarget() {
        currentTarget = getRandomFlag();
        document.getElementById('raceTarget').innerHTML = `اضغط على علم ${currentTarget.name}`;
    }

    function generateButtons() {
        const containerDiv = document.getElementById('raceFlags');
        containerDiv.innerHTML = '';
        // عرض 4 أعلام عشوائية، أحدها هو الهدف
        const options = [currentTarget];
        while (options.length < 4) {
            const rand = getRandomFlag();
            if (!options.some(f => f.name === rand.name)) options.push(rand);
        }
        // خلط
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        options.forEach(flag => {
            const btn = document.createElement('button');
            btn.className = 'flag-btn';
            btn.innerHTML = `${flag.emoji} ${flag.name}`;
            btn.onclick = () => {
                if (!active) return;
                if (flag.name === currentTarget.name) {
                    score++;
                    document.getElementById('raceScore').innerHTML = `النقاط: ${score} | الوقت: ${timeLeft}`;
                    updateTarget();
                    generateButtons();
                } else {
                    // خطأ: خصم نقطة
                    score = Math.max(0, score - 1);
                    document.getElementById('raceScore').innerHTML = `النقاط: ${score} | الوقت: ${timeLeft}`;
                }
            };
            containerDiv.appendChild(btn);
        });
    }

    function startRace() {
        if (timerInterval) clearInterval(timerInterval);
        active = true;
        score = 0;
        timeLeft = 30;
        document.getElementById('raceScore').innerHTML = `النقاط: 0 | الوقت: 30`;
        updateTarget();
        generateButtons();
        timerInterval = setInterval(() => {
            if (!active) return;
            timeLeft--;
            document.getElementById('raceScore').innerHTML = `النقاط: ${score} | الوقت: ${timeLeft}`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                active = false;
                document.getElementById('raceTarget').innerHTML = `انتهى الوقت! نقاطك: ${score}`;
                document.getElementById('raceFlags').innerHTML = '';
            }
        }, 1000);
    }

    document.getElementById('raceStart').onclick = startRace;
}
