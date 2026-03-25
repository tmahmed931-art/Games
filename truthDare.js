// 50 truths (same as before, but here's a shortened list for brevity; you can keep the full 50)
const truths = [
    "ما هو أكثر شيء تخجل منه؟", "هل سبق وكذبت على أقرب صديق لك؟", "ما هي أكثر كذبة قلتها في حياتك؟",
    "من هو الشخص الذي تتمنى ألا يراك على حالتك الحالية؟", "ما هو أسوأ شيء قمت به بحق شخص آخر؟",
    "هل فكرت يومًا في خيانة صديق؟", "ما هو سرك الأكبر؟", "من تحب سرًا؟",
    "هل سبق أن سرقت شيئًا؟", "ما هو أكثر موقف محرج تعرضت له؟", "هل تخشى الموت؟",
    "ما هو الشيء الذي تفعله ولا يعلم به أحد؟", "من هو أكثر شخص تكرهه؟", "هل سبق أن خنت في علاقة؟",
    "ما هو أكبر إنجاز تفتخر به؟", "ما هي أسوأ صفة في شخصيتك؟", "هل تحب نفسك؟",
    "ما هو الشيء الذي تندم على فعله؟", "من هو الشخص الذي تتمنى لو لم تقابله؟", "ما هو أكثر شيء يكشف ضعفك؟",
    "هل سبق أن انتحلت شخصية غيرك؟", "ما هو أكثر شيء تخاف من اكتشافه عنك؟", "هل فكرت في الانتحار؟",
    "ما هو أغرب حلم رأيته؟", "من هو قدوتك في الحياة؟", "ما هي أسوأ جملة قلتها لأحد؟",
    "هل تفضل المال أم الحب؟", "ما هو الشيء الذي لا يمكنك العيش بدونه؟", "هل أنت مخلص؟",
    "ما هو أكبر خطأ في حياتك؟", "هل سبق أن وقعت في حب شخص لا يبادلك المشاعر؟", "ما هو أكثر شيء يثير غضبك؟",
    "هل أنت شخص غيور؟", "ما هو الشيء الذي تتمنى تغييره في ماضيك؟", "هل تثق بالآخرين بسهولة؟",
    "ما هو أكثر شيء يجعلك سعيدًا؟", "هل أنت شخص عنيد؟", "ما هو أكثر شيء يخيفك في العلاقات؟",
    "هل سبق أن تعرضت للخيانة؟", "ما هو أكبر كابوس مررت به؟", "هل تؤمن بالحب من أول نظرة؟",
    "ما هو الشيء الذي تفعله عندما تكون وحيدًا؟", "هل أنت شخص اجتماعي؟", "ما هو أسوأ قرار اتخذته؟",
    "هل تفضل العزلة أم الصخب؟", "ما هو الشيء الذي يجعل تبكي؟", "هل أنت متفائل أم متشائم؟",
    "ما هو الشيء الذي لا تستطيع فعله رغم محاولاتك؟", "من هو الشخص الذي تتمنى لو كان معك الآن؟",
    "ما هو أكثر شيء تحب أن تفعله في وقت فراغك؟", "هل أنت راضٍ عن حياتك؟"
];

// 50 dares (same as before)
const dares = [
    "قم بتقليد أحد المشاهير لمدة 30 ثانية", "أخبر نكتة مضحكة وإذا لم يضحك أحد ستقوم بعمل 10 ضغطات",
    "ارقص على أنغام أغنية عشوائية لمدة 20 ثانية", "اتصل بصديق وقل له 'أنا أحبك' بدون سياق",
    "تحدث بلكنة أجنبية لمدة دقيقتين", "قم بعمل 20 تمرين قفز", "اخرج إلى الشارع وقل 'أنا ملك العالم' بصوت عالٍ",
    "غني أغنية كاملة أمام الجميع", "قم بتصوير نفسك وأنت تأكل بصعوبة لمدة 10 ثوان",
    "قل ثلاث حقائق غريبة عن نفسك", "قم بتقليد حيوان لمدة دقيقة", "ارسم شيئًا على وجهك باستخدام قلم",
    "أرسل رسالة غريبة لشخص في قائمة اتصالاتك", "تظاهر بأنك كرسي لمدة دقيقتين", "قم بقراءة أي نص بطريقة درامية",
    "أغمض عينيك وتجول في الغرفة لمدة 10 ثوان", "قل أسوأ نكتة تعرفها", "قم بعمل حركة بهلوانية (إذا كان ذلك آمنًا)",
    "تحدث مع نفسك بصوت عالٍ لمدة دقيقة", "تحدى شخصًا آخر في لعبة شد الحبل (إذا كان متاحًا)",
    "قم بتقليد شخص مشهور يختاره الآخرون", "ارتدِ ملابس بشكل عكسي لمدة 5 دقائق", "اخرج وقل 'أنا مجنون' بصوت عالٍ",
    "اجعل شخصًا آخر يكتب شيئًا على جبينك", "قم بعمل وجه مضحك واستمر عليه لمدة 30 ثانية",
    "اتصل بأحد أقاربك وقل له 'أنا بحاجة ماسة للمال'", "تظاهر بأنك كلب لمدة دقيقة",
    "أخبر سرًا لأحد الحاضرين بصوت عالٍ (يمكن أن يكون مزيفًا)", "قم بعمل 15 ضغطة بذراع واحدة",
    "ارقص بشكل غريب لمدة دقيقة", "قل جملة 'أنا أصلع' بصوت عالٍ إذا كنت تملك شعرًا", "قم بتقليد صوت حيوان",
    "تحدث عن موضوع عشوائي لمدة دقيقة دون توقف", "اجعل شخصًا يضع مكياجًا على وجهك", "اقرأ آخر رسالة في هاتفك بصوت عالٍ",
    "تظاهر بأنك مرآة لشخص آخر لمدة دقيقة", "قل أغنية واجعل الآخرين يخمنونها", "قم بعمل حركة كوميدية",
    "تحدى شخصًا آخر في لعبة البطاطس الساخنة", "اخرج للشارع واطلب من غريب أن يصافحك", "أغمض عينيك وارسم شيئًا على الورق",
    "قل ثلاثة أشياء تحبها في كل شخص موجود", "تظاهر بأنك نائم وانتقل إلى وضعية غريبة", "قم بتقليد شخصية كرتونية",
    "أخبر قصة مخيفة", "تظاهر بأنك مصاب بفقدان الذاكرة لمدة 5 دقائق", "اجعل شخصًا يختار لك أكل شيء غريب",
    "قم بعمل 10 قفزات مع التصفيق فوق الرأس", "تحدى شخصًا في لعبة عين العين دون أن ترمش", "أغمض عينيك واجعل الآخرين يوجهونك"
];

function initTruthDare() {
    const container = document.getElementById('truthGame');
    if (container.innerHTML.trim() !== '') return;

    container.innerHTML = `
        <button class="back-home-btn" id="truthBackBtn"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title"><i class="fas fa-comment-dots"></i> حقيقة أو جرأة</div>
        
        <div class="setup-section">
            <div class="input-group">
                <label>إضافة اسم لاعب (اختياري)</label>
                <input type="text" id="playerNameInput" placeholder="اسم اللاعب">
            </div>
            <button id="addNameBtn">إضافة</button>
            <button id="randomNameBtn">اختيار اسم عشوائي</button>
        </div>
        <div class="players-list" id="playersList"></div>
        
        <div id="truthDareResult" class="result-card">اضغط على أحد الأزرار لتبدأ</div>
        <div class="truth-dare-buttons">
            <button id="getTruthBtn" class="primary">❓ حقيقة</button>
            <button id="getDareBtn" class="primary">⚠️ جرأة</button>
        </div>
    `;

    document.getElementById('truthBackBtn').addEventListener('click', () => window.showMainPage());

    let players = [];

    function updatePlayersList() {
        const listDiv = document.getElementById('playersList');
        if (players.length === 0) {
            listDiv.innerHTML = '<div class="player-tag">لا توجد أسماء مسجلة</div>';
            return;
        }
        let html = '<div><i class="fas fa-users"></i> اللاعبون:</div>';
        players.forEach((p, idx) => {
            html += `<div class="player-tag">${p} <button class="remove-player" data-idx="${idx}"><i class="fas fa-trash-alt"></i></button></div>`;
        });
        listDiv.innerHTML = html;
        document.querySelectorAll('#playersList .remove-player').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(btn.getAttribute('data-idx'));
                players.splice(idx, 1);
                updatePlayersList();
            });
        });
    }

    document.getElementById('addNameBtn').addEventListener('click', () => {
        const name = document.getElementById('playerNameInput').value.trim();
        if (name && !players.includes(name)) {
            players.push(name);
            updatePlayersList();
            document.getElementById('playerNameInput').value = '';
        }
    });

    document.getElementById('randomNameBtn').addEventListener('click', () => {
        if (players.length === 0) {
            document.getElementById('truthDareResult').innerHTML = "لا توجد أسماء مسجلة، أضف أسماء أولاً.";
            return;
        }
        const randomName = players[Math.floor(Math.random() * players.length)];
        document.getElementById('truthDareResult').innerHTML = `🎲 اللاعب المختار: ${randomName}`;
    });

    function getRandomTruth() {
        return truths[Math.floor(Math.random() * truths.length)];
    }
    function getRandomDare() {
        return dares[Math.floor(Math.random() * dares.length)];
    }

    document.getElementById('getTruthBtn').addEventListener('click', () => {
        document.getElementById('truthDareResult').innerHTML = `❓ حقيقة: ${getRandomTruth()}`;
    });
    document.getElementById('getDareBtn').addEventListener('click', () => {
        document.getElementById('truthDareResult').innerHTML = `⚠️ جرأة: ${getRandomDare()}`;
    });
}

window.initTruthDare = initTruthDare;
