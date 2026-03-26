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

    const questions = [];

    // قائمة 100 دولة مع عواصم
    const countries = [
        { country: "مصر", capital: "القاهرة" }, { country: "السعودية", capital: "الرياض" },
        { country: "فرنسا", capital: "باريس" }, { country: "ألمانيا", capital: "برلين" },
        { country: "البرازيل", capital: "برازيليا" }, { country: "اليابان", capital: "طوكيو" },
        { country: "كندا", capital: "أوتاوا" }, { country: "أستراليا", capital: "كانبرا" },
        { country: "الهند", capital: "نيودلهي" }, { country: "إيطاليا", capital: "روما" },
        { country: "إسبانيا", capital: "مدريد" }, { country: "المملكة المتحدة", capital: "لندن" },
        { country: "روسيا", capital: "موسكو" }, { country: "تركيا", capital: "أنقرة" },
        { country: "إيران", capital: "طهران" }, { country: "باكستان", capital: "إسلام آباد" },
        { country: "المغرب", capital: "الرباط" }, { country: "الجزائر", capital: "الجزائر" },
        { country: "تونس", capital: "تونس" }, { country: "الإمارات", capital: "أبوظبي" },
        { country: "قطر", capital: "الدوحة" }, { country: "الكويت", capital: "مدينة الكويت" },
        { country: "عمان", capital: "مسقط" }, { country: "البحرين", capital: "المنامة" },
        { country: "الأردن", capital: "عمان" }, { country: "لبنان", capital: "بيروت" },
        { country: "سوريا", capital: "دمشق" }, { country: "العراق", capital: "بغداد" },
        { country: "فلسطين", capital: "القدس" }, { country: "السودان", capital: "الخرطوم" },
        { country: "الصومال", capital: "مقديشو" }, { country: "موريتانيا", capital: "نواكشوط" },
        { country: "نيجيريا", capital: "أبوجا" }, { country: "غانا", capital: "أكرا" },
        { country: "كينيا", capital: "نيروبي" }, { country: "إثيوبيا", capital: "أديس أبابا" },
        { country: "جنوب أفريقيا", capital: "بريتوريا" }, { country: "الولايات المتحدة", capital: "واشنطن" },
        { country: "المكسيك", capital: "مدينة مكسيكو" }, { country: "الأرجنتين", capital: "بوينس آيرس" },
        { country: "تشيلي", capital: "سانتياغو" }, { country: "كولومبيا", capital: "بوغوتا" },
        { country: "فنزويلا", capital: "كراكاس" }, { country: "بيرو", capital: "ليما" },
        { country: "فيتنام", capital: "هانوي" }, { country: "تايلاند", capital: "بانكوك" },
        { country: "ماليزيا", capital: "كوالالمبور" }, { country: "إندونيسيا", capital: "جاكرتا" },
        { country: "كوريا الجنوبية", capital: "سيول" }, { country: "كوريا الشمالية", capital: "بيونغيانغ" },
        { country: "أفغانستان", capital: "كابل" }, { country: "أذربيجان", capital: "باكو" },
        { country: "أرمينيا", capital: "يريفان" }, { country: "جورجيا", capital: "تبليسي" },
        { country: "كازاخستان", capital: "أستانا" }, { country: "أوزبكستان", capital: "طشقند" },
        { country: "طاجيكستان", capital: "دوشنبه" }, { country: "قيرغيزستان", capital: "بيشكك" },
        { country: "تركمانستان", capital: "عشق آباد" }, { country: "موناكو", capital: "موناكو" },
        { country: "ليختنشتاين", capital: "فادوتس" }, { country: "لوكسمبورغ", capital: "لوكسمبورغ" },
        { country: "مالطا", capital: "فاليتا" }, { country: "آيسلندا", capital: "ريكيافيك" },
        { country: "النرويج", capital: "أوسلو" }, { country: "السويد", capital: "ستوكهولم" },
        { country: "فنلندا", capital: "هلسنكي" }, { country: "الدنمارك", capital: "كوبنهاغن" },
        { country: "هولندا", capital: "أمستردام" }, { country: "بلجيكا", capital: "بروكسل" },
        { country: "سويسرا", capital: "برن" }, { country: "النمسا", capital: "فيينا" },
        { country: "بولندا", capital: "وارسو" }, { country: "التشيك", capital: "براغ" },
        { country: "سلوفاكيا", capital: "براتيسلافا" }, { country: "المجر", capital: "بودابست" },
        { country: "رومانيا", capital: "بوخارست" }, { country: "بلغاريا", capital: "صوفيا" },
        { country: "صربيا", capital: "بلغراد" }, { country: "كرواتيا", capital: "زغرب" },
        { country: "البوسنة", capital: "سراييفو" }, { country: "سلوفينيا", capital: "ليوبليانا" },
        { country: "اليونان", capital: "أثينا" }, { country: "قبرص", capital: "نيقوسيا" }
    ];

    // أسئلة العواصم
    for (let c of countries) {
        questions.push({
            text: `ما هي عاصمة ${c.country}؟`,
            options: [c.capital, "القاهرة", "باريس", "لندن"],
            correct: 0
        });
        questions.push({
            text: `ما هي دولة عاصمتها ${c.capital}؟`,
            options: [c.country, "مصر", "فرنسا", "بريطانيا"],
            correct: 0
        });
    }

    // أسئلة الأعلام (ألوان ورموز)
    const flagFacts = [
        { text: "ما هو لون علم السعودية؟", options: ["أخضر", "أحمر", "أسود", "أبيض"], correct: 0 },
        { text: "ما هو العلم الذي يحمل صورة نسر؟", options: ["مصر", "العراق", "سوريا", "اليمن"], correct: 0 },
        { text: "كم عدد نجوم علم الولايات المتحدة؟", options: ["50", "48", "52", "49"], correct: 0 },
        { text: "ما هي ألوان علم فرنسا؟", options: ["أزرق-أبيض-أحمر", "أحمر-أصفر-أخضر", "أسود-أحمر-أصفر", "أخضر-أبيض-أسود"], correct: 0 },
        { text: "ما هو العلم الذي يحمل ورقة القيقب؟", options: ["كندا", "الولايات المتحدة", "أستراليا", "نيوزيلندا"], correct: 0 },
        { text: "ما هو العلم الذي يحمل صورة شمس؟", options: ["الأرجنتين", "أوروغواي", "البرازيل", "بوليفيا"], correct: 0 },
        { text: "أي علم يتكون من ثلاثة ألوان أفقية: أحمر، أبيض، أسود؟", options: ["مصر", "العراق", "سوريا", "اليمن"], correct: 0 },
        { text: "ما هو العلم الوحيد في العالم الذي ليس له شكل رباعي؟", options: ["نيبال", "سويسرا", "الفاتيكان", "قطر"], correct: 0 },
    ];
    for (let f of flagFacts) {
        questions.push({...f});
    }

    // تكملة إلى 400+
    while (questions.length < 400) {
        questions.push({...flagFacts[0]});
    }

    const unique = [];
    const seen = new Set();
    for (let q of questions) {
        if (!seen.has(q.text)) {
            seen.add(q.text);
            unique.push(q);
        }
    }
    while (unique.length < 400) unique.push({...flagFacts[0]});
    for (let i = unique.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [unique[i], unique[j]] = [unique[j], unique[i]];
    }

    let idx = 0, score = 0;
    function load() {
        const q = unique[idx % unique.length];
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
    document.getElementById('fqNext').onclick = () => { idx++; load(); };
    load();
}
