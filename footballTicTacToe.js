function initFootballTicTacToe() {
    const container = document.getElementById('footballTicTacToeGame');
    container.innerHTML = `
        <button class="back-home-btn" onclick="showMainPage()"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title">${lang[currentLang].game_footballTicTacToe}</div>
        <div class="ttt-board" id="ftttBoard"></div>
        <div id="ftttStatus" class="result-card">دور اللاعب X</div>
        <button id="ftttReset" class="primary">إعادة</button>
    `;
    // الأسئلة: لكل خلية سؤال (لاعب + فريق/بطولة)
    const questions = [
        { row: 0, col: 0, question: "ما اسم اللاعب المصري الذي لعب لليفربول؟", answer: "محمد صلاح" },
        { row: 0, col: 1, question: "ما اسم اللاعب الأرجنتيني الذي لعب لبرشلونة؟", answer: "ليونيل ميسي" },
        { row: 0, col: 2, question: "ما اسم اللاعب البرتغالي الذي لعب لريال مدريد؟", answer: "كريستيانو رونالدو" },
        { row: 1, col: 0, question: "ما اسم اللاعب الفرنسي الفائز بكأس العالم 2018؟", answer: "كيليان مبابي" },
        { row: 1, col: 1, question: "ما اسم اللاعب البرازيلي المعروف بـ 'الظاهرة'؟", answer: "رونالدو" },
        { row: 1, col: 2, question: "ما اسم الحارس الألماني الأسطوري؟", answer: "مانويل نوير" },
        { row: 2, col: 0, question: "ما اسم اللاعب الإنجليزي الذي لعب لمانشستر يونايتد؟", answer: "ديفيد بيكهام" },
        { row: 2, col: 1, question: "ما اسم اللاعب الهولندي الأسطورة؟", answer: "يوهان كرويف" },
        { row: 2, col: 2, question: "ما اسم اللاعب الإيطالي الفائز بالكرة الذهبية 2006؟", answer: "فابيو كانافارو" }
    ];
    let board = Array(9).fill('');
    let currentPlayer = 'X';
    let gameActive = true;

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
            const q = questions.find(q => q.row === Math.floor(i/3) && q.col === i%3);
            cell.onclick = () => {
                if (!gameActive || board[i] !== '') return;
                const userAnswer = prompt(q.question);
                if (userAnswer && userAnswer.trim().toLowerCase() === q.answer.toLowerCase()) {
                    board[i] = currentPlayer;
                    renderBoard();
                    if (!checkWinner()) {
                        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                        document.getElementById('ftttStatus').innerHTML = `دور اللاعب ${currentPlayer}`;
                    }
                } else {
                    alert('إجابة خاطئة!');
                }
            };
            boardDiv.appendChild(cell);
        }
    }

    function resetGame() {
        board = Array(9).fill('');
        currentPlayer = 'X';
        gameActive = true;
        document.getElementById('ftttStatus').innerHTML = 'دور اللاعب X';
        renderBoard();
    }

    document.getElementById('ftttReset').onclick = resetGame;
    renderBoard();
}
