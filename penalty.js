function initPenalty() {
    const container = document.getElementById('penaltyGame');
    container.innerHTML = `
        <button class="back-home-btn" onclick="showMainPage()"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title">${lang[currentLang].game_penalty}</div>
        <div class="result-card" id="penaltyStatus">اختر اتجاه التسديدة</div>
        <div class="penalty-area">
            <button id="penaltyLeft" class="primary penalty-btn">يسار</button>
            <button id="penaltyCenter" class="primary penalty-btn">وسط</button>
            <button id="penaltyRight" class="primary penalty-btn">يمين</button>
        </div>
        <div id="penaltyScore" class="result-card">نقاطك: 0</div>
        <button id="penaltyReset" class="primary">إعادة</button>
    `;
    let score = 0;
    const statusDiv = document.getElementById('penaltyStatus');
    const scoreDiv = document.getElementById('penaltyScore');

    function shoot(direction) {
        const keeperDirection = ['left', 'center', 'right'][Math.floor(Math.random() * 3)];
        let result = '';
        if (direction === keeperDirection) {
            result = '❌ تصدي الحارس!';
        } else {
            result = '⚽ هدف!';
            score++;
        }
        statusDiv.innerHTML = `تسديدتك: ${direction} - الحارس: ${keeperDirection}<br>${result}`;
        scoreDiv.innerHTML = `نقاطك: ${score}`;
    }

    document.getElementById('penaltyLeft').onclick = () => shoot('left');
    document.getElementById('penaltyCenter').onclick = () => shoot('center');
    document.getElementById('penaltyRight').onclick = () => shoot('right');
    document.getElementById('penaltyReset').onclick = () => {
        score = 0;
        scoreDiv.innerHTML = `نقاطك: 0`;
        statusDiv.innerHTML = 'اختر اتجاه التسديدة';
    };
}
