// Language strings
const lang = {
    ar: {
        site_name: "Deep Games",
        tagline: "مجموعة ألعاب جماعية ممتعة",
        game_mafia: "مافيا",
        game_mafia_desc: "لعبة الأدوار الكلاسيكية",
        game_dice: "مباراة النرد",
        game_dice_desc: "نرد سريع للاعبين",
        game_truth: "حقيقة أو جرأة",
        game_truth_desc: "أسئلة وأوامر عشوائية",
        game_rps: "حجر ورقة مقص",
        game_rps_desc: "واجه الحاسوب",
        game_wyrm: "ماذا تفضل؟",
        game_wyrm_desc: "اختر بين خيارين",
        game_tictactoe: "إكس أو",
        game_tictactoe_desc: "لعبة الكلاسيكية 3x3",
        game_connect4: "أربع في خط",
        game_connect4_desc: "أربع علامات متتالية",
        game_memory: "تطابق الذاكرة",
        game_memory_desc: "طابق الأزواج المتشابهة",
        // الألعاب الجديدة
        game_colormemory: "تحدي الذاكرة بالألوان",
        game_colormemory_desc: "تذكر تسلسل الألوان",
        game_quizrace: "سباق الأسئلة",
        game_quizrace_desc: "أسئلة عامة مع مؤقت",
        game_snakesladders: "السلم والثعبان",
        game_snakesladders_desc: "لعبة الألواح الكلاسيكية",
        game_speedclick: "تحدي السرعة",
        game_speedclick_desc: "اضغط على الأهداف سريعاً",
        game_numbermatch: "تطابق الأرقام",
        game_numbermatch_desc: "طابق العملية مع النتيجة",
        game_drawguess: "ارسم وخمّن",
        game_drawguess_desc: "ارسم الكلمة ليخمنها الآخرون",
        game_wordchain: "سلسلة الكلمات",
        game_wordchain_desc: "كلمة تبدأ بآخر حرف",
        game_monopoly: "بنك الحظ",
        game_monopoly_desc: "نسخة مبسطة من مونوبولي",
        back_home: "العودة للقائمة"
    },
    en: {
        site_name: "Deep Games",
        tagline: "Fun party games collection",
        game_mafia: "Mafia",
        game_mafia_desc: "Classic role-playing game",
        game_dice: "Dice Duel",
        game_dice_desc: "Fast dice rolling",
        game_truth: "Truth or Dare",
        game_truth_desc: "Random questions and challenges",
        game_rps: "Rock Paper Scissors",
        game_rps_desc: "Play against computer",
        game_wyrm: "Would You Rather",
        game_wyrm_desc: "Choose between two options",
        game_tictactoe: "Tic Tac Toe",
        game_tictactoe_desc: "Classic 3x3 game",
        game_connect4: "Connect 4",
        game_connect4_desc: "Get four in a row",
        game_memory: "Memory Match",
        game_memory_desc: "Match the pairs",
        // new games
        game_colormemory: "Color Memory",
        game_colormemory_desc: "Remember the color sequence",
        game_quizrace: "Quiz Race",
        game_quizrace_desc: "General knowledge with timer",
        game_snakesladders: "Snakes & Ladders",
        game_snakesladders_desc: "Classic board game",
        game_speedclick: "Speed Click",
        game_speedclick_desc: "Click targets quickly",
        game_numbermatch: "Number Match",
        game_numbermatch_desc: "Match equation with result",
        game_drawguess: "Draw & Guess",
        game_drawguess_desc: "Draw the word for others to guess",
        game_wordchain: "Word Chain",
        game_wordchain_desc: "Word starting with last letter",
        game_monopoly: "Luck Bank",
        game_monopoly_desc: "Simplified Monopoly",
        back_home: "Back to Menu"
    }
};

let currentLang = 'ar';

function setLanguage(langCode) {
    currentLang = langCode;
    const texts = lang[langCode];
    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.getAttribute('data-lang-key');
        if (texts[key]) el.innerText = texts[key];
    });
    document.querySelectorAll('.back-home-btn').forEach(btn => {
        btn.innerHTML = `<i class="fas fa-arrow-right"></i> ${texts.back_home}`;
    });
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`lang${langCode === 'ar' ? 'Ar' : 'En'}`).classList.add('active');
    document.body.dir = langCode === 'ar' ? 'rtl' : 'ltr';
}

// Navigation
const mainPage = document.getElementById('mainPage');
const gameContainers = {
    mafia: document.getElementById('mafiaGame'),
    dice: document.getElementById('diceGame'),
    truth: document.getElementById('truthGame'),
    rps: document.getElementById('rpsGame'),
    wyrm: document.getElementById('wyrmGame'),
    tictactoe: document.getElementById('tictactoeGame'),
    connect4: document.getElementById('connect4Game'),
    memory: document.getElementById('memoryGame'),
    colormemory: document.getElementById('colormemoryGame'),
    quizrace: document.getElementById('quizraceGame'),
    snakesladders: document.getElementById('snakesladdersGame'),
    speedclick: document.getElementById('speedclickGame'),
    numbermatch: document.getElementById('numbermatchGame'),
    drawguess: document.getElementById('drawguessGame'),
    wordchain: document.getElementById('wordchainGame'),
    monopoly: document.getElementById('monopolyGame')
};

function showGame(gameId) {
    mainPage.style.display = 'none';
    for (let id in gameContainers) {
        gameContainers[id].style.display = 'none';
    }
    const gameContainer = gameContainers[gameId];
    gameContainer.style.display = 'block';
    gameContainer.setAttribute('data-game', gameId);

    // Initialize games
    if (gameId === 'mafia' && typeof initMafia === 'function') initMafia();
    if (gameId === 'truth' && typeof initTruthDare === 'function') initTruthDare();
    if (gameId === 'dice' && typeof initDice === 'function') initDice();
    if (gameId === 'rps' && typeof initRPS === 'function') initRPS();
    if (gameId === 'wyrm' && typeof initWyrm === 'function') initWyrm();
    if (gameId === 'tictactoe' && typeof initTicTacToe === 'function') initTicTacToe();
    if (gameId === 'connect4' && typeof initConnect4 === 'function') initConnect4();
    if (gameId === 'memory' && typeof initMemory === 'function') initMemory();
    if (gameId === 'colormemory' && typeof initColorMemory === 'function') initColorMemory();
    if (gameId === 'quizrace' && typeof initQuizRace === 'function') initQuizRace();
    if (gameId === 'snakesladders' && typeof initSnakesLadders === 'function') initSnakesLadders();
    if (gameId === 'speedclick' && typeof initSpeedClick === 'function') initSpeedClick();
    if (gameId === 'numbermatch' && typeof initNumberMatch === 'function') initNumberMatch();
    if (gameId === 'drawguess' && typeof initDrawGuess === 'function') initDrawGuess();
    if (gameId === 'wordchain' && typeof initWordChain === 'function') initWordChain();
    if (gameId === 'monopoly' && typeof initMonopoly === 'function') initMonopoly();
}

function showMainPage() {
    mainPage.style.display = 'block';
    for (let id in gameContainers) {
        gameContainers[id].style.display = 'none';
    }
    // Remove any lingering overlays
    const overlays = document.querySelectorAll('.overlay-modal');
    overlays.forEach(o => o.remove());
}

// Event listeners
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('click', () => {
        const game = card.getAttribute('data-game');
        showGame(game);
    });
});

document.getElementById('langAr').addEventListener('click', () => setLanguage('ar'));
document.getElementById('langEn').addEventListener('click', () => setLanguage('en'));

window.showMainPage = showMainPage;
window.setLanguage = setLanguage;

setLanguage('ar');
