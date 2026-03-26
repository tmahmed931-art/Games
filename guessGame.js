function initGuessGame() {
    const container = document.getElementById('guessGameGame');
    container.innerHTML = `
        <button class="back-home-btn" onclick="showMainPage()"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title">${lang[currentLang].game_guessGame}</div>
        <div id="guessDesc" class="result-card">وصف اللعبة...</div>
        <input type="text" id="guessInput" placeholder="أدخل اسم اللعبة">
        <button id="guessSubmit" class="primary">خمّن</button>
        <div id="guessResult" class="result-card"></div>
        <button id="guessNext" class="primary">لعبة جديدة</button>
    `;
    const games = [
        { desc: "لعبة منصات شهيرة مع سباك إيطالي", name: "سوبر ماريو" },
        { desc: "لعبة بناء عالم مفتوح مليئة بالمكعبات", name: "ماين كرافت" },
        { desc: "بطلها كرتوني أزرق سريع", name: "سونيك" },
        { desc: "لعبة معركة ملكية شهيرة", name: "فورتنايت" }
    ];
    let current = 0;

    function loadGame() {
        document.getElementById('guessDesc').innerHTML = games[current].desc;
        document.getElementById('guessInput').value = '';
        document.getElementById('guessResult').innerHTML = '';
    }

    document.getElementById('guessSubmit').onclick = () => {
        const answer = document.getElementById('guessInput').value.trim();
        if (answer.toLowerCase() === games[current].name.toLowerCase()) {
            document.getElementById('guessResult').innerHTML = '✅ صحيح!';
        } else {
            document.getElementById('guessResult').innerHTML = `❌ خطأ! الإجابة: ${games[current].name}`;
        }
    };
    document.getElementById('guessNext').onclick = () => {
        current = (current + 1) % games.length;
        loadGame();
    };
    loadGame();
}
