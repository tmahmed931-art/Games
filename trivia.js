function initTrivia() {
    const container = document.getElementById('triviaGame');
    if (container.innerHTML.trim() !== '') return;

    container.innerHTML = `
        <button class="back-home-btn" id="triviaBackBtn"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title"><i class="fas fa-brain"></i> سؤال وجواب</div>
        <div id="triviaQuestion" class="result-card"></div>
        <div id="triviaOptions" class="setup-section" style="justify-content: center;"></div>
        <div id="triviaFeedback" class="log-area"></div>
        <button id="nextTriviaBtn" class="primary">السؤال التالي</button>
    `;

    document.getElementById('triviaBackBtn').addEventListener('click', () => window.showMainPage());

    const questions = [
        { q: "ما هي عاصمة فرنسا؟", options: ["باريس", "لندن", "برلين", "مدريد"], correct: 0 },
        { q: "من هو مؤسس فيسبوك؟", options: ["بيل جيتس", "ستيف جوبز", "مارك زوكربيرج", "جيف بيزوس"], correct: 2 },
        { q: "ما هو أكبر كوكب في المجموعة الشمسية؟", options: ["المريخ", "المشتري", "زحل", "الأرض"], correct: 1 },
        { q: "كم عدد ألوان قوس قزح؟", options: ["5", "6", "7", "8"], correct: 2 },
        { q: "من كتب رواية 'ألف ليلة وليلة'؟", options: ["نجيب محفوظ", "توفيق الحكيم", "مجموعة مؤلفين", "يوسف إدريس"], correct: 2 },
        { q: "ما هي عملة اليابان؟", options: ["اليوان", "الوون", "الين", "الروبية"], correct: 2 },
        { q: "من هو لاعب كرة القدم المعروف بـ 'الأسطورة'؟", options: ["ميسي", "رونالدو", "بيليه", "مارادونا"], correct: 2 }, // could be multiple, but pick one
        { q: "ما هو أسرع حيوان بري؟", options: ["الأسد", "النمر", "الفهد", "الغزال"], correct: 2 },
        { q: "ما هو العنصر الكيميائي الذي يرمز له بـ 'O'؟", options: ["الذهب", "الفضة", "الأكسجين", "الهيدروجين"], correct: 2 },
        { q: "من رسم لوحة الموناليزا؟", options: ["فان جوخ", "بيكاسو", "دافنشي", "مايكل أنجلو"], correct: 2 }
    ];

    let currentQuestion = null;
    let answered = false;

    function loadQuestion() {
        answered = false;
        const randomIndex = Math.floor(Math.random() * questions.length);
        currentQuestion = questions[randomIndex];
        document.getElementById('triviaQuestion').innerHTML = currentQuestion.q;
        const optionsDiv = document.getElementById('triviaOptions');
        optionsDiv.innerHTML = '';
        currentQuestion.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.textContent = opt;
            btn.classList.add('primary');
            btn.style.margin = '0.5rem';
            btn.onclick = () => checkAnswer(idx);
            optionsDiv.appendChild(btn);
        });
        document.getElementById('triviaFeedback').innerHTML = '';
    }

    function checkAnswer(selectedIdx) {
        if (answered) return;
        answered = true;
        const isCorrect = selectedIdx === currentQuestion.correct;
        const feedback = isCorrect ? "✅ إجابة صحيحة!" : `❌ خطأ! الإجابة الصحيحة: ${currentQuestion.options[currentQuestion.correct]}`;
        document.getElementById('triviaFeedback').innerHTML = feedback;
    }

    document.getElementById('nextTriviaBtn').addEventListener('click', loadQuestion);
    loadQuestion();
}

window.initTrivia = initTrivia;