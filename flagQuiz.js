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
    const questions = [
        { text: "ما هي عاصمة كندا؟", options: ["تورونتو", "أوتاوا", "فانكوفر", "مونتريال"], correct: 1 },
        { text: "أي دولة يقع برج إيفل فيها؟", options: ["إيطاليا", "إسبانيا", "فرنسا", "ألمانيا"], correct: 2 },
        { text: "ما هي عملة اليابان؟", options: ["وون", "يوان", "دولار", "ين"], correct: 3 },
        { text: "أي دولة تتميز بعلم أحمر وأبيض وأسود مع نسر؟", options: ["مصر", "العراق", "سوريا", "اليمن"], correct: 0 }
    ];
    let idx = 0, score = 0;

    function load() {
        const q = questions[idx];
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
        idx = (idx + 1) % questions.length;
        load();
    };
    load();
}
