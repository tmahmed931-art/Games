function initGuessFlag() {
    const container = document.getElementById('guessFlagGame');
    container.innerHTML = `
        <button class="back-home-btn" onclick="showMainPage()"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title">${lang[currentLang].game_guessFlag}</div>
        <div id="flagEmoji" class="result-card" style="font-size:5rem; font-family: 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', sans-serif;">🏳️</div>
        <div id="flagOptions" class="flag-options"></div>
        <div id="flagResult" class="result-card"></div>
        <div id="flagScore" class="result-card">النقاط: 0</div>
        <button id="flagNext" class="primary">علم جديد</button>
    `;

    // قائمة شاملة بجميع دول العالم (معترف بها من الأمم المتحدة + بعض الدول المتنازع عليها)
    const allFlags = [
        { emoji: "🇪🇬", name: "مصر" }, { emoji: "🇸🇦", name: "السعودية" }, { emoji: "🇺🇸", name: "الولايات المتحدة" },
        { emoji: "🇫🇷", name: "فرنسا" }, { emoji: "🇩🇪", name: "ألمانيا" }, { emoji: "🇬🇧", name: "المملكة المتحدة" },
        { emoji: "🇨🇳", name: "الصين" }, { emoji: "🇷🇺", name: "روسيا" }, { emoji: "🇯🇵", name: "اليابان" },
        { emoji: "🇰🇷", name: "كوريا الجنوبية" }, { emoji: "🇮🇳", name: "الهند" }, { emoji: "🇧🇷", name: "البرازيل" },
        { emoji: "🇮🇹", name: "إيطاليا" }, { emoji: "🇪🇸", name: "إسبانيا" }, { emoji: "🇹🇷", name: "تركيا" },
        { emoji: "🇦🇪", name: "الإمارات" }, { emoji: "🇶🇦", name: "قطر" }, { emoji: "🇰🇼", name: "الكويت" },
        { emoji: "🇴🇲", name: "عمان" }, { emoji: "🇧🇭", name: "البحرين" }, { emoji: "🇮🇶", name: "العراق" },
        { emoji: "🇸🇾", name: "سوريا" }, { emoji: "🇱🇧", name: "لبنان" }, { emoji: "🇯🇴", name: "الأردن" },
        { emoji: "🇵🇸", name: "فلسطين" }, { emoji: "🇩🇿", name: "الجزائر" }, { emoji: "🇲🇦", name: "المغرب" },
        { emoji: "🇹🇳", name: "تونس" }, { emoji: "🇱🇾", name: "ليبيا" }, { emoji: "🇸🇩", name: "السودان" },
        { emoji: "🇸🇴", name: "الصومال" }, { emoji: "🇲🇷", name: "موريتانيا" }, { emoji: "🇾🇪", name: "اليمن" },
        { emoji: "🇦🇫", name: "أفغانستان" }, { emoji: "🇵🇰", name: "باكستان" }, { emoji: "🇧🇩", name: "بنغلاديش" },
        { emoji: "🇮🇩", name: "إندونيسيا" }, { emoji: "🇲🇾", name: "ماليزيا" }, { emoji: "🇹🇭", name: "تايلاند" },
        { emoji: "🇻🇳", name: "فيتنام" }, { emoji: "🇵🇭", name: "الفلبين" }, { emoji: "🇦🇺", name: "أستراليا" },
        { emoji: "🇳🇿", name: "نيوزيلندا" }, { emoji: "🇿🇦", name: "جنوب أفريقيا" }, { emoji: "🇳🇬", name: "نيجيريا" },
        { emoji: "🇰🇪", name: "كينيا" }, { emoji: "🇪🇹", name: "إثيوبيا" }, { emoji: "🇬🇭", name: "غانا" },
        { emoji: "🇸🇳", name: "السنغال" }, { emoji: "🇸🇪", name: "السويد" }, { emoji: "🇳🇴", name: "النرويج" },
        { emoji: "🇩🇰", name: "الدنمارك" }, { emoji: "🇫🇮", name: "فنلندا" }, { emoji: "🇮🇸", name: "آيسلندا" },
        { emoji: "🇳🇱", name: "هولندا" }, { emoji: "🇧🇪", name: "بلجيكا" }, { emoji: "🇨🇭", name: "سويسرا" },
        { emoji: "🇦🇹", name: "النمسا" }, { emoji: "🇨🇿", name: "التشيك" }, { emoji: "🇵🇱", name: "بولندا" },
        { emoji: "🇭🇺", name: "المجر" }, { emoji: "🇷🇴", name: "رومانيا" }, { emoji: "🇧🇬", name: "بلغاريا" },
        { emoji: "🇬🇷", name: "اليونان" }, { emoji: "🇵🇹", name: "البرتغال" }, { emoji: "🇮🇪", name: "أيرلندا" },
        { emoji: "🇲🇽", name: "المكسيك" }, { emoji: "🇨🇴", name: "كولومبيا" }, { emoji: "🇻🇪", name: "فنزويلا" },
        { emoji: "🇵🇪", name: "بيرو" }, { emoji: "🇨🇱", name: "تشيلي" }, { emoji: "🇺🇾", name: "الأوروغواي" },
        { emoji: "🇵🇾", name: "باراغواي" }, { emoji: "🇧🇴", name: "بوليفيا" }, { emoji: "🇪🇨", name: "الإكوادور" },
        { emoji: "🇨🇷", name: "كوستاريكا" }, { emoji: "🇵🇦", name: "بنما" }, { emoji: "🇨🇺", name: "كوبا" },
        { emoji: "🇩🇴", name: "جمهورية الدومينيكان" }, { emoji: "🇵🇷", name: "بورتوريكو" }, { emoji: "🇸🇻", name: "السلفادور" },
        { emoji: "🇭🇳", name: "هندوراس" }, { emoji: "🇳🇮", name: "نيكاراغوا" }, { emoji: "🇬🇹", name: "غواتيمالا" },
        { emoji: "🇧🇿", name: "بليز" }, { emoji: "🇯🇲", name: "جامايكا" }, { emoji: "🇭🇹", name: "هايتي" },
        { emoji: "🇧🇸", name: "البهاما" }, { emoji: "🇹🇹", name: "ترينيداد وتوباغو" }, { emoji: "🇧🇧", name: "باربادوس" },
        { emoji: "🇱🇨", name: "سانت لوسيا" }, { emoji: "🇻🇨", name: "سانت فينسنت والغرينادين" }, { emoji: "🇬🇩", name: "غرينادا" },
        { emoji: "🇦🇬", name: "أنتيغوا وبربودا" }, { emoji: "🇰🇳", name: "سانت كيتس ونيفيس" }, { emoji: "🇫🇯", name: "فيجي" },
        { emoji: "🇵🇬", name: "بابوا غينيا الجديدة" }, { emoji: "🇻🇺", name: "فانواتو" }, { emoji: "🇸🇧", name: "جزر سليمان" },
        { emoji: "🇦🇲", name: "أرمينيا" }, { emoji: "🇦🇿", name: "أذربيجان" }, { emoji: "🇧🇾", name: "بيلاروسيا" },
        { emoji: "🇬🇪", name: "جورجيا" }, { emoji: "🇰🇿", name: "كازاخستان" }, { emoji: "🇰🇬", name: "قيرغيزستان" },
        { emoji: "🇲🇩", name: "مولدافيا" }, { emoji: "🇹🇯", name: "طاجيكستان" }, { emoji: "🇹🇲", name: "تركمانستان" },
        { emoji: "🇺🇦", name: "أوكرانيا" }, { emoji: "🇺🇿", name: "أوزبكستان" }, { emoji: "🇱🇻", name: "لاتفيا" },
        { emoji: "🇱🇹", name: "ليتوانيا" }, { emoji: "🇪🇪", name: "إستونيا" }, { emoji: "🇦🇱", name: "ألبانيا" },
        { emoji: "🇧🇦", name: "البوسنة والهرسك" }, { emoji: "🇭🇷", name: "كرواتيا" }, { emoji: "🇲🇰", name: "مقدونيا الشمالية" },
        { emoji: "🇲🇪", name: "الجبل الأسود" }, { emoji: "🇷🇸", name: "صربيا" }, { emoji: "🇸🇮", name: "سلوفينيا" },
        { emoji: "🇸🇰", name: "سلوفاكيا" }, { emoji: "🇨🇾", name: "قبرص" }, { emoji: "🇲🇹", name: "مالطا" },
        { emoji: "🇱🇺", name: "لوكسمبورغ" }, { emoji: "🇲🇨", name: "موناكو" }, { emoji: "🇱🇮", name: "ليختنشتاين" },
        { emoji: "🇸🇲", name: "سان مارينو" }, { emoji: "🇻🇦", name: "الفاتيكان" }, { emoji: "🇦🇩", name: "أندورا" },
        { emoji: "🇪🇷", name: "إريتريا" }, { emoji: "🇩🇯", name: "جيبوتي" }, { emoji: "🇰🇲", name: "جزر القمر" },
        { emoji: "🇲🇬", name: "مدغشقر" }, { emoji: "🇲🇼", name: "مالاوي" }, { emoji: "🇲🇺", name: "موريشيوس" },
        { emoji: "🇲🇿", name: "موزمبيق" }, { emoji: "🇳🇦", name: "ناميبيا" }, { emoji: "🇳🇪", name: "النيجر" },
        { emoji: "🇷🇼", name: "رواندا" }, { emoji: "🇸🇨", name: "سيشل" }, { emoji: "🇸🇱", name: "سيراليون" },
        { emoji: "🇸🇸", name: "جنوب السودان" }, { emoji: "🇸🇿", name: "إسواتيني" }, { emoji: "🇹🇬", name: "توغو" },
        { emoji: "🇺🇬", name: "أوغندا" }, { emoji: "🇹🇿", name: "تنزانيا" }, { emoji: "🇿🇲", name: "زامبيا" },
        { emoji: "🇿🇼", name: "زيمبابوي" }, { emoji: "🇧🇯", name: "بنين" }, { emoji: "🇧🇫", name: "بوركينا فاسو" },
        { emoji: "🇨🇲", name: "الكاميرون" }, { emoji: "🇨🇻", name: "الرأس الأخضر" }, { emoji: "🇨🇫", name: "جمهورية أفريقيا الوسطى" },
        { emoji: "🇹🇩", name: "تشاد" }, { emoji: "🇬🇶", name: "غينيا الاستوائية" }, { emoji: "🇬🇦", name: "الغابون" },
        { emoji: "🇬🇲", name: "غامبيا" }, { emoji: "🇬🇳", name: "غينيا" }, { emoji: "🇬🇼", name: "غينيا بيساو" },
        { emoji: "🇱🇷", name: "ليبيريا" }, { emoji: "🇲🇱", name: "مالي" }, { emoji: "🇲🇳", name: "منغوليا" },
        { emoji: "🇲🇲", name: "ميانمار" }, { emoji: "🇳🇵", name: "نيبال" }, { emoji: "🇰🇵", name: "كوريا الشمالية" },
        { emoji: "🇱🇦", name: "لاوس" }, { emoji: "🇰🇭", name: "كمبوديا" }, { emoji: "🇧🇳", name: "بروناي" },
        { emoji: "🇹🇱", name: "تيمور الشرقية" }, { emoji: "🇼🇸", name: "ساموا" }, { emoji: "🇰🇮", name: "كيريباتي" },
        { emoji: "🇲🇭", name: "جزر مارشال" }, { emoji: "🇫🇲", name: "ولايات ميكرونيسيا الموحدة" }, { emoji: "🇳🇷", name: "ناورو" },
        { emoji: "🇵🇼", name: "بالاو" }, { emoji: "🇹🇻", name: "توفالو" }, { emoji: "🇹🇴", name: "تونغا" }
    ];

    let flags = [...allFlags];
    let current = 0, score = 0;

    // دالة تحميل العلم
    function loadFlag() {
        const flag = flags[current];
        const flagDiv = document.getElementById('flagEmoji');
        // عرض الإيموجي مباشرة
        flagDiv.innerHTML = flag.emoji;
        // يمكنك إضافة صورة احتياطية إذا لم يظهر الإيموجي:
        // flagDiv.innerHTML = `<img src="https://flagpedia.net/data/flags/icon/72x54/${getCountryCode(flag.name)}.png" alt="${flag.name}" style="width: 100px; height: auto;">`;
        
        const optsDiv = document.getElementById('flagOptions');
        optsDiv.innerHTML = '';
        
        // اختيار 3 خيارات عشوائية مع الخيار الصحيح
        const options = [flag.name];
        while (options.length < 4) {
            const randomFlag = flags[Math.floor(Math.random() * flags.length)].name;
            if (!options.includes(randomFlag)) options.push(randomFlag);
        }
        // خلط الخيارات
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

    // حدث زر "علم جديد"
    document.getElementById('flagNext').onclick = () => {
        current = (current + 1) % flags.length;
        loadFlag();
    };
    
    loadFlag();
}
