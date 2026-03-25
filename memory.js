function initMemory() {
    const container = document.getElementById('memoryGame');
    if (container.innerHTML.trim() !== '') return;

    container.innerHTML = `
        <button class="back-home-btn" id="memBackBtn"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title"><i class="fas fa-cards"></i> تطابق الذاكرة</div>
        <div id="memoryBoard" class="memory-board"></div>
        <div id="memoryStatus" class="result-card"></div>
        <button id="memoryResetBtn" class="primary">🔄 إعادة اللعبة</button>
    `;

    document.getElementById('memBackBtn').addEventListener('click', () => window.showMainPage());

    const emojis = ['🐱', '🐶', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
    let cards = [];
    let flippedIndices = [];
    let lockBoard = false;
    let matchedPairs = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function initGame() {
        // Create cards: each emoji appears twice
        let deck = [];
        emojis.forEach(emoji => {
            deck.push({ emoji, matched: false, flipped: false });
            deck.push({ emoji, matched: false, flipped: false });
        });
        cards = shuffle(deck);
        flippedIndices = [];
        lockBoard = false;
        matchedPairs = 0;
        renderBoard();
        document.getElementById('memoryStatus').innerHTML = `ابحث عن الأزواج المتطابقة!`;
    }

    function renderBoard() {
        const boardDiv = document.getElementById('memoryBoard');
        boardDiv.innerHTML = '';
        cards.forEach((card, idx) => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'memory-card';
            if (card.flipped || card.matched) {
                cardDiv.classList.add('flipped');
                cardDiv.textContent = card.emoji;
            } else {
                cardDiv.textContent = '?';
            }
            if (card.matched) cardDiv.classList.add('matched');
            cardDiv.addEventListener('click', () => flipCard(idx));
            boardDiv.appendChild(cardDiv);
        });
    }

    function flipCard(index) {
        if (lockBoard) return;
        const card = cards[index];
        if (card.matched || card.flipped) return;

        card.flipped = true;
        renderBoard();

        flippedIndices.push(index);
        if (flippedIndices.length === 2) {
            lockBoard = true;
            checkMatch();
        }
    }

    function checkMatch() {
        const [i1, i2] = flippedIndices;
        const card1 = cards[i1];
        const card2 = cards[i2];

        if (card1.emoji === card2.emoji) {
            card1.matched = true;
            card2.matched = true;
            matchedPairs++;
            flippedIndices = [];
            lockBoard = false;
            renderBoard();
            if (matchedPairs === emojis.length) {
                document.getElementById('memoryStatus').innerHTML = `🎉 لقد فزت! أكملت جميع الأزواج. 🎉`;
            }
        } else {
            setTimeout(() => {
                card1.flipped = false;
                card2.flipped = false;
                flippedIndices = [];
                lockBoard = false;
                renderBoard();
            }, 800);
        }
    }

    function resetGame() {
        initGame();
    }

    document.getElementById('memoryResetBtn').addEventListener('click', resetGame);
    initGame();
}
window.initMemory = initMemory;
