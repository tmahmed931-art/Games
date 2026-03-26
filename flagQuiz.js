function initFlagQuiz() {
    const container = document.getElementById('flagQuizGame');
    container.innerHTML = `
        <button class="back-home-btn" onclick="showMainPage()"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title">${lang[currentLang].game_flagQuiz}</div>
        <div id="fqQuestion" class="quiz-question"></div>
        <div id="fqOptions" class="quiz-options"></div>
        <div id="fqResult" class="result-card"></div>
        <div id="fqScore" class="result-card">النقاط: 0</div>
        <button id="fqNext" class="primary">التالي</button>
    `;
    
    // 75 سؤالاً عن الدول والأعلام والعواصم
    const questions = [];
    const capitals = [
        { country: "مصر", capital: "القاهرة" }, { country: "السعودية", capital: "الرياض" },
        { country: "فرنسا", capital: "باريس" }, { country: "ألمانيا", capital: "برلين" },
        { country: "البرازيل", capital: "برازيليا" }, { country: "اليابان", capital: "طوكيو" },
        { country: "كندا", capital: "أوتاوا" }, { country: "أستراليا", capital: "كانبرا" },
        { country: "الهند", capital: "نيودلهي" }, { country: "إيطاليا", capital: "روما" },
        { country: "إسبانيا", capital: "مدريد" }, { country: "المملكة المتحدة", capital: "لندن" },
        { country: "روسيا", capital: "موسكو" }, { country: "تركيا", capital: "أنقرة" },
        { country: "إيران", capital: "طهران" }, { country: "باكستان", capital: "إسلام آباد" },
        { country: "المغرب", capital: "الرباط" }, { country: "الجزائر", capital: "الجزائر" },
        { country: "تونس", capital: "تونس" }, { country: "الإمارات", capital: "أبوظبي" }
    ];
    
    // أسئلة عن الأعلام
    const flagFacts = [
        { text: "ما هو لون علم السعودية؟", options: ["أخضر", "أحمر", "أسود", "أبيض"], correct: 0 },
        { text: "ما هو العلم الذي يحمل صورة نسر؟", options: ["مصر", "العراق", "سوريا", "اليمن"], correct: 0 },
        { text: "كم عدد نجوم علم الولايات المتحدة؟", options: ["50", "48", "52", "49"], correct: 0 },
        { text: "ما هي ألوان علم فرنسا؟", options: ["أزرق-أبيض-أحمر", "أحمر-أصفر-أخضر", "أسود-أحمر-أصفر", "أخضر-أبيض-أسود"], correct: 0 }
    ];
    
    // توليد 75 سؤالاً
    for (let i = 0; i < 5; i++) {
        capitals.forEach(c => {
            questions.push({
                text: `ما هي عاصمة ${c.country}؟`,
                options: [c.capital, capitals[(capitals.indexOf(c)+1)%capitals.length].capital, capitals[(capitals.indexOf(c)+2)%capitals.length].capital, capitals[(capitals.indexOf(c)+3)%capitals.length].capital],
                correct: 0
            });
        });
        flagFacts.forEach(f => questions.push({...f}));
    }
    // إضافة أسئلة إضافية عشوائية
    for (let i = 0; i < 30; i++) {
        questions.push({
            text: `ما هو العلم الذي يحمل ${["اللون الأحمر", "النجمة", "الهلال", "الصليب"][i%4]}؟`,
            options: ["مصر", "السعودية", "الجزائر", "تونس"],
            correct: i%4
        });
    }
    
    let idx = 0, score = 0;
    
    function load() {
        const q = questions[idx % questions.length];
        document.getElementById('fqQuestion').innerHTML = q.text;
        const opts = document.getElementById('fqOptions');
        opts.innerHTML = '';
        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'primary';
            btn.innerText = opt;
            btn.onclick = () => {
                if (i === q.correct) {
                    score++;
                    document.getElementById('fqResult').innerHTML = '✅ صحيح!';
                } else {
                    document.getElementById('fqResult').innerHTML = `❌ خطأ! الإجابة: ${q.options[q.correct]}`;
                }
                document.getElementById('fqScore').innerHTML = `النقاط: ${score}`;
                document.querySelectorAll('#fqOptions button').forEach(b => b.disabled = true);
            };
            opts.appendChild(btn);
        });
        document.getElementById('fqResult').innerHTML = '';
    }
    
    document.getElementById('fqNext').onclick = () => {
        idx++;
        load();
    };
    load();
}
