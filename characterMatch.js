function initCharacterMatch() {
    const container = document.getElementById('characterMatchGame');
    container.innerHTML = `
        <button class="back-home-btn" onclick="showMainPage()"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title">${lang[currentLang].game_characterMatch}</div>
        <div class="number-match-board" id="charBoard"></div>
        <div id="charStatus" class="result-card">ابحث عن الأزواج المتشابهة</div>
        <button id="charReset" class="primary">إعادة</button>
    `;
    const characters = ["ماريو", "سونيك", "كراش", "لارا كروفت", "ماستر تشيف", "كيره"];
    let cards = [...characters, ...characters];
    let flipped = [];
    let matched = [];
    let lock = false;

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function render() {
        const board = document.getElementById('charBoard');
        board.innerHTML = '';
        cards.forEach((card, idx) => {
            const div = document.createElement('div');
            div.className = 'number-match-card';
            if (matched.includes(idx)) {
                div.innerHTML = '✓';
                div.style.background = '#2ecc71';
            } else if (flipped.includes(idx)) {
                div.innerHTML = card;
            } else {
                div.innerHTML = '?';
            }
            div.onclick = () => {
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
                        setTimeout(() => {
                            flipped = [];
                            lock = false;
                            render();
                        }, 1000);
                    }
                }
            };
            board.appendChild(div);
        });
    }

    function reset() {
        cards = shuffle([...characters, ...characters]);
        flipped = [];
        matched = [];
        lock = false;
        render();
        document.getElementById('charStatus').innerHTML = 'ابحث عن الأزواج المتشابهة';
    }

    document.getElementById('charReset').onclick = reset;
    reset();
}
