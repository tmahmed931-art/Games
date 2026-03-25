function initQuizRace() {
    const container = document.getElementById('quizraceGame');
    if (container.innerHTML.trim() !== '') return;

    container.innerHTML = `
        <button class="back-home-btn" id="qrBackBtn"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title"><i class="fas fa-question-circle"></i> سباق الأسئلة</div>
        <div id="qrQuestion" class="quiz-question"></div>
        <div id="qrOptions" class="quiz-options"></div>
        <div id="qrFeedback" class="log-area"></div>
        <div id="qrScore" class="result-card">النقاط: 0</div>
        <button id="qrNextBtn" class="primary">سؤال جديد</button>
    `;

    document.getElementById('qrBackBtn').addEventListener('click', () => window.showMainPage());

    const questions = [
        { q: "ما هي عاصمة فرنسا؟", options: ["باريس", "لندن", "برلين", "مدريد"], correct: 0 },
        { q: "من هو مؤسس فيسبوك؟", options: ["بيل جيتس", "ستيف جوبز", "مارك زوكربيرج", "جيف بيزوس"], correct: 2 },
        { q: "ما هو أكبر كوكب في المجموعة الشمسية؟", options: ["المريخ", "المشتري", "زحل", "الأرض"], correct: 1 },
        { q: "كم عدد ألوان قوس قزح؟", options: ["5", "6", "7", "8"], correct: 2 },
        { q: "من كتب رواية 'ألف ليلة وليلة'؟", options: ["نجيب محفوظ", "توفيق الحكيم", "مجموعة مؤلفين", "يوسف إدريس"], correct: 2 },
        { q: "ما هي عملة اليابان؟", options: ["اليوان", "الوون", "الين", "الروبية"], correct: 2 },
        { q: "ما هو أسرع حيوان بري؟", options: ["الأسد", "النمر", "الفهد", "الغزال"], correct: 2 },
        { q: "ما هو العنصر الكيميائي الذي يرمز له بـ 'O'؟", options: ["الذهب", "الفضة", "الأكسجين", "الهيدروجين"], correct: 2 },
        { q: "من رسم لوحة الموناليزا؟", options: ["فان جوخ", "بيكاسو", "دافنشي", "مايكل أنجلو"], correct: 2 },
        { q: "ما هي أطول سلسلة جبال في العالم؟", options: ["الأنديز", "الهيمالايا", "الروكي", "جبال الألب"], correct: 0 }
    ];

    let currentQuestion = null;
    let score = 0;
    let answered = false;

    function loadQuestion() {
        answered = false;
        const randomIndex = Math.floor(Math.random() * questions.length);
        currentQuestion = questions[randomIndex];
        document.getElementById('qrQuestion').innerHTML = currentQuestion.q;
        const optsDiv = document.getElementById('qrOptions');
        optsDiv.innerHTML = '';
        currentQuestion.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.textContent = opt;
            btn.classList.add('primary');
            btn.onclick = () => checkAnswer(idx);
            optsDiv.appendChild(btn);
        });
        document.getElementById('qrFeedback').innerHTML = '';
    }

    function checkAnswer(selectedIdx) {
        if (answered) return;
        answered = true;
        const isCorrect = selectedIdx === currentQuestion.correct;
        if (isCorrect) {
            score += 10;
            document.getElementById('qrFeedback').innerHTML = "✅ إجابة صحيحة! +10 نقاط";
        } else {
            document.getElementById('qrFeedback').innerHTML = `❌ خطأ! الإجابة الصحيحة: ${currentQuestion.options[currentQuestion.correct]}`;
        }
        document.getElementById('qrScore').innerHTML = `النقاط: ${score}`;
    }

    document.getElementById('qrNextBtn').addEventListener('click', loadQuestion);
    loadQuestion();
}
window.initQuizRace = initQuizRace;
