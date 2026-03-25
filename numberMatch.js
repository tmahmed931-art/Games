function initNumberMatch() {
    const container = document.getElementById('numbermatchGame');
    if (container.innerHTML.trim() !== '') return;

    container.innerHTML = `
        <button class="back-home-btn" id="nmBackBtn"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title"><i class="fas fa-calculator"></i> تطابق الأرقام</div>
        <div id="nmBoard" class="number-match-board"></div>
        <div id="nmStatus" class="result-card"></div>
        <button id="nmResetBtn" class="primary">🔄 إعادة</button>
    `;

    document.getElementById('nmBackBtn').addEventListener('click', () => window.showMainPage());

    const pairs = [
        { text: "2+2", value: "4" },
        { text: "3+4", value: "7" },
        { text: "5+5", value: "10" },
        { text: "1+3", value: "4" },
        { text: "6+2", value: "8" },
        { text: "9+1", value: "10" },
        { text: "7+3", value: "10" },
        { text: "4+5", value: "9" },
        { text: "2+6", value: "8" },
        { text: "8+2", value: "10" }
    ];

    let cards = [];
    let flipped = [];
    let lock = false;
    let matched = 0;

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function initGame() {
        const items = [];
        pairs.forEach((p, idx) => {
            items.push({ id: idx * 2, type: 'text', content: p.text, pairId: idx });
            items.push({ id: idx * 2 + 1, type: 'value', content: p.value, pairId: idx });
        });
        cards = shuffle(items).map(card => ({ ...card, flipped: false, matched: false }));
        flipped = [];
        lock = false;
        matched = 0;
        renderBoard();
        document.getElementById('nmStatus').innerHTML = 'طابق العملية مع النتيجة الصحيحة';
    }

    function renderBoard() {
        const boardDiv = document.getElementById('nmBoard');
        boardDiv.innerHTML = '';
        cards.forEach((card, idx) => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'number-match-card';
            if (card.flipped || card.matched) {
                cardDiv.textContent = card.content;
            } else {
                cardDiv.textContent = '?';
            }
            if (card.matched) cardDiv.style.background = '#2e5f3a';
            cardDiv.addEventListener('click', () => flipCard(idx));
            boardDiv.appendChild(cardDiv);
        });
    }

    function flipCard(idx) {
        if (lock) return;
        const card = cards[idx];
        if (card.matched || card.flipped) return;

        card.flipped = true;
        renderBoard();
        flipped.push(idx);

        if (flipped.length === 2) {
            lock = true;
            checkMatch();
        }
    }

    function checkMatch() {
        const [i1, i2] = flipped;
        const card1 = cards[i1];
        const card2 = cards[i2];

        if (card1.pairId === card2.pairId) {
            card1.matched = true;
            card2.matched = true;
            matched++;
            flipped = [];
            lock = false;
            renderBoard();
            if (matched === pairs.length) {
                document.getElementById('nmStatus').innerHTML = '🎉 لقد فزت! أكملت جميع الأزواج. 🎉';
            }
        } else {
            setTimeout(() => {
                card1.flipped = false;
                card2.flipped = false;
                flipped = [];
                lock = false;
                renderBoard();
            }, 800);
        }
    }

    document.getElementById('nmResetBtn').addEventListener('click', initGame);
    initGame();
}
window.initNumberMatch = initNumberMatch;
