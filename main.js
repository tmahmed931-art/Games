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
        game_trivia: "سؤال وجواب",
        game_trivia_desc: "اختبر معلوماتك",
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
        game_trivia: "Quick Trivia",
        game_trivia_desc: "Test your knowledge",
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

// Navigation between pages
const mainPage = document.getElementById('mainPage');
const gameContainers = {
    mafia: document.getElementById('mafiaGame'),
    dice: document.getElementById('diceGame'),
    truth: document.getElementById('truthGame'),
    rps: document.getElementById('rpsGame'),
    trivia: document.getElementById('triviaGame')
};

function showGame(gameId) {
    mainPage.style.display = 'none';
    for (let id in gameContainers) {
        gameContainers[id].style.display = 'none';
    }
    gameContainers[gameId].style.display = 'block';

    // Initialize game if not yet
    if (gameId === 'mafia' && typeof initMafia === 'function') initMafia();
    if (gameId === 'truth' && typeof initTruthDare === 'function') initTruthDare();
    if (gameId === 'dice' && typeof initDice === 'function') initDice();
    if (gameId === 'rps' && typeof initRPS === 'function') initRPS();
    if (gameId === 'trivia' && typeof initTrivia === 'function') initTrivia();
}

function showMainPage() {
    mainPage.style.display = 'block';
    for (let id in gameContainers) {
        gameContainers[id].style.display = 'none';
    }
    // Remove any overlays
    const overlay = document.querySelector('.overlay-modal');
    if (overlay) overlay.remove();
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

// Expose functions globally
window.showMainPage = showMainPage;
window.setLanguage = setLanguage;

// Set default language
setLanguage('ar');