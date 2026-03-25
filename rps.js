function initRPS() {
    const container = document.getElementById('rpsGame');
    if (container.innerHTML.trim() !== '') return;

    container.innerHTML = `
        <button class="back-home-btn" id="rpsBackBtn"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title"><i class="fas fa-hand-rock"></i> حجر ورقة مقص</div>
        <div class="setup-section" style="justify-content: center; gap: 1rem;">
            <button id="rockBtn" class="primary"><i class="fas fa-hand-rock"></i> حجر</button>
            <button id="paperBtn" class="primary"><i class="fas fa-hand-paper"></i> ورقة</button>
            <button id="scissorsBtn" class="primary"><i class="fas fa-hand-peace"></i> مقص</button>
        </div>
        <div id="rpsResult" class="result-card"></div>
    `;

    document.getElementById('rpsBackBtn').addEventListener('click', () => window.showMainPage());

    const choices = ['حجر', 'ورقة', 'مقص'];
    const emojis = { 'حجر': '🪨', 'ورقة': '📄', 'مقص': '✂️' };

    function play(playerChoice) {
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        let result = '';
        if (playerChoice === computerChoice) result = 'تعادل!';
        else if (
            (playerChoice === 'حجر' && computerChoice === 'مقص') ||
            (playerChoice === 'ورقة' && computerChoice === 'حجر') ||
            (playerChoice === 'مقص' && computerChoice === 'ورقة')
        ) {
            result = 'فزت! 🎉';
        } else {
            result = 'خسرت! 😭';
        }
        document.getElementById('rpsResult').innerHTML = `
            أنت اخترت: ${emojis[playerChoice]} ${playerChoice}<br>
            الحاسوب اختار: ${emojis[computerChoice]} ${computerChoice}<br>
            <strong>${result}</strong>
        `;
    }

    document.getElementById('rockBtn').onclick = () => play('حجر');
    document.getElementById('paperBtn').onclick = () => play('ورقة');
    document.getElementById('scissorsBtn').onclick = () => play('مقص');
}

window.initRPS = initRPS;
