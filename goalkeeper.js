function initGoalkeeper() {
    const container = document.getElementById('goalkeeperGame');
    container.innerHTML = `
        <button class="back-home-btn" onclick="showMainPage()"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title">${lang[currentLang].game_goalkeeper}</div>
        <div class="goal-area">
            <div class="goal-part" data-side="left">← يسار</div>
            <div class="goal-part" data-side="center">وسط</div>
            <div class="goal-part" data-side="right">يمين →</div>
        </div>
        <div id="gkStatus" class="result-card">استعد لصد الكرة!</div>
        <div id="gkScore" class="result-card">تم التصدي: 0</div>
        <button id="gkReset" class="primary">إعادة</button>
    `;
    let score = 0;
    let active = true;
    const statusDiv = document.getElementById('gkStatus');
    const scoreDiv = document.getElementById('gkScore');

    function shoot() {
        if (!active) return;
        const sides = ['left', 'center', 'right'];
        const shotSide = sides[Math.floor(Math.random() * 3)];
        statusDiv.innerHTML = `تسديدة نحو ${shotSide}! انقر على الجانب المناسب بسرعة.`;
        // انتظر رد المستخدم لمدة 1.5 ثانية
        const timeout = setTimeout(() => {
            if (active) {
                statusDiv.innerHTML = `فوت الفرصة! الهدف.`;
                active = false;
                setTimeout(() => { active = true; shoot(); }, 1500);
            }
        }, 1500);
        // ربط مؤقت للاستجابة
        const parts = document.querySelectorAll('.goal-part');
        const handler = (e) => {
            const side = e.currentTarget.getAttribute('data-side');
            if (side === shotSide) {
                clearTimeout(timeout);
                score++;
                statusDiv.innerHTML = `تصدي رائع! أنقذت الكرة.`;
                scoreDiv.innerHTML = `تم التصدي: ${score}`;
            } else {
                clearTimeout(timeout);
                statusDiv.innerHTML = `اخترت الجانب الخطأ! هدف.`;
            }
            parts.forEach(p => p.removeEventListener('click', handler));
            active = true;
            setTimeout(() => shoot(), 1000);
        };
        parts.forEach(p => p.addEventListener('click', handler));
    }

    document.getElementById('gkReset').onclick = () => {
        score = 0;
        scoreDiv.innerHTML = `تم التصدي: 0`;
        statusDiv.innerHTML = `استعد لصد الكرة!`;
        active = true;
        shoot();
    };
    shoot();
}
