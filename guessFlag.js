function initGuessFlag() {
    const container = document.getElementById('guessFlagGame');
    container.innerHTML = `
        <button class="back-home-btn" onclick="showMainPage()"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title">${lang[currentLang].game_guessFlag}</div>
        <div id="flagEmoji" class="result-card" style="font-size:5rem;">🏳️</div>
        <div id="flagOptions" class="flag-options"></div>
        <div id="flagResult" class="result-card"></div>
        <div id="flagScore" class="result-card">النقاط: 0</div>
        <button id="flagNext" class="primary">علم جديد</button>
    `;
    
    // قائمة 100 دولة (أعلام إيموجي وأسماء)
    const flags = [
        { emoji: "🇪🇬", name: "مصر" }, { emoji: "🇸🇦", name: "السعودية" }, { emoji: "🇺🇸", name: "الولايات المتحدة" },
        { emoji: "🇫🇷", name: "فرنسا" }, { emoji: "🇩🇪", name: "ألمانيا" }, { emoji: "🇧🇷", name: "البرازيل" },
        { emoji: "🇦🇷", name: "الأرجنتين" }, { emoji: "🇨🇦", name: "كندا" }, { emoji: "🇨🇳", name: "الصين" },
        { emoji: "🇷🇺", name: "روسيا" }, { emoji: "🇯🇵", name: "اليابان" }, { emoji: "🇰🇷", name: "كوريا الجنوبية" },
        { emoji: "🇮🇹", name: "إيطاليا" }, { emoji: "🇪🇸", name: "إسبانيا" }, { emoji: "🇬🇧", name: "المملكة المتحدة" },
        { emoji: "🇹🇷", name: "تركيا" }, { emoji: "🇦🇪", name: "الإمارات" }, { emoji: "🇶🇦", name: "قطر" },
        { emoji: "🇰🇼", name: "الكويت" }, { emoji: "🇴🇲", name: "عمان" }, { emoji: "🇧🇭", name: "البحرين" },
        { emoji: "🇮🇶", name: "العراق" }, { emoji: "🇸🇾", name: "سوريا" }, { emoji: "🇱🇧", name: "لبنان" },
        { emoji: "🇯🇴", name: "الأردن" }, { emoji: "🇵🇸", name: "فلسطين" }, { emoji: "🇩🇿", name: "الجزائر" },
        { emoji: "🇲🇦", name: "المغرب" }, { emoji: "🇹🇳", name: "تونس" }, { emoji: "🇱🇾", name: "ليبيا" },
        { emoji: "🇸🇩", name: "السودان" }, { emoji: "🇸🇴", name: "الصومال" }, { emoji: "🇲🇷", name: "موريتانيا" },
        { emoji: "🇾🇪", name: "اليمن" }, { emoji: "🇦🇫", name: "أفغانستان" }, { emoji: "🇵🇰", name: "باكستان" },
        { emoji: "🇮🇳", name: "الهند" }, { emoji: "🇧🇩", name: "بنغلاديش" }, { emoji: "🇮🇩", name: "إندونيسيا" },
        { emoji: "🇲🇾", name: "ماليزيا" }, { emoji: "🇹🇭", name: "تايلاند" }, { emoji: "🇻🇳", name: "فيتنام" },
        { emoji: "🇵🇭", name: "الفلبين" }, { emoji: "🇦🇺", name: "أستراليا" }, { emoji: "🇳🇿", name: "نيوزيلندا" },
        { emoji: "🇿🇦", name: "جنوب أفريقيا" }, { emoji: "🇳🇬", name: "نيجيريا" }, { emoji: "🇰🇪", name: "كينيا" },
        { emoji: "🇪🇹", name: "إثيوبيا" }, { emoji: "🇬🇭", name: "غانا" }, { emoji: "🇸🇳", name: "السنغال" }
    ];
    // نكرر لضمان العدد (أو نضيف المزيد)
    while (flags.length < 75) flags.push(...flags.slice(0, 75-flags.length));
    
    let current = 0;
    let score = 0;
    
    function loadFlag() {
        const flag = flags[current];
        document.getElementById('flagEmoji').innerHTML = flag.emoji;
        const optsDiv = document.getElementById('flagOptions');
        optsDiv.innerHTML = '';
        // اختيار 3 خيارات عشوائية مختلفة مع الخيار الصحيح
        const options = [flag.name];
        while (options.length < 4) {
            const randomFlag = flags[Math.floor(Math.random() * flags.length)].name;
            if (!options.includes(randomFlag)) options.push(randomFlag);
        }
        // خلط
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'flag-btn';
            btn.innerText = opt;
            btn.onclick = () => {
                if (opt === flag.name) {
                    score++;
                    document.getElementById('flagResult').innerHTML = '✅ صحيح!';
                } else {
                    document.getElementById('flagResult').innerHTML = `❌ خطأ! العلم هو ${flag.name}`;
                }
                document.getElementById('flagScore').innerHTML = `النقاط: ${score}`;
                document.querySelectorAll('.flag-btn').forEach(b => b.disabled = true);
            };
            optsDiv.appendChild(btn);
        });
        document.getElementById('flagResult').innerHTML = '';
    }
    
    document.getElementById('flagNext').onclick = () => {
        current = (current + 1) % flags.length;
        loadFlag();
    };
    loadFlag();
}
