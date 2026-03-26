function initFootballQuiz() {
    const container = document.getElementById('footballQuizGame');
    container.innerHTML = `
        <button class="back-home-btn" onclick="showMainPage()"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title">${lang[currentLang].game_footballQuiz}</div>
        <div id="quizQuestion" class="quiz-question"></div>
        <div id="quizOptions" class="quiz-options"></div>
        <div id="quizResult" class="result-card"></div>
        <div id="quizScore" class="result-card">النقاط: 0</div>
        <button id="quizNext" class="primary">السؤال التالي</button>
    `;
    const questions = [
        { text: "من فاز بكأس العالم 2018؟", options: ["ألمانيا", "فرنسا", "البرازيل", "الأرجنتين"], correct: 1 },
        { text: "ما هو النادي الذي لعب له ليونيل ميسي معظم مسيرته؟", options: ["ريال مدريد", "برشلونة", "مانشستر سيتي", "باريس سان جيرمان"], correct: 1 },
        { text: "من هو الهداف التاريخي للدوري الإنجليزي الممتاز؟", options: ["واين روني", "آلان شيرر", "سيرجيو أغويرو", "هاري كين"], correct: 1 },
        { text: "أي دولة فازت بأول كأس عالم؟", options: ["البرازيل", "الأوروغواي", "إيطاليا", "الأرجنتين"], correct: 1 }
    ];
    let currentIndex = 0;
    let score = 0;

    function loadQuestion() {
        const q = questions[currentIndex];
        document.getElementById('quizQuestion').innerHTML = q.text;
        const optsDiv = document.getElementById('quizOptions');
        optsDiv.innerHTML = '';
        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'primary';
            btn.innerText = opt;
            btn.onclick = () => {
                if (idx === q.correct) {
                    score++;
                    document.getElementById('quizResult').innerHTML = "✅ إجابة صحيحة!";
                } else {
                    document.getElementById('quizResult').innerHTML = `❌ خطأ! الإجابة الصحيحة: ${q.options[q.correct]}`;
                }
                document.getElementById('quizScore').innerHTML = `النقاط: ${score}`;
                // تعطيل الأزرار بعد الإجابة
                document.querySelectorAll('#quizOptions button').forEach(b => b.disabled = true);
            };
            optsDiv.appendChild(btn);
        });
        document.getElementById('quizResult').innerHTML = '';
    }

    document.getElementById('quizNext').onclick = () => {
        currentIndex = (currentIndex + 1) % questions.length;
        loadQuestion();
    };
    loadQuestion();
}
