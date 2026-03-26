function initGamerQuiz() {
    const container = document.getElementById('gamerQuizGame');
    container.innerHTML = `
        <button class="back-home-btn" onclick="showMainPage()"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title">${lang[currentLang].game_gamerQuiz}</div>
        <div id="gqQuestion" class="quiz-question"></div>
        <div id="gqOptions" class="quiz-options"></div>
        <div id="gqResult" class="result-card"></div>
        <div id="gqScore" class="result-card">النقاط: 0</div>
        <button id="gqNext" class="primary">التالي</button>
    `;
    
    const questions = [];
    const real = [
        { text: "ما اسم بطل سلسلة 'ذا ليجند أوف زيلدا'؟", options: ["لينك", "زيلدا", "غانون", "ميدنا"], correct: 0 },
        { text: "أي لعبة من هذه أطلقتها شركة 'موجانغ'؟", options: ["ماين كرافت", "فورتنايت", "بوبجي", "أوفرواتش"], correct: 0 },
        { text: "من هو مبتكر سلسلة 'ميتال غير سوليد'؟", options: ["هيديو كوجيما", "شيجيرو مياموتو", "يوكي ناكامورا", "تيتسويا نومورا"], correct: 0 },
        { text: "أي لعبة شهيرة تحمل شعار 'القتال الملكي'؟", options: ["فورتنايت", "ذا ويتشر", "سكايرم", "جتا"], correct: 0 },
        { text: "ما هي الشخصية الرئيسية في لعبة 'سوبر ماريو'؟", options: ["لويجي", "بيتش", "ماريو", "باوزر"], correct: 2 },
        { text: "من هو بطل لعبة 'غود أوف وور'؟", options: ["كراتوس", "زيوس", "آثينا", "هيرميس"], correct: 0 },
        { text: "في أي عام صدرت لعبة 'بوكيمون جو'؟", options: ["2015", "2016", "2017", "2018"], correct: 1 },
    ];
    for (let i = 0; i < 12; i++) {
        real.forEach(q => questions.push({...q}));
    }
    const games = ["فورتنايت", "ماين كرافت", "ببجي", "كول أوف ديوتي", "فيفا", "جتا", "ريد ديد"];
    for (let i = 0; i < 30; i++) {
        questions.push({
            text: `ما هي اللعبة التي صدرت عام ${2000 + i%22}؟`,
            options: [games[i%7], games[(i+1)%7], games[(i+2)%7], games[(i+3)%7]],
            correct: i%2
        });
    }
    
    let idx = 0, score = 0;
    
    function load() {
        const q = questions[idx % questions.length];
        document.getElementById('gqQuestion').innerHTML = q.text;
        const opts = document.getElementById('gqOptions');
        opts.innerHTML = '';
        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'primary';
            btn.innerText = opt;
            btn.onclick = () => {
                if (i === q.correct) {
                    score++;
                    document.getElementById('gqResult').innerHTML = '✅ صحيح!';
                } else {
                    document.getElementById('gqResult').innerHTML = `❌ خطأ! الإجابة: ${q.options[q.correct]}`;
                }
                document.getElementById('gqScore').innerHTML = `النقاط: ${score}`;
                document.querySelectorAll('#gqOptions button').forEach(b => b.disabled = true);
            };
            opts.appendChild(btn);
        });
        document.getElementById('gqResult').innerHTML = '';
    }
    
    document.getElementById('gqNext').onclick = () => {
        idx++;
        load();
    };
    load();
}
