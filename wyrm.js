const wyrmQuestions = [
    { a: "تكون غنيًا ولكن بلا أصدقاء", b: "تكون فقيرًا ولكن لديك أصدقاء مخلصون" },
    { a: "تسافر عبر الزمن إلى الماضي", b: "تسافر عبر الزمن إلى المستقبل" },
    { a: "تعيش 100 عام بصحة جيدة", b: "تعيش 1000 عام بصحة سيئة" },
    { a: "تتخلى عن الإنترنت لمدة عام", b: "تتخلى عن التلفاز لمدة عام" },
    { a: "تكون مشهورًا ولكن بلا خصوصية", b: "تكون مجهولًا ولكن بحرية كاملة" },
    { a: "تفقد حاسة البصر", b: "تفقد حاسة السمع" },
    { a: "تأكل نفس الوجبة طوال حياتك", b: "لا تأكل أبدًا طعامك المفضل" },
    { a: "تكون قادرًا على الطيران", b: "تكون قادرًا على الاختفاء" },
    { a: "تقرأ أفكار الآخرين", b: "تغير أفكار الآخرين" },
    { a: "تعيش في مدينة مزدحمة", b: "تعيش في الريف الهادئ" },
    { a: "تتحدث جميع لغات العالم", b: "تكون بارعًا في جميع المهارات الفنية" },
    { a: "تكون دائمًا صادقًا حتى لو جرحت", b: "تكون دبلوماسيًا حتى لو كذبت" },
    { a: "تفوز باليانصيب لكن تخسر أقرب صديق", b: "تبقى فقيرًا ولكن مع أصدقائك" },
    { a: "تعيش بدون إنترنت", b: "تعيش بدون كهرباء" },
    { a: "تكون خالدًا ولكن وحيدًا", b: "تعيش حياة قصيرة ولكن محاطًا بالحب" }
];

function initWyrm() {
    const container = document.getElementById('wyrmGame');
    if (container.innerHTML.trim() !== '') return;

    container.innerHTML = `
        <button class="back-home-btn" id="wyrmBackBtn"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title"><i class="fas fa-question-circle"></i> ماذا تفضل؟</div>
        <div id="wyrmQuestion" class="result-card"></div>
        <div class="wyrm-options">
            <button id="wyrmOptionA" class="primary">الخيار الأول</button>
            <button id="wyrmOptionB" class="primary">الخيار الثاني</button>
        </div>
        <button id="nextWyrmBtn" class="primary" style="margin-top:1rem;">سؤال جديد</button>
        <div id="wyrmFeedback" class="log-area" style="margin-top:1rem;"></div>
    `;

    document.getElementById('wyrmBackBtn').addEventListener('click', () => window.showMainPage());

    let currentQuestion = null;

    function loadNewQuestion() {
        const randomIndex = Math.floor(Math.random() * wyrmQuestions.length);
        currentQuestion = wyrmQuestions[randomIndex];
        document.getElementById('wyrmQuestion').innerHTML = `
            <strong>ماذا تفضل؟</strong><br>
            <span>${currentQuestion.a}</span><br>
            <span>أم</span><br>
            <span>${currentQuestion.b}</span>
        `;
        document.getElementById('wyrmFeedback').innerHTML = '';
        document.getElementById('wyrmOptionA').style.display = 'inline-flex';
        document.getElementById('wyrmOptionB').style.display = 'inline-flex';
    }

    function choose(option) {
        if (!currentQuestion) return;
        const chosen = option === 'A' ? currentQuestion.a : currentQuestion.b;
        const feedback = `لقد اخترت: "${chosen}". شارك مع الآخرين لماذا!`;
        document.getElementById('wyrmFeedback').innerHTML = feedback;
        document.getElementById('wyrmOptionA').style.display = 'none';
        document.getElementById('wyrmOptionB').style.display = 'none';
    }

    document.getElementById('wyrmOptionA').onclick = () => choose('A');
    document.getElementById('wyrmOptionB').onclick = () => choose('B');
    document.getElementById('nextWyrmBtn').onclick = loadNewQuestion;

    loadNewQuestion();
}

window.initWyrm = initWyrm;
