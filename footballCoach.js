function initFootballCoach() {
    const container = document.getElementById('footballCoachGame');
    container.innerHTML = `
        <button class="back-home-btn" onclick="showMainPage()"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title">${lang[currentLang].game_footballCoach}</div>
        <div id="coachScenario" class="result-card">... جاري التحميل ...</div>
        <div id="coachOptions" class="setup-section"></div>
        <div id="coachResult" class="result-card"></div>
        <button id="coachNext" class="primary">سيناريو جديد</button>
    `;
    const scenarios = [
        { text: "فريقك متأخر بهدف، متبقي 10 دقائق. ماذا تفعل؟", options: ["هجوم كامل", "تبديلات دفاعية", "التمسك بالتعادل"], outcomes: ["سجلت هدف التعادل!", "خسرت 1-0", "انتهت 0-0"] },
        { text: "لاعبك الأساسي أصيب في الشوط الأول. ماذا تفعل؟", options: ["إدخال بديل شاب", "تغيير الخطة", "الاستمرار بدون تغيير"], outcomes: ["البديل سجل هدف الفوز!", "الخطة الجديدة أتت بثمارها", "خسرت المباراة"] },
        { text: "الحكم يحتسب ركلة جزاء ضدك. ماذا تفعل؟", options: ["الاحتجاج", "تهدئة اللاعبين", "طلب مراجعة الفيديو"], outcomes: ["تلقيت بطاقة صفراء", "الحارس تصدى للركلة", "ألغيت الركلة"] }
    ];
    let current = 0;

    function loadScenario(index) {
        const s = scenarios[index % scenarios.length];
        document.getElementById('coachScenario').innerHTML = s.text;
        const optsDiv = document.getElementById('coachOptions');
        optsDiv.innerHTML = '';
        s.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'primary';
            btn.innerText = opt;
            btn.onclick = () => {
                document.getElementById('coachResult').innerHTML = s.outcomes[i];
            };
            optsDiv.appendChild(btn);
        });
        document.getElementById('coachResult').innerHTML = '';
    }

    document.getElementById('coachNext').onclick = () => {
        current++;
        loadScenario(current);
    };
    loadScenario(0);
}
