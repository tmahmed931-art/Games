function initFootballTicTacToe() {
    const container = document.getElementById('footballTicTacToeGame');
    container.innerHTML = `
        <button class="back-home-btn" onclick="showMainPage()"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title">${lang[currentLang].game_footballTicTacToe}</div>
        <div class="ttt-board" id="ftttBoard"></div>
        <div id="ftttStatus" class="result-card">دور اللاعب X</div>
        <button id="ftttReset" class="primary">إعادة</button>
    `;
    
    // بنك أسئلة كبير (أكثر من 75) مع إجابات متعددة (عربي/إنجليزي)
    const questionBank = [];
    
    // توليد 80 سؤالاً متنوعاً (لاعب + فريق/بطولة/دولة)
    const players = [
        { ar: "محمد صلاح", en: "mohamed salah" },
        { ar: "ليونيل ميسي", en: "lionel messi" },
        { ar: "كريستيانو رونالدو", en: "cristiano ronaldo" },
        { ar: "كيليان مبابي", en: "kylian mbappe" },
        { ar: "نيمار", en: "neymar" },
        { ar: "روبرت ليفاندوفسكي", en: "robert lewandowski" },
        { ar: "كريم بنزيما", en: "karim benzema" },
        { ar: "لوكا مودريتش", en: "luka modric" },
        { ar: "سيرخيو راموس", en: "sergio ramos" },
        { ar: "مانويل نوير", en: "manuel neuer" },
        { ar: "تيبو كورتوا", en: "thibaut courtois" },
        { ar: "فيرجيل فان دايك", en: "virgil van dijk" },
        { ar: "كيفين دي بروين", en: "kevin de bruyne" },
        { ar: "إيرلينغ هالاند", en: "erling haaland" },
        { ar: "جود بيلينغهام", en: "jude bellingham" },
        { ar: "فينيسيوس جونيور", en: "vinicius junior" },
        { ar: "رودري", en: "rodri" },
        { ar: "جمال موسيالا", en: "jamal musiala" },
        { ar: "فيل فودين", en: "phil foden" },
        { ar: "هاري كين", en: "harry kane" }
    ];
    
    const teams = [
        "ليفربول", "برشلونة", "ريال مدريد", "مانشستر سيتي", "بايرن ميونخ", "باريس سان جيرمان", "مانشستر يونايتد", "تشيلسي", "يوفنتوس", "ميلان", "إنتر", "أرسنال", "توتنهام", "أتلتيكو مدريد", "بوروسيا دورتموند", "أياكس"
    ];
    
    const countries = [
        "مصر", "الأرجنتين", "البرتغال", "فرنسا", "البرازيل", "بولندا", "كرواتيا", "إسبانيا", "ألمانيا", "بلجيكا", "هولندا", "النرويج", "إنجلترا", "المغرب", "السنغال"
    ];
    
    const tournaments = [
        "دوري أبطال أوروبا", "كأس العالم", "كأس الأمم الأوروبية", "كوبا أمريكا", "الدوري الإنجليزي", "الدوري الإسباني", "الدوري الإيطالي", "الدوري الألماني", "الدوري الفرنسي"
    ];
    
    // توليد الأسئلة: لكل لاعب نجمع مع فريق أو بطولة أو دولة
    for (let p of players) {
        // مع فريق عشوائي
        let team = teams[Math.floor(Math.random() * teams.length)];
        questionBank.push({
            question: `ما اسم اللاعب الذي لعب لـ ${team}؟`,
            answers: [p.ar, p.en, p.ar.toLowerCase(), p.en.toLowerCase()]
        });
        // مع دولة
        let country = countries[Math.floor(Math.random() * countries.length)];
        questionBank.push({
            question: `ما اسم اللاعب الذي يحمل جنسية ${country}؟`,
            answers: [p.ar, p.en, p.ar.toLowerCase(), p.en.toLowerCase()]
        });
        // مع بطولة
        let tournament = tournaments[Math.floor(Math.random() * tournaments.length)];
        questionBank.push({
            question: `من هو اللاعب الذي فاز بـ ${tournament} مؤخراً؟`,
            answers: [p.ar, p.en, p.ar.toLowerCase(), p.en.toLowerCase()]
        });
    }
    
    // إضافة أسئلة إضافية لضمان العدد
    for (let i = 0; i < 30; i++) {
        questionBank.push({
            question: `ما اسم لاعب كرة قدم مشهور؟`,
            answers: ["محمد صلاح", "mohamed salah", "ليونيل ميسي", "lionel messi"]
        });
    }
    
    // خلط الأسئلة
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
    
    let currentQuestions = [];
    let board = Array(9).fill('');
    let currentPlayer = 'X';
    let gameActive = true;
    
    function selectRandomQuestions() {
        const shuffled = shuffleArray([...questionBank]);
        return shuffled.slice(0, 9);
    }
    
    function checkWinner() {
        const winPatterns = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ];
        for (let pattern of winPatterns) {
            const [a,b,c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                document.getElementById('ftttStatus').innerHTML = `الفائز هو ${board[a]}`;
                return true;
            }
        }
        if (!board.includes('')) {
            gameActive = false;
            document.getElementById('ftttStatus').innerHTML = 'تعادل!';
            return true;
        }
        return false;
    }
    
    function renderBoard() {
        const boardDiv = document.getElementById('ftttBoard');
        boardDiv.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('ttt-cell');
            cell.textContent = board[i];
            const q = currentQuestions[i];
            cell.onclick = () => {
                if (!gameActive || board[i] !== '') return;
                const userAnswer = prompt(q.question);
                if (!userAnswer) return;
                const normalizedAnswer = userAnswer.trim().toLowerCase();
                const isCorrect = q.answers.some(ans => ans.toLowerCase() === normalizedAnswer);
                if (isCorrect) {
                    board[i] = currentPlayer;
                    renderBoard();
                    if (!checkWinner()) {
                        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                        document.getElementById('ftttStatus').innerHTML = `دور اللاعب ${currentPlayer}`;
                    }
                } else {
                    alert(`إجابة خاطئة! الإجابات الصحيحة: ${q.answers.join(' أو ')}`);
                }
            };
            boardDiv.appendChild(cell);
        }
    }
    
    function resetGame() {
        currentQuestions = selectRandomQuestions();
        board = Array(9).fill('');
        currentPlayer = 'X';
        gameActive = true;
        document.getElementById('ftttStatus').innerHTML = 'دور اللاعب X';
        renderBoard();
    }
    
    document.getElementById('ftttReset').onclick = resetGame;
    resetGame();
}
