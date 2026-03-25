function initWordChain() {
    const container = document.getElementById('wordchainGame');
    if (container.innerHTML.trim() !== '') return;

    container.innerHTML = `
        <button class="back-home-btn" id="wcBackBtn"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title"><i class="fas fa-link"></i> سلسلة الكلمات</div>
        <div id="wcStatus" class="result-card">ابدأ اللعبة!</div>
        <div class="word-chain-input">
            <input type="text" id="wcWordInput" placeholder="أدخل كلمة">
            <button id="wcSubmitBtn" class="primary">أضف كلمة</button>
        </div>
        <button id="wcResetBtn" class="primary">إعادة اللعبة</button>
        <div id="wcList" class="log-area" style="margin-top:1rem;"></div>
    `;

    document.getElementById('wcBackBtn').addEventListener('click', () => window.showMainPage());

    let words = [];
    let lastLetter = '';

    function updateDisplay() {
        const listDiv = document.getElementById('wcList');
        if (words.length === 0) {
            listDiv.innerHTML = 'لا توجد كلمات بعد. ابدأ بكلمة!';
            return;
        }
        listDiv.innerHTML = words.map(w => `📝 ${w}`).join('<br>');
    }

    function isValidWord(word) {
        if (words.length === 0) return true;
        const firstLetter = word.charAt(0);
        return firstLetter === lastLetter;
    }

    function addWord() {
        const input = document.getElementById('wcWordInput');
        const word = input.value.trim();
        if (!word) {
            document.getElementById('wcStatus').innerHTML = '❌ أدخل كلمة صحيحة';
            return;
        }
        if (!isValidWord(word)) {
            document.getElementById('wcStatus').innerHTML = `❌ الكلمة يجب أن تبدأ بحرف "${lastLetter}"`;
            return;
        }
        words.push(word);
        lastLetter = word.charAt(word.length - 1);
        input.value = '';
        updateDisplay();
        document.getElementById('wcStatus').innerHTML = `✅ تمت الإضافة! الحرف التالي: "${lastLetter}"`;
    }

    function resetGame() {
        words = [];
        lastLetter = '';
        updateDisplay();
        document.getElementById('wcStatus').innerHTML = 'تم إعادة اللعبة. ابدأ بكلمة جديدة!';
        document.getElementById('wcWordInput').value = '';
    }

    document.getElementById('wcSubmitBtn').addEventListener('click', addWord);
    document.getElementById('wcResetBtn').addEventListener('click', resetGame);
    updateDisplay();
}
window.initWordChain = initWordChain;
