function initF1Quiz() {
    const container = document.getElementById('f1QuizGame');
    container.innerHTML = `
        <button class="back-home-btn" onclick="showMainPage()"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title">${lang[currentLang].game_f1Quiz}</div>
        <div id="f1qQuestion" class="quiz-question"></div>
        <div id="f1qOptions" class="quiz-options"></div>
        <div id="f1qResult" class="result-card"></div>
        <div id="f1qScore" class="result-card">النقاط: 0</div>
        <button id="f1qNext" class="primary">التالي</button>
    `;
    const questions = [
        { text: "من هو بطل العالم للفورميلا 1 لعام 2021؟", options: ["لويس هاميلتون", "ماكس فيرستابين", "فالتيري بوتاس", "سيرخيو بيريز"], correct: 1 },
        { text: "أي حلبة تعتبر البيت التقليدي للفورميلا 1 البريطانية؟", options: ["موناكو", "سبا", "سيلفرستون", "مونزا"], correct: 2 },
        { text: "كم عدد أبطال العالم الذين حملوا لقب 'مايكل شوماخر'؟", options: ["5", "6", "7", "8"], correct: 2 },
        { text: "أي فريق فاز ببطولة الصانعين 2022؟", options: ["فيراري", "ريد بول", "مرسيدس", "ماكلارين"], correct: 1 }
    ];
    let idx = 0, score = 0;

    function load() {
        const q = questions[idx];
        document.getElementById('f1qQuestion').innerHTML = q.text;
        const opts = document.getElementById('f1qOptions');
        opts.innerHTML = '';
        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'primary';
            btn.innerText = opt;
            btn.onclick = () => {
                if (i === q.correct) {
                    score++;
                    document.getElementById('f1qResult').innerHTML = '✅ صحيح!';
                } else {
                    document.getElementById('f1qResult').innerHTML = `❌ خطأ! الإجابة: ${q.options[q.correct]}`;
                }
                document.getElementById('f1qScore').innerHTML = `النقاط: ${score}`;
                document.querySelectorAll('#f1qOptions button').forEach(b => b.disabled = true);
            };
            opts.appendChild(btn);
        });
        document.getElementById('f1qResult').innerHTML = '';
    }

    document.getElementById('f1qNext').onclick = () => {
        idx = (idx + 1) % questions.length;
        load();
    };
    load();
}
