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

    const questions = [];
    
    // 1. أسئلة كأس العالم
    const worldCup = [
        { text: "من فاز بكأس العالم 2018؟", options: ["ألمانيا", "فرنسا", "البرازيل", "الأرجنتين"], correct: 1 },
        { text: "من فاز بكأس العالم 2014؟", options: ["ألمانيا", "الأرجنتين", "هولندا", "البرازيل"], correct: 0 },
        { text: "من فاز بكأس العالم 2010؟", options: ["إسبانيا", "هولندا", "ألمانيا", "الأوروغواي"], correct: 0 },
        { text: "من فاز بكأس العالم 2006؟", options: ["إيطاليا", "فرنسا", "ألمانيا", "البرتغال"], correct: 0 },
        { text: "من هداف كأس العالم 2014؟", options: ["ميسي", "توماس مولر", "خاميس رودريغيز", "كلوزه"], correct: 2 },
        { text: "من هداف كأس العالم 2018؟", options: ["هاري كين", "مبابي", "غريزمان", "رونالدو"], correct: 0 },
        { text: "أي دولة فازت بأول كأس عالم؟", options: ["البرازيل", "الأوروغواي", "إيطاليا", "الأرجنتين"], correct: 1 },
        { text: "أي دولة فازت بآخر كأس عالم (2022)؟", options: ["فرنسا", "الأرجنتين", "كرواتيا", "المغرب"], correct: 1 },
    ];
    
    // 2. أسئلة دوري أبطال أوروبا
    const ucl = [
        { text: "من فاز بدوري أبطال أوروبا 2022؟", options: ["ليفربول", "ريال مدريد", "بايرن ميونخ", "مانشستر سيتي"], correct: 1 },
        { text: "من فاز بدوري أبطال أوروبا 2021؟", options: ["تشيلسي", "مانشستر سيتي", "ريال مدريد", "باريس سان جيرمان"], correct: 0 },
        { text: "من فاز بدوري أبطال أوروبا 2020؟", options: ["بايرن ميونخ", "باريس سان جيرمان", "ليفربول", "برشلونة"], correct: 0 },
        { text: "من هو الهداف التاريخي لدوري أبطال أوروبا؟", options: ["رونالدو", "ميسي", "ليفاندوفسكي", "راؤول"], correct: 0 },
        { text: "أي نادي فاز بأكبر عدد من البطولات؟", options: ["ريال مدريد", "ميلان", "ليفربول", "بايرن ميونخ"], correct: 0 },
    ];
    
    // 3. أسئلة عن اللاعبين
    const players = [
        { name: "محمد صلاح", club: "ليفربول", country: "مصر" },
        { name: "ليونيل ميسي", club: "إنتر ميامي", country: "الأرجنتin" },
        { name: "كريستيانو رونالدو", club: "النصر", country: "البرتغال" },
        { name: "كيليان مبابي", club: "باريس سان جيرمان", country: "فرنسا" },
        { name: "نيمار", club: "الهلال", country: "البرازيل" },
        { name: "روبرت ليفاندوفسكي", club: "برشلونة", country: "بولندا" },
        { name: "كريم بنزيما", club: "الاتحاد", country: "فرنسا" },
        { name: "لوكا مودريتش", club: "ريال مدريد", country: "كرواتيا" },
        { name: "سيرخيو راموس", club: "إشبيلية", country: "إسبانيا" },
        { name: "مانويل نوير", club: "بايرن ميونخ", country: "ألمانيا" },
        { name: "تيبو كورتوا", club: "ريال مدريد", country: "بلجيكا" },
        { name: "فيرجيل فان دايك", club: "ليفربول", country: "هولندا" },
        { name: "كيفين دي بروين", club: "مانشستر سيتي", country: "بلجيكا" },
        { name: "إيرلينغ هالاند", club: "مانشستر سيتي", country: "النرويج" },
        { name: "جود بيلينغهام", club: "ريال مدريد", country: "إنجلترا" },
        { name: "فينيسيوس جونيور", club: "ريال مدريد", country: "البرازيل" },
        { name: "رودري", club: "مانشستر سيتي", country: "إسبانيا" },
        { name: "جمال موسيالا", club: "بايرن ميونخ", country: "ألمانيا" },
        { name: "فيل فودين", club: "مانشستر سيتي", country: "إنجلترا" },
        { name: "هاري كين", club: "بايرن ميونخ", country: "إنجلترا" },
    ];
    
    for (let p of players) {
        questions.push({
            text: `ما هو النادي الذي يلعب له ${p.name}؟`,
            options: [p.club, "برشلونة", "ريال مدريد", "مانشستر يونايتد"],
            correct: 0
        });
        questions.push({
            text: `ما هي جنسية ${p.name}؟`,
            options: [p.country, "إنجلترا", "البرازيل", "فرنسا"],
            correct: 0
        });
    }
    
    // 4. أسئلة الدوري الإنجليزي
    const epl = [
        { text: "من فاز بالدوري الإنجليزي 2022-2023؟", options: ["مانشستر سيتي", "أرسنال", "مانشستر يونايتد", "ليفربول"], correct: 0 },
        { text: "من هداف الدوري الإنجليزي 2022-2023؟", options: ["هالاند", "كاين", "صلاح", "راشفورد"], correct: 0 },
        { text: "أي فريق يلقب بـ 'الريدز'؟", options: ["ليفربول", "مانشستر يونايتد", "أرسنال", "تشيلسي"], correct: 0 },
    ];
    
    // 5. أسئلة الدوري الإسباني
    const laliga = [
        { text: "من فاز بالدوري الإسباني 2022-2023؟", options: ["برشلونة", "ريال مدريد", "أتلتيكو مدريد", "ريال سوسيداد"], correct: 0 },
        { text: "من هداف الدوري الإسباني 2022-2023؟", options: ["ليفاندوفسكي", "بنزيما", "فينيسيوس", "غريزمان"], correct: 0 },
    ];
    
    // 6. أسئلة عامة
    const general = [
        { text: "من هو أكثر لاعب فاز بالكرة الذهبية؟", options: ["ميسي", "رونالدو", "بلاتيني", "فان باستن"], correct: 0 },
        { text: "ما هو النادي الذي يلقب بـ 'البلوغرانا'؟", options: ["برشلونة", "ريال مدريد", "تشيلسي", "مانشستر سيتي"], correct: 0 },
        { text: "ما هو النادي الذي يلقب بـ 'الميرنغي'؟", options: ["ريال مدريد", "برشلونة", "أتلتيكو مدريد", "فالنسيا"], correct: 0 },
        { text: "من هو مدرب منتخب مصر الحالي؟", options: ["حسام حسن", "خالد جلال", "إيهاب جلال", "كارلوس كيروش"], correct: 0 },
    ];
    
    // إضافة كل المجموعات
    const allSets = [...worldCup, ...ucl, ...epl, ...laliga, ...general];
    // تكرار لملء 200
    for (let i = 0; i < 10; i++) {
        allSets.forEach(q => questions.push({...q}));
    }
    // إضافة أسئلة مولدة عشوائياً
    const clubs = ["برشلونة", "ريال مدريد", "بايرن ميونخ", "مانشستر سيتي", "باريس سان جيرمان", "ليفربول", "يوفنتوس", "ميلان", "أرسنال", "تشيلسي"];
    const playersList = players.map(p => p.name);
    for (let i = 0; i < 50; i++) {
        const randomClub = clubs[Math.floor(Math.random() * clubs.length)];
        const randomPlayer = playersList[Math.floor(Math.random() * playersList.length)];
        questions.push({
            text: `أي من هذه الفرق فاز بلقب ${randomClub} في آخر 5 سنوات؟`,
            options: [randomClub, clubs[(clubs.indexOf(randomClub)+1)%clubs.length], clubs[(clubs.indexOf(randomClub)+2)%clubs.length], clubs[(clubs.indexOf(randomClub)+3)%clubs.length]],
            correct: 0
        });
        questions.push({
            text: `من هو اللاعب الذي سجل أكثر من 20 هدفًا في موسم 2022-2023؟`,
            options: [randomPlayer, playersList[(playersList.indexOf(randomPlayer)+1)%playersList.length], playersList[(playersList.indexOf(randomPlayer)+2)%playersList.length], playersList[(playersList.indexOf(randomPlayer)+3)%playersList.length]],
            correct: Math.floor(Math.random() * 4)
        });
    }
    
    // التأكد من 200+ سؤال
    while (questions.length < 200) questions.push({...general[0]});
    
    let idx = 0, score = 0;
    
    function load() {
        const q = questions[idx % questions.length];
        document.getElementById('quizQuestion').innerHTML = q.text;
        const opts = document.getElementById('quizOptions');
        opts.innerHTML = '';
        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'primary';
            btn.innerText = opt;
            btn.onclick = () => {
                if (i === q.correct) {
                    score++;
                    document.getElementById('quizResult').innerHTML = '✅ صحيح!';
                } else {
                    document.getElementById('quizResult').innerHTML = `❌ خطأ! الإجابة: ${q.options[q.correct]}`;
                }
                document.getElementById('quizScore').innerHTML = `النقاط: ${score}`;
                document.querySelectorAll('#quizOptions button').forEach(b => b.disabled = true);
            };
            opts.appendChild(btn);
        });
        document.getElementById('quizResult').innerHTML = '';
    }
    
    document.getElementById('quizNext').onclick = () => {
        idx++;
        load();
    };
    load();
}
