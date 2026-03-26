function initGuessFlag() {
    const container = document.getElementById('guessFlagGame');
    container.innerHTML = `
        <button class="back-home-btn" onclick="showMainPage()"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title">${lang[currentLang].game_guessFlag}</div>
        <div id="flagEmoji" class="result-card" style="font-size:5rem;">🏳️</div>
        <div id="flagOptions" class="flag-options"></div>
        <div id="flagResult" class="result-card"></div>
        <div id="flagScore" class="result-card">النقاط: 0</div>
        <button id="flagNext" class="primary">علم جديد</button>
    `;
    const flags = [
        { emoji: "🇪🇬", name: "مصر" },
        { emoji: "🇸🇦", name: "السعودية" },
        { emoji: "🇺🇸", name: "الولايات المتحدة" },
        { emoji: "🇫🇷", name: "فرنسا" },
        { emoji: "🇩🇪", name: "ألمانيا" },
        { emoji: "🇧🇷", name: "البرازيل" }
    ];
    let current = 0;
    let score = 0;

    function loadFlag() {
        const flag = flags[current];
        document.getElementById('flagEmoji').innerHTML = flag.emoji;
        const optsDiv = document.getElementById('flagOptions');
        optsDiv.innerHTML = '';
        // عرض خيارات عشوائية
        const options = [flag.name];
        while (options.length < 4) {
            const randomFlag = flags[Math.floor(Math.random() * flags.length)].name;
            if (!options.includes(randomFlag)) options.push(randomFlag);
        }
        // خلط
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'flag-btn';
            btn.innerText = opt;
            btn.onclick = () => {
                if (opt === flag.name) {
                    score++;
                    document.getElementById('flagResult').innerHTML = '✅ صحيح!';
                } else {
                    document.getElementById('flagResult').innerHTML = `❌ خطأ! العلم هو ${flag.name}`;
                }
                document.getElementById('flagScore').innerHTML = `النقاط: ${score}`;
                document.querySelectorAll('.flag-btn').forEach(b => b.disabled = true);
            };
            optsDiv.appendChild(btn);
        });
        document.getElementById('flagResult').innerHTML = '';
    }

    document.getElementById('flagNext').onclick = () => {
        current = (current + 1) % flags.length;
        loadFlag();
    };
    loadFlag();
}
