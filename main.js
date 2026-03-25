// Language strings
const lang = {
    ar: {
        site_name: "Mafia",
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
        back_home: "العودة للقائمة"
    },
    en: {
        site_name: "Mafia",
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
    memory: document.getElementById('memoryGame')
};

function showGame(gameId) {
    mainPage.style.display = 'none';
    for (let id in gameContainers) {
        gameContainers[id].style.display = 'none';
    }
    const gameContainer = gameContainers[gameId];
    gameContainer.style.display = 'block';
    gameContainer.setAttribute('data-game', gameId);

    // Initialize if not yet
    if (gameId === 'mafia' && typeof initMafia === 'function') initMafia();
    if (gameId === 'truth' && typeof initTruthDare === 'function') initTruthDare();
    if (gameId === 'dice' && typeof initDice === 'function') initDice();
    if (gameId === 'rps' && typeof initRPS === 'function') initRPS();
    if (gameId === 'wyrm' && typeof initWyrm === 'function') initWyrm();
    if (gameId === 'tictactoe' && typeof initTicTacToe === 'function') initTicTacToe();
    if (gameId === 'connect4' && typeof initConnect4 === 'function') initConnect4();
    if (gameId === 'memory' && typeof initMemory === 'function') initMemory();
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
