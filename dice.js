function initDice() {
    const container = document.getElementById('diceGame');
    if (container.innerHTML.trim() !== '') return;

    container.innerHTML = `
        <button class="back-home-btn" id="diceBackBtn"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title"><i class="fas fa-dice-d6"></i> مباراة النرد</div>
        <div class="setup-section">
            <div class="input-group"><label>اسم اللاعب 1</label><input type="text" id="dicePlayer1" placeholder="أحمد"></div>
            <div class="input-group"><label>اسم اللاعب 2</label><input type="text" id="dicePlayer2" placeholder="سارة"></div>
            <button id="rollDiceBtn" class="primary"><i class="fas fa-dice"></i> رمي النرد</button>
        </div>
        <div id="diceResult" class="log-area"></div>
    `;

    document.getElementById('diceBackBtn').addEventListener('click', () => window.showMainPage());

    const rollBtn = document.getElementById('rollDiceBtn');
    const resultDiv = document.getElementById('diceResult');
    const p1Input = document.getElementById('dicePlayer1');
    const p2Input = document.getElementById('dicePlayer2');

    rollBtn.addEventListener('click', () => {
        const p1Name = p1Input.value.trim() || "اللاعب 1";
        const p2Name = p2Input.value.trim() || "اللاعب 2";
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        let msg = `<strong>${p1Name}</strong> حصل على 🎲 ${dice1}<br><strong>${p2Name}</strong> حصل على 🎲 ${dice2}<br>`;
        if (dice1 > dice2) msg += `🏆 الفائز: ${p1Name}`;
        else if (dice2 > dice1) msg += `🏆 الفائز: ${p2Name}`;
        else msg += `🤝 تعادل!`;
        resultDiv.innerHTML = msg;
    });
}

window.initDice = initDice;
