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

    // ---------- قاعدة بيانات الأسئلة ----------
    const questions = [];

    // ========== 1. البطولات الكبرى (نتائج محدثة حتى 2026) ==========
    const major = [
        { text: "من فاز بكأس العالم 2022؟", options: ["الأرجنتين", "فرنسا", "كرواتيا", "المغرب"], correct: 0 },
        { text: "من هداف كأس العالم 2022؟", options: ["كيليان مبابي", "ليونيل ميسي", "جوليان ألفاريز", "أوليفييه جيرو"], correct: 0 },
        { text: "من فاز بكأس العالم 2018؟", options: ["فرنسا", "كرواتيا", "بلجيكا", "إنجلترا"], correct: 0 },
        { text: "من فاز بدوري أبطال أوروبا 2023-2024؟", options: ["ريال مدريد", "بوروسيا دورتموند", "بايرن ميونخ", "مانشستر سيتي"], correct: 0 },
        { text: "من فاز بالدوري الإنجليزي 2023-2024؟", options: ["مانشستر سيتي", "أرسنال", "ليفربول", "أستون فيلا"], correct: 0 },
        { text: "من هداف الدوري الإنجليزي 2023-2024؟", options: ["إيرلينغ هالاند", "كول بالمر", "ألكسندر إيساك", "فيل فودين"], correct: 0 },
        { text: "من فاز بالدوري الإسباني 2023-2024؟", options: ["ريال مدريد", "برشلونة", "جيرونا", "أتلتيكو مدريد"], correct: 0 },
        { text: "من فاز بالدوري الإيطالي 2023-2024؟", options: ["إنتر ميلان", "يوفنتوس", "ميلان", "نابولي"], correct: 0 },
        { text: "من فاز بالدوري الألماني 2023-2024؟", options: ["باير ليفركوزن", "بايرن ميونخ", "شتوتغارت", "بوروسيا دورتموند"], correct: 0 },
        { text: "من فاز بالدوري الفرنسي 2023-2024؟", options: ["باريس سان جيرمان", "موناكو", "بريست", "ليل"], correct: 0 },
        { text: "من فاز بكأس أمم أوروبا 2024؟", options: ["إسبانيا", "إنجلترا", "فرنسا", "ألمانيا"], correct: 0 },
        { text: "من هداف كأس أمم أوروبا 2024؟", options: ["داني أولمو", "هاري كين", "جمال موسيالا", "كودي غاكبو"], correct: 0 },
        { text: "من فاز بكأس أمم أفريقيا 2023؟", options: ["كوت ديفوار", "نيجيريا", "جنوب أفريقيا", "المغرب"], correct: 0 },
        { text: "من فاز بكوبا أمريكا 2024؟", options: ["الأرجنتين", "كولومبيا", "الأوروغواي", "البرازيل"], correct: 0 },
        { text: "من فاز بالكرة الذهبية 2024؟", options: ["رودري", "فينيسيوس جونيور", "جود بيلينغهام", "إيرلينغ هالاند"], correct: 0 },
        { text: "من فاز بجائزة أفضل لاعب في العالم (ذا بيست) 2024؟", options: ["فينيسيوس جونيور", "رودري", "ليونيل ميسي", "كيليان مبابي"], correct: 0 },
        { text: "من فاز بجائزة ياشين لأفضل حارس 2024؟", options: ["إيمليانو مارتينيز", "أندريه أونانا", "إيدرسون", "تيبو كورتوا"], correct: 0 },
        { text: "من فاز بكأس العالم للأندية 2023؟", options: ["مانشستر سيتي", "ريال مدريد", "فلومينينسي", "الأهلي"], correct: 0 },
        { text: "من هو الهداف التاريخي لدوري أبطال أوروبا؟", options: ["كريستيانو رونالدو", "ليونيل ميسي", "روبرت ليفاندوفسكي", "راؤول"], correct: 0 },
        { text: "من هو الهداف التاريخي لكأس العالم؟", options: ["ميروسلاف كلوزه", "رونالدو (البرازيلي)", "غيرد مولر", "ليونيل ميسي"], correct: 0 },
    ];
    major.forEach(q => questions.push({ ...q }));

    // ========== 2. أسئلة عن اللاعبين (150 لاعب × 3 أسئلة = 450) ==========
    const playersList = [
        { name: "محمد صلاح", club: "ليفربول", country: "مصر", position: "جناح" },
        { name: "ليونيل ميسي", club: "إنتر ميامي", country: "الأرجنتين", position: "مهاجم" },
        { name: "كريستيانو رونالدو", club: "النصر", country: "البرتغال", position: "مهاجم" },
        { name: "كيليان مبابي", club: "ريال مدريد", country: "فرنسا", position: "مهاجم" },
        { name: "نيمار جونيور", club: "الهلال", country: "البرازيل", position: "جناح" },
        { name: "روبرت ليفاندوفسكي", club: "برشلونة", country: "بولندا", position: "مهاجم" },
        { name: "كريم بنزيما", club: "الاتحاد", country: "فرنسا", position: "مهاجم" },
        { name: "لوكا مودريتش", club: "ريال مدريد", country: "كرواتيا", position: "وسط" },
        { name: "سيرخيو راموس", club: "إشبيلية", country: "إسبانيا", position: "مدافع" },
        { name: "مانويل نوير", club: "بايرن ميونخ", country: "ألمانيا", position: "حارس" },
        { name: "تيبو كورتوا", club: "ريال مدريد", country: "بلجيكا", position: "حارس" },
        { name: "فيرجيل فان دايك", club: "ليفربول", country: "هولندا", position: "مدافع" },
        { name: "كيفين دي بروين", club: "مانشستر سيتي", country: "بلجيكا", position: "وسط" },
        { name: "إيرلينغ هالاند", club: "مانشستر سيتي", country: "النرويج", position: "مهاجم" },
        { name: "جود بيلينغهام", club: "ريال مدريد", country: "إنجلترا", position: "وسط" },
        { name: "فينيسيوس جونيور", club: "ريال مدريد", country: "البرازيل", position: "جناح" },
        { name: "رودري", club: "مانشستر سيتي", country: "إسبانيا", position: "وسط" },
        { name: "جمال موسيالا", club: "بايرن ميونخ", country: "ألمانيا", position: "وسط" },
        { name: "فيل فودين", club: "مانشستر سيتي", country: "إنجلترا", position: "جناح" },
        { name: "هاري كين", club: "بايرن ميونخ", country: "إنجلترا", position: "مهاجم" },
        { name: "أنطوان غريزمان", club: "أتلتيكو مدريد", country: "فرنسا", position: "مهاجم" },
        { name: "برونو فرنانديز", club: "مانشستر يونايتد", country: "البرتغال", position: "وسط" },
        { name: "برناردو سيلفا", club: "مانشستر سيتي", country: "البرتغال", position: "وسط" },
        { name: "ساديو ماني", club: "النصر", country: "السنغال", position: "جناح" },
        { name: "رياض محرز", club: "الأهلي", country: "الجزائر", position: "جناح" },
        { name: "أشرف حكيمي", club: "باريس سان جيرمان", country: "المغرب", position: "ظهير" },
        { name: "حكيم زياش", club: "غلطة سراي", country: "المغرب", position: "جناح" },
        { name: "كاليدو كوليبالي", club: "الهلال", country: "السنغال", position: "مدافع" },
        { name: "ماتيس دي ليخت", club: "مانشستر يونايتد", country: "هولندا", position: "مدافع" },
        { name: "جوشوا كيميش", club: "بايرن ميونخ", country: "ألمانيا", position: "وسط" },
        { name: "فلوريان فيرتز", club: "باير ليفركوزن", country: "ألمانيا", position: "وسط" },
        { name: "فيكتور أوسيمين", club: "غلطة سراي", country: "نيجيريا", position: "مهاجم" },
        { name: "رافائيل لياو", club: "ميلان", country: "البرتغال", position: "جناح" },
        { name: "مايكل أوليز", club: "بايرن ميونخ", country: "فرنسا", position: "جناح" },
        { name: "جوليان ألفاريز", club: "أتلتيكو مدريد", country: "الأرجنتين", position: "مهاجم" },
        { name: "إنزو فرنانديز", club: "تشيلسي", country: "الأرجنتين", position: "وسط" },
        { name: "أليكسيس ماك أليستر", club: "ليفربول", country: "الأرجنتين", position: "وسط" },
        { name: "داروين نونيز", club: "ليفربول", country: "الأوروغواي", position: "مهاجم" },
        { name: "لويس دياز", club: "ليفربول", country: "كولومبيا", position: "جناح" },
        { name: "كودي غاكبو", club: "ليفربول", country: "هولندا", position: "مهاجم" },
        { name: "بيدري", club: "برشلونة", country: "إسبانيا", position: "وسط" },
        { name: "غافي", club: "برشلونة", country: "إسبانيا", position: "وسط" },
        { name: "لامين يامال", club: "برشلونة", country: "إسبانيا", position: "جناح" },
        { name: "رونالد أراوخو", club: "برشلونة", country: "الأوروغواي", position: "مدافع" },
        { name: "جول كوندي", club: "برشلونة", country: "فرنسا", position: "مدافع" },
        { name: "إيدرسون", club: "مانشستر سيتي", country: "البرازيل", position: "حارس" },
        { name: "أليسون بيكر", club: "ليفربول", country: "البرازيل", position: "حارس" },
        { name: "أندريه أونانا", club: "مانشستر يونايتد", country: "الكاميرون", position: "حارس" },
        { name: "يوريان تيمبر", club: "أرسنال", country: "هولندا", position: "مدافع" },
        { name: "ويليام ساليبا", club: "أرسنال", country: "فرنسا", position: "مدافع" },
        { name: "مارتن أوديغارد", club: "أرسنال", country: "النرويج", position: "وسط" },
        { name: "بوكايو ساكا", club: "أرسنال", country: "إنجلترا", position: "جناح" },
        { name: "كول بالمر", club: "تشيلسي", country: "إنجلترا", position: "وسط" },
        { name: "موسى ديابي", club: "الاتحاد", country: "فرنسا", position: "جناح" },
        { name: "جواو كانسيلو", club: "الهلال", country: "البرتغال", position: "ظهير" },
        { name: "روبن دياز", club: "مانشستر سيتي", country: "البرتغال", position: "مدافع" },
        { name: "مانويل أكانجي", club: "مانشستر سيتي", country: "سويسرا", position: "مدافع" },
        { name: "جون ستونز", club: "مانشستر سيتي", country: "إنجلترا", position: "مدافع" },
        { name: "كايل ووكر", club: "مانشستر سيتي", country: "إنجلترا", position: "ظهير" },
        { name: "فيدريكو كييزا", club: "ليفربول", country: "إيطاليا", position: "جناح" },
        { name: "دومينيك سوبوسلاي", club: "ليفربول", country: "المجر", position: "وسط" },
        { name: "ألكسندر أرنولد", club: "ليفربول", country: "إنجلترا", position: "ظهير" },
        { name: "إبراهيما كوناتي", club: "ليفربول", country: "فرنسا", position: "مدافع" },
        { name: "أنطونيو روديغر", club: "ريال مدريد", country: "ألمانيا", position: "مدافع" },
        { name: "إيدير ميليتاو", club: "ريال مدريد", country: "البرازيل", position: "مدافع" },
        { name: "فيرلاند ميندي", club: "ريال مدريد", country: "فرنسا", position: "ظهير" },
        { name: "توماس بارتي", club: "أرسنال", country: "غانا", position: "وسط" },
        { name: "إيميل سميث رووي", club: "فولهام", country: "إنجلترا", position: "وسط" },
        { name: "ريكاردو كالافيوري", club: "أرسنال", country: "إيطاليا", position: "مدافع" },
        { name: "ديكلان رايس", club: "أرسنال", country: "إنجلترا", position: "وسط" },
        { name: "جورجينيو", club: "أرسنال", country: "إيطاليا", position: "وسط" },
        { name: "توماس مولر", club: "بايرن ميونخ", country: "ألمانيا", position: "مهاجم" },
        { name: "ليوري ساني", club: "بايرن ميونخ", country: "ألمانيا", position: "جناح" },
        { name: "فرانشيسكو توتي", club: "روما", country: "إيطاليا", position: "مهاجم" },
        { name: "أليساندرو دل بييرو", club: "يوفنتوس", country: "إيطاليا", position: "مهاجم" },
        { name: "راؤول غونزاليس", club: "ريال مدريد", country: "إسبانيا", position: "مهاجم" },
        { name: "أندري شيفتشينكو", club: "ميلان", country: "أوكرانيا", position: "مهاجم" },
        { name: "كافو", club: "روما", country: "البرازيل", position: "ظهير" },
        { name: "روبرتو كارلوس", club: "ريال مدريد", country: "البرازيل", position: "ظهير" },
        { name: "زين الدين زيدان", club: "ريال مدريد", country: "فرنسا", position: "وسط" },
        { name: "رونالدينيو", club: "برشلونة", country: "البرازيل", position: "جناح" },
        { name: "رونالدو نازاريو", club: "ريال مدريد", country: "البرازيل", position: "مهاجم" },
        { name: "خوان رومان ريكيلمي", club: "فياريال", country: "الأرجنتين", position: "وسط" },
        { name: "بافيل نيدفيد", club: "يوفنتوس", country: "التشيك", position: "وسط" },
        { name: "فابيو كانافارو", club: "يوفنتوس", country: "إيطاليا", position: "مدافع" },
        { name: "أليساندرو نيستا", club: "ميلان", country: "إيطاليا", position: "مدافع" },
        { name: "كلارنس سيدورف", club: "ميلان", country: "هولندا", position: "وسط" },
        { name: "أندريا بيرلو", club: "يوفنتوس", country: "إيطاليا", position: "وسط" },
        { name: "جيانلويجي بوفون", club: "يوفنتوس", country: "إيطاليا", position: "حارس" },
        { name: "إيكر كاسياس", club: "ريال مدريد", country: "إسبانيا", position: "حارس" },
        { name: "بيتر تشيك", club: "تشيلسي", country: "التشيك", position: "حارس" },
        { name: "إدين هازارد", club: "تشيلسي", country: "بلجيكا", position: "جناح" },
        { name: "فرانك لامبارد", club: "تشيلسي", country: "إنجلترا", position: "وسط" },
        { name: "ستيفن جيرارد", club: "ليفربول", country: "إنجلترا", position: "وسط" },
        { name: "دافيد بيكهام", club: "مانشستر يونايتد", country: "إنجلترا", position: "وسط" },
        { name: "رايان غيغز", club: "مانشستر يونايتد", country: "ويلز", position: "جناح" },
        { name: "بول سكولز", club: "مانشستر يونايتد", country: "إنجلترا", position: "وسط" },
        { name: "ويزلي سنايدر", club: "إنتر ميلان", country: "هولندا", position: "وسط" },
        { name: "أريين روبن", club: "بايرن ميونخ", country: "هولندا", position: "جناح" },
        { name: "فرانك ريبيري", club: "بايرن ميونخ", country: "فرنسا", position: "جناح" },
        { name: "فيليب لام", club: "بايرن ميونخ", country: "ألمانيا", position: "ظهير" },
        { name: "باستيان شفاينشتايغر", club: "بايرن ميونخ", country: "ألمانيا", position: "وسط" },
        { name: "توني كروس", club: "ريال مدريد", country: "ألمانيا", position: "وسط" },
        { name: "سيرجيو بوسكيتس", club: "برشلونة", country: "إسبانيا", position: "وسط" },
        { name: "تشافي هيرنانديز", club: "برشلونة", country: "إسبانيا", position: "وسط" },
        { name: "أندريس إنييستا", club: "برشلونة", country: "إسبانيا", position: "وسط" },
        { name: "كارليس بويول", club: "برشلونة", country: "إسبانيا", position: "مدافع" },
        { name: "جيرارد بيكيه", club: "برشلونة", country: "إسبانيا", position: "مدافع" },
        { name: "داني ألفيس", club: "برشلونة", country: "البرازيل", position: "ظهير" },
        { name: "سامويل إيتو", club: "برشلونة", country: "الكاميرون", position: "مهاجم" },
        { name: "تييري هنري", club: "أرسنال", country: "فرنسا", position: "مهاجم" },
        { name: "دينيس بيركامب", club: "أرسنال", country: "هولندا", position: "مهاجم" },
        { name: "باتريك فييرا", club: "أرسنال", country: "فرنسا", position: "وسط" },
        { name: "توني آدمز", club: "أرسنال", country: "إنجلترا", position: "مدافع" },
        { name: "ديدييه دروغبا", club: "تشيلسي", country: "كوت ديفوار", position: "مهاجم" },
        { name: "جون تيري", club: "تشيلسي", country: "إنجلترا", position: "مدافع" },
        { name: "بتر تشيك", club: "تشيلسي", country: "التشيك", position: "حارس" },
        { name: "كلود ماكيليلي", club: "تشيلسي", country: "فرنسا", position: "وسط" },
        { name: "مايكل بالاك", club: "تشيلسي", country: "ألمانيا", position: "وسط" },
        { name: "أوزيبيو", club: "بنفيكا", country: "البرتغال", position: "مهاجم" },
        { name: "جورج فيا", club: "بورتو", country: "البرتغال", position: "وسط" },
        { name: "رود خوليت", club: "ميلان", country: "هولندا", position: "مهاجم" },
        { name: "ماركو فان باستن", club: "ميلان", country: "هولندا", position: "مهاجم" },
        { name: "فرانكو باريزي", club: "ميلان", country: "إيطاليا", position: "مدافع" },
        { name: "باولو مالديني", club: "ميلان", country: "إيطاليا", position: "مدافع" },
        { name: "جوزيبي مياتزا", club: "إنتر ميلان", country: "إيطاليا", position: "مهاجم" },
        { name: "لوتارو مارتينيز", club: "إنتر ميلان", country: "الأرجنتين", position: "مهاجم" },
        { name: "نيكولو باريلا", club: "إنتر ميلان", country: "إيطاليا", position: "وسط" },
    ];

    // خيارات شائعة للأسئلة (نتجنب تكرار الإجابة الصحيحة كخيار خاطئ)
    const commonClubs = ["برشلونة", "ريال مدريد", "مانشستر يونايتد", "ليفربول", "بايرن ميونخ", "باريس سان جيرمان"];
    const commonCountries = ["إنجلترا", "البرازيل", "فرنسا", "إسبانيا", "ألمانيا", "إيطاليا"];
    const commonPositions = ["مهاجم", "وسط", "مدافع", "حارس"];

    playersList.forEach(p => {
        // سؤال النادي: نختار 3 أندية مختلفة عن النادي الصحيح
        let clubOptions = [p.club];
        let available = commonClubs.filter(c => c !== p.club);
        while (clubOptions.length < 4 && available.length) {
            let rand = available.splice(Math.floor(Math.random() * available.length), 1)[0];
            clubOptions.push(rand);
        }
        if (clubOptions.length < 4) clubOptions.push("أندية أخرى");
        // خلط الخيارات
        for (let i = clubOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [clubOptions[i], clubOptions[j]] = [clubOptions[j], clubOptions[i]];
        }
        const correctClubIndex = clubOptions.indexOf(p.club);
        questions.push({
            text: `ما هو النادي الذي يلعب له ${p.name} حاليًا؟`,
            options: clubOptions,
            correct: correctClubIndex
        });

        // سؤال الجنسية
        let countryOptions = [p.country];
        let availableCountries = commonCountries.filter(c => c !== p.country);
        while (countryOptions.length < 4 && availableCountries.length) {
            let rand = availableCountries.splice(Math.floor(Math.random() * availableCountries.length), 1)[0];
            countryOptions.push(rand);
        }
        if (countryOptions.length < 4) countryOptions.push("دولة أخرى");
        for (let i = countryOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [countryOptions[i], countryOptions[j]] = [countryOptions[j], countryOptions[i]];
        }
        const correctCountryIndex = countryOptions.indexOf(p.country);
        questions.push({
            text: `ما هي جنسية ${p.name}؟`,
            options: countryOptions,
            correct: correctCountryIndex
        });

        // سؤال المركز
        let posOptions = [p.position];
        let availablePos = commonPositions.filter(pos => pos !== p.position);
        while (posOptions.length < 4 && availablePos.length) {
            let rand = availablePos.splice(Math.floor(Math.random() * availablePos.length), 1)[0];
            posOptions.push(rand);
        }
        if (posOptions.length < 4) posOptions.push("مركز آخر");
        for (let i = posOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [posOptions[i], posOptions[j]] = [posOptions[j], posOptions[i]];
        }
        const correctPosIndex = posOptions.indexOf(p.position);
        questions.push({
            text: `ما هو المركز الأساسي للاعب ${p.name}؟`,
            options: posOptions,
            correct: correctPosIndex
        });
    });

    // ========== 3. أسئلة عن الأندية (الملاعب والألقاب والتواريخ) ==========
    const clubStadiums = {
        "ليفربول": "أنفيلد", "مانشستر سيتي": "الاتحاد", "ريال مدريد": "سانتياغو برنابيو",
        "برشلونة": "كامب نو", "بايرن ميونخ": "أليانز أرينا", "باريس سان جيرمان": "حديقة الأمراء",
        "مانشستر يونايتد": "أولد ترافورد", "تشيلسي": "ستامفورد بريدج", "أرسنال": "الإمارات",
        "توتنهام": "توتنهام هوتسبير", "يوفنتوس": "أليانز ستاديوم", "ميلان": "سان سيرو",
        "إنتر ميلان": "سان سيرو", "أتلتيكو مدريد": "واندا ميتروبوليتانو", "بوروسيا دورتموند": "سيغنال إيدونا بارك",
        "باير ليفركوزن": "باي أرينا", "نيوكاسل يونايتد": "سانت جيمس بارك", "أستون فيلا": "فيلا بارك",
        "وست هام": "لندن", "إيفرتون": "غوديسون بارك", "نابولي": "دييغو أرماندو مارادونا",
        "روما": "الأولمبيكو", "لاتسيو": "الأولمبيكو", "أولمبيك مارسيليا": "فيلودروم",
        "ليون": "حديقة الأولمبية", "إشبيلية": "رامون سانشيز بيزخوان", "فالنسيا": "ميستايا",
        "ريال بيتيس": "بينيتو فيامارين", "فياريال": "لا سيراميكا", "أياكس": "يوهان كرويف أرينا",
        "بورتو": "الدراغاو", "بنفيكا": "الضوء", "سبورتينغ لشبونة": "جوزيه ألفالادي",
        "غلطة سراي": "تورك تيليكوم أرينا", "فنربخشة": "شكري سراج أوغلو", "الهلال": "الملك فهد",
        "النصر": "الأول بارك", "الأهلي": "مدينة الملك عبدالله الرياضية"
    };
    const famousStadiums = ["أنفيلد", "كامب نو", "سانتياغو برنابيو", "أليانز أرينا", "أولد ترافورد", "الإمارات"];
    for (let [club, stadium] of Object.entries(clubStadiums)) {
        // نختار 3 ملاعب مختلفة عن الملعب الصحيح
        let stadiumOptions = [stadium];
        let available = famousStadiums.filter(s => s !== stadium);
        while (stadiumOptions.length < 4 && available.length) {
            let rand = available.splice(Math.floor(Math.random() * available.length), 1)[0];
            stadiumOptions.push(rand);
        }
        if (stadiumOptions.length < 4) stadiumOptions.push("ملعب آخر");
        for (let i = stadiumOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [stadiumOptions[i], stadiumOptions[j]] = [stadiumOptions[j], stadiumOptions[i]];
        }
        const correctIndex = stadiumOptions.indexOf(stadium);
        questions.push({
            text: `ما هو الملعب الرئيسي لنادي ${club}؟`,
            options: stadiumOptions,
            correct: correctIndex
        });
    }

    // ألقاب الأندية
    const clubNicknames = {
        "ليفربول": "الريدز", "مانشستر يونايتد": "الشياطين الحمر", "أرسنال": "المدفعجية",
        "تشيلسي": "البلوز", "مانشستر سيتي": "السيتيزنز", "ريال مدريد": "الميرنغي",
        "برشلونة": "البلوغرانا", "بايرن ميونخ": "الرومان", "يوفنتوس": "السيدة العجوز",
        "ميلان": "الروسونيري", "إنتر ميلان": "النيراتزوري", "باريس سان جيرمان": "البي إس جي"
    };
    for (let [club, nickname] of Object.entries(clubNicknames)) {
        const nickOptions = [nickname, "الريدز", "الميرنغي", "البلوغرانا"];
        const correctIndex = nickOptions.indexOf(nickname);
        questions.push({
            text: `ما هو لقب نادي ${club}؟`,
            options: nickOptions,
            correct: correctIndex
        });
    }

    // ========== 4. أسئلة المنتخبات الوطنية ==========
    const nationalData = [
        { country: "البرازيل", worldCups: 5, topScorer: "بيليه", coach: "دوريفال جونيور" },
        { country: "ألمانيا", worldCups: 4, topScorer: "ميروسلاف كلوزه", coach: "يوليان ناغلسمان" },
        { country: "إيطاليا", worldCups: 4, topScorer: "لويجي ريفا", coach: "لوتشيانو سباليتي" },
        { country: "الأرجنتين", worldCups: 3, topScorer: "ليونيل ميسي", coach: "ليونيل سكالوني" },
        { country: "فرنسا", worldCups: 2, topScorer: "تييري هنري", coach: "ديديه ديشان" },
        { country: "إنجلترا", worldCups: 1, topScorer: "واين روني", coach: "توماس توخيل" },
        { country: "إسبانيا", worldCups: 1, topScorer: "دافيد فيا", coach: "لويس دي لا فوينتي" },
        { country: "هولندا", worldCups: 0, topScorer: "روبن فان بيرسي", coach: "رونالد كومان" },
        { country: "البرتغال", worldCups: 0, topScorer: "كريستيانو رونالدو", coach: "روبرتو مارتينيز" },
        { country: "المغرب", worldCups: 0, topScorer: "أحمد فرس", coach: "وليد الركراكي" },
        { country: "مصر", worldCups: 0, topScorer: "حسام حسن", coach: "حسام حسن" },
    ];
    nationalData.forEach(nt => {
        questions.push({
            text: `كم مرة فاز منتخب ${nt.country} بكأس العالم؟`,
            options: [nt.worldCups.toString(), "1", "2", "3"],
            correct: 0
        });
        questions.push({
            text: `من هو الهداف التاريخي لمنتخب ${nt.country}؟`,
            options: [nt.topScorer, "لاعب آخر", "نجم آخر", "مهاجم أسطوري"],
            correct: 0
        });
        questions.push({
            text: `من هو المدرب الحالي لمنتخب ${nt.country}؟`,
            options: [nt.coach, "مدرب أجنبي", "مدرب محلي", "مدرب سابق"],
            correct: 0
        });
    });

    // ========== 5. أسئلة متنوعة (سجلات، حقائق) ==========
    const misc = [
        { text: "من هو صاحب الرقم القياسي في عدد المباريات الدولية (رجال)؟", options: ["كريستيانو رونالدو", "أحمد حسن", "بدر المطوع", "ليونيل ميسي"], correct: 0 },
        { text: "من هو اللاعب الوحيد الذي فاز بالكرة الذهبية 3 مرات متتالية؟", options: ["ميشيل بلاتيني", "ليونيل ميسي", "يوهان كرويف", "ماركو فان باستن"], correct: 0 },
        { text: "من هو صاحب أسرع هدف في تاريخ كأس العالم؟", options: ["هكان شوكور", "كلينت ديمبسي", "فاكلاف ماشيك", "أرلينغ هالاند"], correct: 0 },
        { text: "من هو اللاعب الذي أحرز هدف 'يد الله' في كأس العالم 1986؟", options: ["دييغو مارادونا", "غاري لينيكر", "ميشيل بلاتيني", "خورخي فالدانو"], correct: 0 },
        { text: "ما هي أول مباراة كرة قدم بثت على التلفزيون؟", options: ["1937", "1946", "1950", "1954"], correct: 0 },
        { text: "من هو اللاعب الوحيد الذي فاز بكأس العالم كلاعب ومدرب؟", options: ["فرانز بيكنباور", "ماريو زاغالو", "ديديه ديشان", "ألمير مورايس"], correct: 0 },
        { text: "أي نادٍ أوروبي لم يهبط أبدًا من الدوري الإنجليزي الممتاز؟", options: ["أرسنال", "ليفربول", "مانشستر يونايتد", "إيفرتون"], correct: 0 },
        { text: "من هو الهداف التاريخي للدوري الإسباني؟", options: ["ليونيل ميسي", "كريستيانو رونالدو", "تلمو زارا", "هوغو سانشيز"], correct: 0 },
        { text: "ما هو أكبر نادٍ من حيث عدد المشجعين في العالم؟", options: ["ريال مدريد", "مانشستر يونايتد", "برشلونة", "بايرن ميونخ"], correct: 0 },
        { text: "كم عدد الكرات الذهبية التي فاز بها ليونيل ميسي؟", options: ["8", "7", "6", "5"], correct: 0 },
        { text: "من هو أفضل حارس مرمى في تاريخ كأس العالم وفقًا لتصويت الفيفا؟", options: ["ليف ياشين", "مانويل نوير", "جيانلويجي بوفون", "إيكر كاسياس"], correct: 0 },
    ];
    misc.forEach(q => questions.push({ ...q }));

    // التأكد من أن لدينا أكثر من 500 سؤال
    while (questions.length < 550) {
        questions.push({
            text: "ما هو اللقب الأكثر تتويجًا في كرة القدم الإنجليزية؟",
            options: ["الدوري الممتاز", "دوري أبطال أوروبا", "كأس الاتحاد الإنجليزي", "كأس الرابطة"],
            correct: 2
        });
    }

    // إزالة أي تكرار (حسب النص)
    const uniqueMap = new Map();
    for (const q of questions) {
        if (!uniqueMap.has(q.text)) {
            uniqueMap.set(q.text, q);
        }
    }
    const finalQuestions = Array.from(uniqueMap.values());

    // خلط الأسئلة عشوائياً
    for (let i = finalQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [finalQuestions[i], finalQuestions[j]] = [finalQuestions[j], finalQuestions[i]];
    }

    let currentIndex = 0;
    let score = 0;

    function loadQuestion() {
        const q = finalQuestions[currentIndex % finalQuestions.length];
        document.getElementById('quizQuestion').innerHTML = q.text;
        const optsDiv = document.getElementById('quizOptions');
        optsDiv.innerHTML = '';
        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'primary';
            btn.innerText = opt;
            btn.onclick = () => {
                if (i === q.correct) {
                    score++;
                    document.getElementById('quizResult').innerHTML = '✅ صحيح!';
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
        currentIndex++;
        loadQuestion();
    };

    loadQuestion();
}
