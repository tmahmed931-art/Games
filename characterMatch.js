function initCharacterMatch() {
    const container = document.getElementById('characterMatchGame');
    container.innerHTML = `
        <button class="back-home-btn" onclick="showMainPage()"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title">${lang[currentLang].game_characterMatch}</div>
        <div class="number-match-board" id="charBoard"></div>
        <div id="charStatus" class="result-card">ابحث عن الأزواج المتشابهة</div>
        <button id="charReset" class="primary">إعادة</button>
    `;
    
    // قائمة شخصيات الألعاب (12 شخصية -> 24 بطاقة)
    const characters = [
        "ماريو", "سونيك", "كراش", "لارا كروفت", 
        "ماستر تشيف", "كيره", "بايمان", "سايلنت هيل",
        "جوكر", "كيتانا", "سكorpion", "سوب زيرو"
    ];
    
    let cards = [];
    let flipped = [];
    let matched = [];
    let lock = false;
    let timeoutId = null;

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function initCards() {
        cards = shuffleArray([...characters, ...characters]);
        flipped = [];
        matched = [];
        lock = false;
        if (timeoutId) clearTimeout(timeoutId);
    }

    function render() {
        const board = document.getElementById('charBoard');
        board.innerHTML = '';
        cards.forEach((card, idx) => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'number-match-card';
            if (matched.includes(idx)) {
                cardDiv.innerHTML = '✓';
                cardDiv.style.background = '#2ecc71';
                cardDiv.style.cursor = 'default';
            } else if (flipped.includes(idx)) {
                cardDiv.innerHTML = card;
                cardDiv.style.background = '#3498db';
            } else {
                cardDiv.innerHTML = '?';
                cardDiv.style.background = '#1b2033';
            }
            cardDiv.addEventListener('click', () => {
                if (lock) return;
                if (matched.includes(idx) || flipped.includes(idx)) return;
                
                flipped.push(idx);
                render();
                
                if (flipped.length === 2) {
                    lock = true;
                    const [i1, i2] = flipped;
                    if (cards[i1] === cards[i2]) {
                        matched.push(i1, i2);
                        flipped = [];
                        lock = false;
                        render();
                        if (matched.length === cards.length) {
                            document.getElementById('charStatus').innerHTML = '🎉 لقد أكملت اللعبة! 🎉';
                        }
                    } else {
                        timeoutId = setTimeout(() => {
                            flipped = [];
                            lock = false;
                            render();
                            timeoutId = null;
                        }, 1000);
                    }
                }
            });
            board.appendChild(cardDiv);
        });
    }

    function resetGame() {
        initCards();
        render();
        document.getElementById('charStatus').innerHTML = 'ابحث عن الأزواج المتشابهة';
    }

    document.getElementById('charReset').addEventListener('click', resetGame);
    initCards();
    render();
}
