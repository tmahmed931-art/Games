function initMonopoly() {
    const container = document.getElementById('monopolyGame');
    if (container.innerHTML.trim() !== '') return;

    container.innerHTML = `
        <button class="back-home-btn" id="mpBackBtn"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title"><i class="fas fa-building"></i> بنك الحظ (مونوبولي مبسط)</div>
        <div id="mpInfo" class="result-card">💰 رصيدك: 1500</div>
        <div id="mpBoard" class="monopoly-board"></div>
        <button id="mpRollBtn" class="primary">🎲 رمي النرد</button>
        <button id="mpResetBtn" class="primary">🔄 إعادة اللعبة</button>
        <div id="mpLog" class="log-area"></div>
    `;

    document.getElementById('mpBackBtn').addEventListener('click', () => window.showMainPage());

    const properties = [
        { name: "المنزل", price: 60, rent: 20, owner: null },
        { name: "المتجر", price: 100, rent: 40, owner: null },
        { name: "المدرسة", price: 140, rent: 60, owner: null },
        { name: "المستشفى", price: 180, rent: 80, owner: null },
        { name: "المصنع", price: 220, rent: 100, owner: null },
        { name: "البنك", price: 260, rent: 120, owner: null },
        { name: "الفندق", price: 300, rent: 150, owner: null },
        { name: "الملعب", price: 350, rent: 180, owner: null }
    ];

    let playerMoney = 1500;
    let playerPos = 0;
    let gameActive = true;

    function renderBoard() {
        const boardDiv = document.getElementById('mpBoard');
        boardDiv.innerHTML = '';
        properties.forEach((prop, idx) => {
            const cell = document.createElement('div');
            cell.className = 'monopoly-cell';
            let ownerText = prop.owner ? `👤 ${prop.owner}` : '🏷️ للبيع';
            if (idx === playerPos) ownerText = '🚶‍♂️ ' + ownerText;
            cell.innerHTML = `<strong>${prop.name}</strong><br>💰 ${prop.price}<br>💵 ${prop.rent}<br>${ownerText}`;
            if (prop.owner === 'أنت') cell.style.background = '#27ae60';
            else if (prop.owner) cell.style.background = '#e67e22';
            else cell.style.background = '#2c3e50';
            boardDiv.appendChild(cell);
        });
    }

    function rollDice() {
        if (!gameActive) return;
        const dice = Math.floor(Math.random() * 6) + 1;
        let newPos = playerPos + dice;
        if (newPos >= properties.length) {
            newPos = newPos - properties.length;
            playerMoney += 200;
            addLog(`مررت من نقطة البداية! حصلت على 200$. الرصيد: ${playerMoney}$`);
        }
        playerPos = newPos;
        addLog(`رميت ${dice}، وصلت إلى ${properties[playerPos].name}`);
        const property = properties[playerPos];
        if (property.owner === null) {
            if (playerMoney >= property.price) {
                const buy = confirm(`هل تريد شراء ${property.name} مقابل ${property.price}$؟`);
                if (buy) {
                    playerMoney -= property.price;
                    property.owner = 'أنت';
                    addLog(`اشتريت ${property.name}! الرصيد المتبقي: ${playerMoney}$`);
                } else {
                    addLog(`قررت عدم الشراء.`);
                }
            } else {
                addLog(`ليس لديك مال كافٍ لشراء ${property.name}.`);
            }
        } else if (property.owner === 'أنت') {
            addLog(`هذه ملكيتك، لا شيء يحدث.`);
        } else {
            // دفع الإيجار
            const rent = property.rent;
            if (playerMoney >= rent) {
                playerMoney -= rent;
                addLog(`دفعت إيجار ${rent}$ إلى مالك ${property.name}. الرصيد: ${playerMoney}$`);
            } else {
                addLog(`ليس لديك مال كافٍ لدفع الإيجار! لقد خسرت.`);
                gameActive = false;
                document.getElementById('mpInfo').innerHTML = `💀 لقد أفلس! انتهت اللعبة.`;
                document.getElementById('mpRollBtn').disabled = true;
                return;
            }
        }
        document.getElementById('mpInfo').innerHTML = `💰 رصيدك: ${playerMoney}`;
        renderBoard();
        if (playerMoney <= 0) {
            gameActive = false;
            addLog(`انتهت اللعبة. لقد خسرت!`);
            document.getElementById('mpRollBtn').disabled = true;
        }
    }

    function addLog(msg) {
        const logDiv = document.getElementById('mpLog');
        const p = document.createElement('div');
        p.innerHTML = `🪶 ${msg}`;
        logDiv.appendChild(p);
        logDiv.scrollTop = logDiv.scrollHeight;
    }

    function resetGame() {
        playerMoney = 1500;
        playerPos = 0;
        gameActive = true;
        properties.forEach(p => p.owner = null);
        renderBoard();
        document.getElementById('mpInfo').innerHTML = `💰 رصيدك: 1500`;
        document.getElementById('mpLog').innerHTML = '';
        document.getElementById('mpRollBtn').disabled = false;
        addLog('تم إعادة اللعبة. ابدأ من جديد!');
    }

    document.getElementById('mpRollBtn').addEventListener('click', rollDice);
    document.getElementById('mpResetBtn').addEventListener('click', resetGame);
    renderBoard();
    addLog('مرحباً بك في بنك الحظ! اضغط رمي النرد لبدء اللعبة.');
}
window.initMonopoly = initMonopoly;
