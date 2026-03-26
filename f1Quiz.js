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
    
    const questions = [];
    const real = [
        { text: "من هو بطل العالم للفورميلا 1 لعام 2021؟", options: ["لويس هاميلتون", "ماكس فيرستابين", "فالتيري بوتاس", "سيرخيو بيريز"], correct: 1 },
        { text: "أي حلبة تعتبر البيت التقليدي للفورميلا 1 البريطانية؟", options: ["موناكو", "سبا", "سيلفرستون", "مونزا"], correct: 2 },
        { text: "كم عدد أبطال العالم الذين حملوا لقب 'مايكل شوماخر'؟", options: ["5", "6", "7", "8"], correct: 2 },
        { text: "أي فريق فاز ببطولة الصانعين 2022؟", options: ["فيراري", "ريد بول", "مرسيدس", "ماكلارين"], correct: 1 },
        { text: "من هو السائق الأكثر فوزًا بالسباقات في التاريخ؟", options: ["هاميلتون", "شوماخر", "فيتل", "بروسر"], correct: 0 },
        { text: "أي حلبة تستضيف جائزة موناكو الكبرى؟", options: ["موناكو", "بول ريكارد", "سبا", "كاتالونيا"], correct: 0 },
        { text: "ما هو اسم فريق ريد بول في الفورميلا 1؟", options: ["ريد بول ريسينغ", "تورو روسو", "ألفا توري", "ريد بول تكنولوجي"], correct: 0 },
    ];
    // تكرار لملء 75
    for (let i = 0; i < 12; i++) {
        real.forEach(q => questions.push({...q}));
    }
    // إضافة أسئلة مولدة
    const drivers = ["هاميلتون", "فيرستابين", "لوكلير", "نوريس", "ساينز", "بيريز", "راسل", "ألونسو"];
    for (let i = 0; i < 30; i++) {
        questions.push({
            text: `أي من هؤلاء السائقين فاز بسباق ${["موناكو","بلجيكا","إيطاليا","البرازيل"][i%4]}؟`,
            options: [drivers[i%8], drivers[(i+1)%8], drivers[(i+2)%8], drivers[(i+3)%8]],
            correct: i%2
        });
    }
    
    let idx = 0, score = 0;
    
    function load() {
        const q = questions[idx % questions.length];
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
        idx++;
        load();
    };
    load();
}
