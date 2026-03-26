function initMatchCapitals() {
    const container = document.getElementById('matchCapitalsGame');
    container.innerHTML = `
        <button class="back-home-btn" onclick="showMainPage()"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title">${lang[currentLang].game_matchCapitals}</div>
        <div id="capitalQuestion" class="result-card">ما هي عاصمة ...؟</div>
        <div id="capitalOptions" class="flag-options"></div>
        <div id="capitalResult" class="result-card"></div>
        <div id="capitalScore" class="result-card">النقاط: 0</div>
        <button id="capitalNext" class="primary">سؤال جديد</button>
    `;
    const capitals = [
        { country: "مصر", capital: "القاهرة" },
        { country: "السعودية", capital: "الرياض" },
        { country: "فرنسا", capital: "باريس" },
        { country: "ألمانيا", capital: "برلين" },
        { country: "البرازيل", capital: "برازيليا" },
        { country: "اليابان", capital: "طوكيو" }
    ];
    let current = 0;
    let score = 0;

    function load() {
        const item = capitals[current];
        document.getElementById('capitalQuestion').innerHTML = `ما هي عاصمة ${item.country}؟`;
        const optsDiv = document.getElementById('capitalOptions');
        optsDiv.innerHTML = '';
        const options = [item.capital];
        while (options.length < 4) {
            const rand = capitals[Math.floor(Math.random() * capitals.length)].capital;
            if (!options.includes(rand)) options.push(rand);
        }
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'flag-btn';
            btn.innerText = opt;
            btn.onclick = () => {
                if (opt === item.capital) {
                    score++;
                    document.getElementById('capitalResult').innerHTML = '✅ صحيح!';
                } else {
                    document.getElementById('capitalResult').innerHTML = `❌ خطأ! العاصمة هي ${item.capital}`;
                }
                document.getElementById('capitalScore').innerHTML = `النقاط: ${score}`;
                document.querySelectorAll('#capitalOptions button').forEach(b => b.disabled = true);
            };
            optsDiv.appendChild(btn);
        });
        document.getElementById('capitalResult').innerHTML = '';
    }

    document.getElementById('capitalNext').onclick = () => {
        current = (current + 1) % capitals.length;
        load();
    };
    load();
}
