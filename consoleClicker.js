function initConsoleClicker() {
    const container = document.getElementById('consoleClickerGame');
    container.innerHTML = `
        <button class="back-home-btn" onclick="showMainPage()"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title">${lang[currentLang].game_consoleClicker}</div>
        <div class="clicker-display" id="clickerPoints">0</div>
        <button id="clickerBtn" class="primary" style="font-size:2rem; padding:1rem;">🎮 انقر للعب 🎮</button>
        <div id="clickerUpgrades" class="setup-section"></div>
    `;
    
    let points = 0;
    let autoClickers = 0;
    let intervalId = null;
    
    const pointsSpan = document.getElementById('clickerPoints');
    const upgradesDiv = document.getElementById('clickerUpgrades');
    
    function updateUI() {
        pointsSpan.innerText = Math.floor(points);
        upgradesDiv.innerHTML = `
            <button id="buyAuto" class="primary">شراء مُنقر تلقائي (100 نقطة)</button>
            <span style="margin-right:10px;">لديك: ${autoClickers}</span>
        `;
        const buyBtn = document.getElementById('buyAuto');
        if (buyBtn) {
            buyBtn.addEventListener('click', () => {
                if (points >= 100) {
                    points -= 100;
                    autoClickers++;
                    updateUI();
                } else {
                    alert('ليس لديك نقاط كافية!');
                }
            });
        }
    }
    
    // نقطة تلقائية كل ثانية
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
        if (autoClickers > 0) {
            points += autoClickers * 0.5;
            updateUI();
        }
    }, 1000);
    
    document.getElementById('clickerBtn').addEventListener('click', () => {
        points++;
        updateUI();
    });
    
    updateUI();
}
