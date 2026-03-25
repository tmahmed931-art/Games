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
    { a: "تكون خالدًا ولكن وحيدًا", b: "تعيش حياة قصيرة ولكن محاطًا بالحب" },
    { a: "تعيش في عالم بلا موسيقى", b: "تعيش في عالم بلا أفلام" },
    { a: "تستيقظ كل يوم في نفس اللحظة بالضبط", b: "لا تعرف أبدًا متى ستستيقظ" },
    { a: "تكون قادرًا على إصلاح أي شيء", b: "تكون قادرًا على صنع أي شيء" },
    { a: "تتخلى عن الحلويات مدى الحياة", b: "تتخلى عن الوجبات السريعة مدى الحياة" },
    { a: "تعيش في منزل زجاجي شفاف", b: "تعيش في منزل بلا نوافذ" },
    { a: "تكون دائمًا محبوبًا من الجميع", b: "تكون دائمًا مثيرًا للجدل" },
    { a: "تمتلك قاربًا فاخرًا", b: "تمتلك طائرة خاصة" },
    { a: "تعمل في وظيفة تحبها ولكن براتب منخفض", b: "تعمل في وظيفة لا تحبها براتب مرتفع" },
    { a: "تكون أذكى شخص في العالم", b: "تكون أسعد شخص في العالم" },
    { a: "تعيش في الماضي لمدة عام", b: "تعيش في المستقبل لمدة عام" },
    { a: "تتخلى عن هاتفك الذكي لمدة شهر", b: "تتخلى عن وسائل التواصل الاجتماعي لمدة عام" },
    { a: "تكون قادرًا على التحدث مع الحيوانات", b: "تكون قادرًا على فهم لغات البشر جميعًا" },
    { a: "تتذكر كل شيء تقرأه", b: "تتذكر كل شيء تسمعه" },
    { a: "تفقد ذكرياتك الخمس الأخيرة", b: "تفقد ذكرياتك الخمس الأولى" },
    { a: "تكون شخصًا لا ينام أبدًا", b: "تكون شخصًا ينام 12 ساعة يوميًا" },
    { a: "تكون مشهورًا بسبب موهبتك", b: "تكون مشهورًا بسبب مظهرك" },
    { a: "تعيش في بيت متنقل وتتجول", b: "تعيش في منزل ثابت مع حديقة" },
    { a: "تكون قادرًا على التحكم في الطقس", b: "تكون قادرًا على التحكم في الزلازل" },
    { a: "تأكل طعامًا حارًا يوميًا", b: "لا تأكل أي بهارات أبدًا" },
    { a: "تعيش 50 عامًا في سعادة تامة", b: "تعيش 100 عام بسعادة متوسطة" },
    { a: "تكون قادرًا على الشفاء الذاتي", b: "تكون قادرًا على شفاء الآخرين" },
    { a: "تمتلك قطعة أرض في القمر", b: "تمتلك جزيرة خاصة في المحيط" },
    { a: "تتزوج من شخص تحبه لكنه فقير", b: "تتزوج من شخص لا تحبه لكنه غني جدًا" },
    { a: "تعيش في زمن الحروب", b: "تعيش في زمن السلام ولكن بمرض مزمن" },
    { a: "تكون بلا خوف", b: "تكون بلا حزن" }
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
