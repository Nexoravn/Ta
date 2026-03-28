// =============================================
// WORDMASTER GAME - B2-C1 VOCABULARY
// VỚI WORDLE STYLE + HƯỚNG DẪN TIẾNG ANH/VIỆT
// =============================================

// Trạng thái game
const GameState = {
    mode: 'guess',
    score: 0,
    combo: 0,
    maxCombo: 0,
    currentWord: null,
    timer: 30,
    timerInterval: null,
    gameActive: false,
    chainHistory: [],
    lastChar: '',
    correctCount: 0,
    totalQuestions: 0,
    // Wordle specific
    currentGuess: '',
    guesses: [],
    maxGuesses: 6,
    wordLength: 0,
    showVietnamese: false  // Hiển thị tiếng Việt hay không
};

// =============================================
// TỪ VỰNG B2-C1 (giữ nguyên như cũ)
// =============================================
const WORD_DATABASE = [
    // UNIT 1: LIFE STORIES
    { word: "ACHIEVEMENT", hint: "A thing that someone has succeeded in doing, especially after effort", cat: "Life Stories" },
    { word: "DETERMINATION", hint: "Firmness of purpose; the quality of being determined", cat: "Life Stories" },
    { word: "OVERCOME", hint: "Succeed in dealing with a problem or difficulty", cat: "Life Stories" },
    { word: "INSPIRATION", hint: "The process of being mentally stimulated to do something creative", cat: "Life Stories" },
    { word: "PERSEVERANCE", hint: "Continued effort to do something despite difficulties", cat: "Life Stories" },
    { word: "RESILIENCE", hint: "The ability to recover quickly from difficulties", cat: "Life Stories" },
    { word: "MILESTONE", hint: "An important event in the development or history of something", cat: "Life Stories" },
    { word: "LEGACY", hint: "Something handed down from an ancestor or from the past", cat: "Life Stories" },

    // UNIT 2: URBANISATION
    { word: "URBANISATION", hint: "The process of making an area more urban", cat: "Urbanisation" },
    { word: "INFRASTRUCTURE", hint: "Basic physical structures needed for a society to operate", cat: "Urbanisation" },
    { word: "MIGRATION", hint: "Movement of people to a new area or country", cat: "Urbanisation" },
    { word: "CONGESTION", hint: "The state of being overcrowded, especially with traffic", cat: "Urbanisation" },
    { word: "METROPOLITAN", hint: "Relating to a large city or urban area", cat: "Urbanisation" },
    { word: "SUSTAINABLE", hint: "Able to be maintained at a certain rate or level", cat: "Urbanisation" },
    { word: "RESIDENTIAL", hint: "Designed for people to live in", cat: "Urbanisation" },
    { word: "COMMERCIAL", hint: "Concerned with or engaged in commerce", cat: "Urbanisation" },

    // UNIT 3: THE GREEN MOVEMENT
    { word: "BIODIVERSITY", hint: "The variety of plant and animal life in a habitat", cat: "Green Movement" },
    { word: "CONSERVATION", hint: "Protection of plants, animals, and natural areas", cat: "Green Movement" },
    { word: "ECOSYSTEM", hint: "A community of living organisms and their environment", cat: "Green Movement" },
    { word: "RENEWABLE", hint: "Capable of being replenished naturally", cat: "Green Movement" },
    { word: "EMISSION", hint: "The production and discharge of something, especially gas", cat: "Green Movement" },
    { word: "CARBON FOOTPRINT", hint: "Amount of carbon dioxide released by activities", cat: "Green Movement" },
    { word: "DEFORESTATION", hint: "The action of clearing a wide area of trees", cat: "Green Movement" },
    { word: "RECYCLABLE", hint: "Able to be recycled", cat: "Green Movement" },

    // UNIT 4: ASEAN AND VIET NAM
    { word: "SOLIDARITY", hint: "Unity or agreement of feeling or action", cat: "ASEAN" },
    { word: "INTEGRATION", hint: "The act of combining into an effective unit", cat: "ASEAN" },
    { word: "DIPLOMACY", hint: "The profession of managing international relations", cat: "ASEAN" },
    { word: "SOVEREIGNTY", hint: "Supreme power or authority of a state", cat: "ASEAN" },
    { word: "COOPERATION", hint: "The process of working together to achieve a goal", cat: "ASEAN" },
    { word: "INITIATIVE", hint: "A new plan or action to solve a problem", cat: "ASEAN" },
    { word: "MEMBERSHIP", hint: "The state of being a member of an organization", cat: "ASEAN" },
    { word: "HARMONY", hint: "A state of peaceful coexistence", cat: "ASEAN" },

    // UNIT 5: GLOBALISATION
    { word: "GLOBALISATION", hint: "The process by which businesses develop international influence", cat: "Globalisation" },
    { word: "CULTURAL DIVERSITY", hint: "The existence of different cultures in a society", cat: "Globalisation" },
    { word: "INTERCONNECTED", hint: "Mutually connected or related", cat: "Globalisation" },
    { word: "HOMOGENISATION", hint: "The process of making things uniform or similar", cat: "Globalisation" },
    { word: "OUTSOURCING", hint: "Obtaining goods from an outside supplier", cat: "Globalisation" },
    { word: "MULTINATIONAL", hint: "Operating in several countries", cat: "Globalisation" },
    { word: "CROSS-CULTURAL", hint: "Relating to different cultures", cat: "Globalisation" },
    { word: "INTERDEPENDENCE", hint: "Mutual dependence between countries", cat: "Globalisation" },

    // UNIT 6: ENDANGERED SPECIES
    { word: "ENDANGERED", hint: "At risk of extinction", cat: "Endangered Species" },
    { word: "EXTINCTION", hint: "The state of a species no longer existing", cat: "Endangered Species" },
    { word: "HABITAT", hint: "The natural home of an organism", cat: "Endangered Species" },
    { word: "POACHING", hint: "Illegal hunting of protected animals", cat: "Endangered Species" },
    { word: "CONSERVATIONIST", hint: "A person who advocates for nature protection", cat: "Endangered Species" },
    { word: "BIODIVERSE", hint: "Having a variety of plants and animals", cat: "Endangered Species" },
    { word: "WILDLIFE", hint: "Animals living in natural conditions", cat: "Endangered Species" },
    { word: "PRESERVATION", hint: "The act of keeping something in its original state", cat: "Endangered Species" },

    // UNIT 7: ARTIFICIAL INTELLIGENCE
    { word: "ARTIFICIAL INTELLIGENCE", hint: "The simulation of human intelligence by machines", cat: "AI" },
    { word: "ALGORITHM", hint: "A process or set of rules for calculations", cat: "AI" },
    { word: "AUTOMATION", hint: "Use of control systems for operating equipment", cat: "AI" },
    { word: "INNOVATION", hint: "A new method, idea, or product", cat: "AI" },
    { word: "BREAKTHROUGH", hint: "A sudden, dramatic discovery", cat: "AI" },
    { word: "CYBERSECURITY", hint: "Protection of computer systems from theft", cat: "AI" },
    { word: "VIRTUAL", hint: "Not physically existing but made by software", cat: "AI" },
    { word: "ROBOTICS", hint: "The design and construction of robots", cat: "AI" },

    // UNIT 8: NEW WAYS TO LEARN
    { word: "INTERACTIVE", hint: "Allowing a two-way flow of information", cat: "Education" },
    { word: "PLATFORM", hint: "A place or system for online learning", cat: "Education" },
    { word: "CURRICULUM", hint: "Subjects comprising a course of study", cat: "Education" },
    { word: "PEDAGOGY", hint: "The method and practice of teaching", cat: "Education" },
    { word: "ASSESSMENT", hint: "Evaluation of a student's work", cat: "Education" },
    { word: "COMPETENCY", hint: "The ability to do something successfully", cat: "Education" },
    { word: "CRITICAL THINKING", hint: "Objective analysis and evaluation", cat: "Education" },
    { word: "LIFELONG LEARNING", hint: "Learning throughout one's life", cat: "Education" },

    // UNIT 9: CAREER CHOICES
    { word: "VOCATION", hint: "A strong feeling of suitability for a career", cat: "Careers" },
    { word: "INTERNSHIP", hint: "A period of work experience", cat: "Careers" },
    { word: "ENTREPRENEUR", hint: "A person who sets up a business", cat: "Careers" },
    { word: "CERTIFICATION", hint: "An official document proving qualification", cat: "Careers" },
    { word: "PROSPECT", hint: "The possibility of future success", cat: "Careers" },
    { word: "RECRUITMENT", hint: "The action of finding new people to join", cat: "Careers" },
    { word: "MENTOR", hint: "An experienced adviser", cat: "Careers" },
    { word: "NETWORKING", hint: "Interacting with others to exchange information", cat: "Careers" },

    // UNIT 10: HEALTHY LIFESTYLE
    { word: "WELL-BEING", hint: "The state of being comfortable and healthy", cat: "Health" },
    { word: "NUTRITION", hint: "The process of providing food for health", cat: "Health" },
    { word: "IMMUNE SYSTEM", hint: "The body's defense against disease", cat: "Health" },
    { word: "PREVENTIVE", hint: "Designed to stop something from happening", cat: "Health" },
    { word: "THERAPY", hint: "Treatment to relieve or heal", cat: "Health" },
    { word: "MINDFULNESS", hint: "Mental state achieved by focusing on the present", cat: "Health" },
    { word: "HOLISTIC", hint: "Treating the whole person, not just symptoms", cat: "Health" },

    // General Academic
    { word: "ABANDON", hint: "To leave something or someone permanently", cat: "General" },
    { word: "ACCOMMODATE", hint: "To provide with a place to live or stay", cat: "General" },
    { word: "ACCOMPANY", hint: "To go somewhere with someone", cat: "General" },
    { word: "ACCUMULATE", hint: "To gather or collect over time", cat: "General" },
    { word: "ACKNOWLEDGE", hint: "To accept or admit the truth of something", cat: "General" },
    { word: "ACQUIRE", hint: "To obtain or gain through effort", cat: "General" },
    { word: "ADAPT", hint: "To adjust to new conditions", cat: "General" },
    { word: "ADVOCATE", hint: "To publicly support or recommend", cat: "General" },
    { word: "ANALYSE", hint: "To examine in detail", cat: "General" },
    { word: "ANTICIPATE", hint: "To expect or predict", cat: "General" }
];

// =============================================
// TỪ ĐIỂN CAMBRIDGE
// =============================================
const CAMBRIDGE_DICTIONARY = new Set([
    "RUN", "WALK", "TALK", "SPEAK", "EAT", "DRINK", "SLEEP", "SEE", "LOOK", "HEAR",
    "LISTEN", "WRITE", "READ", "LEARN", "STUDY", "WORK", "PLAY", "THINK", "KNOW",
    "UNDERSTAND", "REMEMBER", "FORGET", "BELIEVE", "FEEL", "LOVE", "LIKE", "HATE",
    "HELP", "ASK", "ANSWER", "CALL", "COME", "GO", "MOVE", "STAY", "LIVE",
    "BEGIN", "START", "STOP", "FINISH", "CREATE", "MAKE", "DO", "BUILD",
    "OPEN", "CLOSE", "ENTER", "LEAVE", "FOLLOW", "LEAD", "WIN", "LOSE",
    "TIME", "DAY", "YEAR", "WEEK", "MONTH", "HOUR", "MINUTE", "SECOND",
    "PERSON", "PEOPLE", "MAN", "WOMAN", "CHILD", "FAMILY", "HOME", "HOUSE",
    "GOOD", "BAD", "BIG", "SMALL", "LARGE", "HOT", "COLD", "FAST", "SLOW",
    "EASY", "HARD", "DIFFICULT", "SIMPLE", "CLEAR", "BRIGHT", "DARK",
    ...WORD_DATABASE.map(w => w.word)
]);

// =============================================
// HƯỚNG DẪN CHO TỪNG CHẾ ĐỘ (TIẾNG ANH + TIẾNG VIỆT)
// =============================================
const GUIDES = {
  guess: {
    en: `🎯 HOW TO PLAY GUESS MODE:
You will be given a hint and the first letter of a word, and your task is to type the correct answer in the input box within 30 seconds, where each correct answer earns 10 points plus a combo bonus, so try to maintain your streak for extra points.`,

    vi: `🎯 CÁCH CHƠI ĐOÁN TỪ:
Người chơi sẽ được cung cấp một gợi ý và chữ cái đầu của từ, cần nhập đáp án vào ô trả lời trong vòng 30 giây, mỗi câu đúng được 10 điểm kèm điểm thưởng combo, vì vậy hãy cố gắng duy trì chuỗi trả lời đúng để tối đa hóa điểm số.`
},

chain: {
    en: `🔗 HOW TO PLAY CHAIN MODE:
Start with a given word and type a new word that begins with the last letter of the previous word, ensuring that each word is a valid English word from the Cambridge Dictionary and not repeated, with 25 seconds per turn to build the longest possible chain and achieve a high combo.`,

    vi: `🔗 CÁCH CHƠI NỐI TỪ:
Bắt đầu từ một từ cho sẵn, người chơi cần nhập một từ mới bắt đầu bằng chữ cái cuối của từ trước đó, đảm bảo mỗi từ là từ tiếng Anh hợp lệ theo từ điển Cambridge và không bị lặp lại, với 25 giây cho mỗi lượt để tạo chuỗi từ dài nhất và đạt combo cao.`
},

scramble: {
    en: `🔄 HOW TO PLAY SCRAMBLE MODE:
You will be given a scrambled word and must rearrange its letters to form the correct word based on the provided hint, then type your answer in the input box within 40 seconds while paying attention to word length and common patterns.`,

    vi: `🔄 CÁCH CHƠI XÁO CHỮ:
Người chơi sẽ được cung cấp một từ bị xáo trộn và cần sắp xếp lại các chữ cái để tạo thành từ đúng dựa trên gợi ý, sau đó nhập đáp án vào ô trả lời trong vòng 40 giây, đồng thời chú ý đến độ dài từ và các quy luật quen thuộc.`
}
};

// =============================================
// GAME OBJECT
// =============================================
const Game = {
    init() {
        this.loadRanking();
        this.setupEventListeners();
        this.addTranslateButton();
        this.loadLanguagePreference();
        console.log('Game initialized with', WORD_DATABASE.length, 'words');
    },

    addTranslateButton() {
        const header = document.querySelector('.game-header');
        const translateBtn = document.createElement('button');
        translateBtn.className = 'translate-btn';
        translateBtn.innerHTML = '🌐 Tiếng Việt / English';
        translateBtn.onclick = () => this.toggleLanguage();
        header.appendChild(translateBtn);
    },

    toggleLanguage() {
        GameState.showVietnamese = !GameState.showVietnamese;
        localStorage.setItem('wordmaster_lang', GameState.showVietnamese ? 'vi' : 'en');
        
        // Cập nhật hướng dẫn hiện tại nếu đang ở game
        if (!document.getElementById('main-menu').classList.contains('hidden')) {
            // Không cần cập nhật menu
        } else {
            this.updateCurrentGuide();
        }
        
        this.showToast(GameState.showVietnamese ? 'Đã chuyển sang Tiếng Việt' : 'Switched to English', 'info');
    },

    loadLanguagePreference() {
        const savedLang = localStorage.getItem('wordmaster_lang');
        GameState.showVietnamese = savedLang === 'vi';
    },

    updateCurrentGuide() {
        const guideSection = document.querySelector('.guide-section');
        if (guideSection) {
            const guide = GUIDES[GameState.mode];
            const enContent = guideSection.querySelector('.guide-content-en');
            const viContent = guideSection.querySelector('.guide-content-vi');
            
            if (enContent) enContent.innerHTML = guide.en;
            if (viContent) viContent.innerHTML = guide.vi;
            
            if (GameState.showVietnamese) {
                guideSection.classList.add('show-vi');
            } else {
                guideSection.classList.remove('show-vi');
            }
        }
    },

    showGuide() {
        const guide = GUIDES[GameState.mode];
        const guideHTML = `
            <div class="guide-section" id="game-guide">
                <div class="guide-title">
                    <span>📖 GAME GUIDE</span>
                </div>
                <div class="guide-content">
                    <div class="guide-content-en">${guide.en}</div>
                    <div class="guide-content-vi">${guide.vi}</div>
                </div>
            </div>
        `;
        
        const questionArea = document.querySelector('.question-area');
        const existingGuide = document.getElementById('game-guide');
        if (existingGuide) existingGuide.remove();
        
        questionArea.insertAdjacentHTML('beforebegin', guideHTML);
        
        if (GameState.showVietnamese) {
            document.getElementById('game-guide').classList.add('show-vi');
        }
    },

    startMode(mode) {
        GameState.mode = mode;
        GameState.score = 0;
        GameState.combo = 0;
        GameState.maxCombo = 0;
        GameState.chainHistory = [];
        GameState.lastChar = '';
        GameState.correctCount = 0;
        GameState.totalQuestions = 0;
        GameState.gameActive = true;
        
        // Reset Wordle state
        GameState.currentGuess = '';
        GameState.guesses = [];
        
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('game-area').classList.remove('hidden');
        
        const modeNames = {
            'guess': '🔤 GUESS MODE - WORDLE STYLE',
            'chain': '🔗 CHAIN MODE - CAMBRIDGE DICTIONARY',
            'scramble': '🔄 SCRAMBLE MODE'
        };
        document.getElementById('current-mode').textContent = modeNames[mode];
        
        // Hiển thị hướng dẫn
        this.showGuide();
        
        SoundManager.play('beep');
        this.nextQuestion();
    },

    nextQuestion() {
        if (!GameState.gameActive) return;
        GameState.totalQuestions++;
        
        switch(GameState.mode) {
            case 'guess':
                this.nextGuessModeWordle();
                break;
            case 'chain':
                this.nextChainMode();
                break;
            case 'scramble':
                this.nextScrambleMode();
                break;
        }
        
        this.resetTimer();
        document.getElementById('user-input').value = '';
        document.getElementById('user-input').focus();
    },

    // =========================================
    // WORDLE STYLE GUESS MODE
    // =========================================
    nextGuessModeWordle() {
        const randomIndex = Math.floor(Math.random() * WORD_DATABASE.length);
        GameState.currentWord = WORD_DATABASE[randomIndex];
        GameState.wordLength = GameState.currentWord.word.length;
        GameState.guesses = [];
        GameState.currentGuess = '';
        
        document.getElementById('hint-text').innerHTML = `
            <div class="first-letter-hint">
                📌 First letter: <span>${GameState.currentWord.word[0]}</span>
            </div>
            <div style="margin-top: 10px;">💡 ${GameState.currentWord.hint}</div>
        `;
        document.getElementById('category-display').textContent = `📚 ${GameState.currentWord.cat}`;
        
        // Tạo Wordle grid
        this.createWordleGrid();
        
        // Cập nhật placeholder
        const input = document.getElementById('user-input');
        input.placeholder = `Type a ${GameState.wordLength}-letter word...`;
        input.maxLength = GameState.wordLength;
    },

    createWordleGrid() {
        const wordDisplay = document.getElementById('word-display');
        const wordLen = GameState.wordLength;
        const maxGuesses = 6;
        
        let gridHTML = '<div class="wordle-grid">';
        for (let i = 0; i < maxGuesses; i++) {
            gridHTML += '<div class="wordle-row" data-row="' + i + '">';
            for (let j = 0; j < wordLen; j++) {
                const letter = (GameState.guesses[i] && GameState.guesses[i][j]) || '';
                const status = this.getLetterStatus(i, j);
                gridHTML += `<div class="wordle-cell ${status}" data-row="${i}" data-col="${j}">${letter}</div>`;
            }
            gridHTML += '</div>';
        }
        gridHTML += '</div>';
        
        wordDisplay.innerHTML = gridHTML;
    },

    getLetterStatus(row, col) {
        if (!GameState.guesses[row]) return '';
        const letter = GameState.guesses[row][col];
        if (!letter) return '';
        
        const targetWord = GameState.currentWord.word;
        if (letter === targetWord[col]) return 'correct';
        if (targetWord.includes(letter)) return 'present';
        return 'absent';
    },

    updateWordleGrid() {
        const rows = document.querySelectorAll('.wordle-row');
        for (let i = 0; i < rows.length && i < GameState.guesses.length; i++) {
            const cells = rows[i].querySelectorAll('.wordle-cell');
            for (let j = 0; j < cells.length; j++) {
                const letter = GameState.guesses[i][j] || '';
                cells[j].textContent = letter;
                cells[j].className = `wordle-cell ${this.getLetterStatus(i, j)}`;
                if (letter) cells[j].classList.add('filled');
            }
        }
    },

    submitGuessWordle(input) {
        if (input.length !== GameState.wordLength) {
            this.showToast(`Word must be ${GameState.wordLength} letters long!`, 'warning');
            return false;
        }
        
        if (!/^[A-Z]+$/.test(input)) {
            this.showToast('Only letters A-Z allowed!', 'warning');
            return false;
        }
        
        GameState.guesses.push(input);
        this.updateWordleGrid();
        
        const isCorrect = (input === GameState.currentWord.word);
        
        if (isCorrect) {
            this.handleCorrect(`✅ Correct! The word is ${GameState.currentWord.word}`);
            return true;
        }
        
        if (GameState.guesses.length >= 6) {
            this.handleWrong(`❌ Game Over! The word was ${GameState.currentWord.word}`);
            return false;
        }
        
        return false;
    },

    // =========================================
    // CHAIN MODE (giữ nguyên)
    // =========================================
    nextChainMode() {
        if (GameState.chainHistory.length === 0) {
            const randomIndex = Math.floor(Math.random() * WORD_DATABASE.length);
            GameState.currentWord = WORD_DATABASE[randomIndex];
            
            document.getElementById('hint-text').innerHTML = `
                <div style="font-size: 1.2rem;">🎯 <strong>STARTING WORD:</strong> <span style="color: #3b82f6;">${GameState.currentWord.word}</span></div>
                <div style="margin-top: 10px;">📖 Next word must start with: <span style="color: #eab308; font-size: 1.3rem;">"${GameState.currentWord.word.slice(-1).toUpperCase()}"</span></div>
                <div style="margin-top: 5px; font-size: 0.9rem;">💡 ${GameState.currentWord.hint}</div>
            `;
            
            document.getElementById('category-display').textContent = '🔗 CHAIN MODE';
            document.getElementById('word-display').innerHTML = `
                <div class="chain-history">
                    📜 Chain (${GameState.chainHistory.length + 1} words): 
                    <strong>${GameState.currentWord.word}</strong>
                </div>
            `;
            
            GameState.lastChar = GameState.currentWord.word.slice(-1);
            GameState.chainHistory.push(GameState.currentWord.word);
        } else {
            document.getElementById('hint-text').innerHTML = `
                <div style="font-size: 1.2rem;">⌨️ Type a word starting with: 
                    <span style="color: #eab308; font-size: 1.5rem;">"${GameState.lastChar.toUpperCase()}"</span>
                </div>
                <div style="margin-top: 5px; font-size: 0.9rem;">📖 Must be a valid English word (Cambridge Dictionary)</div>
            `;
            
            const recentHistory = GameState.chainHistory.slice(-5).map(w => w).join(' → ');
            document.getElementById('word-display').innerHTML = `
                <div class="chain-history">
                    📜 Chain (${GameState.chainHistory.length} words):<br>
                    <span style="font-size: 1rem;">${recentHistory}</span>
                </div>
            `;
        }
        
        document.getElementById('user-input').placeholder = 'Type your word...';
        document.getElementById('user-input').maxLength = 30;
    },

    isEnglishWord(word) {
        const upperWord = word.toUpperCase();
        return CAMBRIDGE_DICTIONARY.has(upperWord);
    },

    // =========================================
    // SCRAMBLE MODE
    // =========================================
    nextScrambleMode() {
        const randomIndex = Math.floor(Math.random() * WORD_DATABASE.length);
        GameState.currentWord = WORD_DATABASE[randomIndex];
        
        const scrambled = this.shuffleWord(GameState.currentWord.word);
        
        document.getElementById('hint-text').innerHTML = `
            <div>🔀 <strong>SCRAMBLED WORD:</strong> <span style="color: #3b82f6; font-size: 1.5rem;">${scrambled}</span></div>
            <div style="margin-top: 10px;">💡 ${GameState.currentWord.hint}</div>
        `;
        document.getElementById('category-display').textContent = `📚 ${GameState.currentWord.cat}`;
        document.getElementById('word-display').innerHTML = `
            <div class="scramble-letters">
                ${scrambled.split('').map(letter => `<div class="scramble-letter">${letter}</div>`).join('')}
            </div>
        `;
        
        document.getElementById('user-input').placeholder = 'Type the correct word...';
        document.getElementById('user-input').maxLength = GameState.currentWord.word.length + 5;
    },

    shuffleWord(word) {
        const arr = word.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join('');
    },

    resetTimer() {
        if (GameState.timerInterval) clearInterval(GameState.timerInterval);
        
        const timeMap = { 'guess': 30, 'chain': 25, 'scramble': 40 };
        GameState.timer = timeMap[GameState.mode];
        
        document.getElementById('timer-value').textContent = GameState.timer;
        document.getElementById('timer-display').style.color = '';
        
        GameState.timerInterval = setInterval(() => {
            GameState.timer--;
            document.getElementById('timer-value').textContent = GameState.timer;
            
            if (GameState.timer <= 5) {
                document.getElementById('timer-display').style.color = '#ef4444';
                if (GameState.timer === 5) SoundManager.play('tick');
            }
            
            if (GameState.timer <= 0) {
                clearInterval(GameState.timerInterval);
                this.handleTimeout();
            }
        }, 1000);
    },

    handleTimeout() {
        if (!GameState.gameActive) return;
        GameState.combo = 0;
        this.updateScore();
        SoundManager.play('error');
        this.showToast('⏰ Time\'s up! Combo lost', 'error');
        this.nextQuestion();
    },

    submit() {
        if (!GameState.gameActive) return;
        
        const input = document.getElementById('user-input').value.trim().toUpperCase();
        if (!input) {
            this.showToast('Please enter your answer!', 'warning');
            return;
        }
        
        let isCorrect = false;
        
        switch(GameState.mode) {
            case 'guess':
                isCorrect = this.submitGuessWordle(input);
                if (isCorrect) return;
                break;
                
            case 'chain':
                if (input.length < 2) {
                    this.showToast('Word must have at least 2 letters!', 'warning');
                    return;
                }
                if (!/^[A-Z]+$/.test(input)) {
                    this.showToast('Only letters A-Z allowed!', 'warning');
                    return;
                }
                if (!this.isEnglishWord(input)) {
                    this.showToast(`"${input}" is not a valid English word!`, 'error');
                    return;
                }
                if (GameState.chainHistory.includes(input)) {
                    this.showToast(`"${input}" already used!`, 'warning');
                    return;
                }
                if (GameState.lastChar && input[0] !== GameState.lastChar) {
                    this.showToast(`Word must start with "${GameState.lastChar}"!`, 'warning');
                    return;
                }
                
                isCorrect = true;
                GameState.chainHistory.push(input);
                GameState.lastChar = input.slice(-1);
                break;
                
            case 'scramble':
                isCorrect = (input === GameState.currentWord.word);
                if (!isCorrect) {
                    this.showToast(`❌ Wrong! The correct word is ${GameState.currentWord.word}`, 'error');
                }
                break;
        }
        
        if (isCorrect) {
            this.handleCorrect();
        } else if (GameState.mode !== 'guess') {
            this.handleWrong();
        }
    },

    handleCorrect(message) {
        GameState.combo++;
        GameState.maxCombo = Math.max(GameState.maxCombo, GameState.combo);
        GameState.correctCount++;
        
        const points = 10 + Math.floor(GameState.combo / 3) * 5;
        GameState.score += points;
        
        this.updateScore();
        SoundManager.play('success');
        this.showToast(message || `✅ Correct! +${points} points`, 'success');
        
        setTimeout(() => this.nextQuestion(), 800);
    },

    handleWrong(message) {
        GameState.combo = 0;
        this.updateScore();
        SoundManager.play('error');
        if (message) this.showToast(message, 'error');
        setTimeout(() => this.nextQuestion(), 1000);
    },

    skip() {
        if (!GameState.gameActive) return;
        GameState.combo = 0;
        this.updateScore();
        SoundManager.play('beep');
        this.showToast('⏭️ Skipped', 'warning');
        this.nextQuestion();
    },

    updateScore() {
        document.getElementById('score-display').textContent = GameState.score;
        document.getElementById('combo-display').textContent = `x${GameState.combo}`;
    },

    backToMenu() {
        if (GameState.timerInterval) clearInterval(GameState.timerInterval);
        GameState.gameActive = false;
        
        document.getElementById('game-area').classList.add('hidden');
        document.getElementById('main-menu').classList.remove('hidden');
        
        const guide = document.getElementById('game-guide');
        if (guide) guide.remove();
        
        this.updateRanking();
        SoundManager.play('beep');
    },

    gameOver() {
        GameState.gameActive = false;
        if (GameState.timerInterval) clearInterval(GameState.timerInterval);
        
        SoundManager.play('gameover');
        
        const modal = document.getElementById('game-over-modal');
        document.getElementById('final-score').textContent = GameState.score;
        document.getElementById('final-stats').innerHTML = `
            ✅ Correct: ${GameState.correctCount}<br>
            🔥 Max Combo: x${GameState.maxCombo}<br>
            📊 Total Questions: ${GameState.totalQuestions}
        `;
        modal.classList.remove('hidden');
        this.saveScore();
    },

    playAgain() {
        document.getElementById('game-over-modal').classList.add('hidden');
        this.startMode(GameState.mode);
    },

    saveScore() {
        const rankings = JSON.parse(localStorage.getItem('wordmaster_rankings') || '[]');
        const names = ['THUY', 'MINH', 'HUNG', 'LAN', 'PHUONG', 'TUAN', 'HOA', 'DUC', 'MAI', 'LINH'];
        const randomName = names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 100);
        
        rankings.push({
            name: randomName,
            score: GameState.score,
            mode: GameState.mode,
            date: new Date().toLocaleDateString('vi-VN')
        });
        
        rankings.sort((a, b) => b.score - a.score);
        localStorage.setItem('wordmaster_rankings', JSON.stringify(rankings.slice(0, 10)));
        this.loadRanking();
    },

    loadRanking() {
        const rankings = JSON.parse(localStorage.getItem('wordmaster_rankings') || '[]');
        const rankList = document.getElementById('rank-list');
        
        if (rankings.length === 0) {
            rankList.innerHTML = '<div class="rank-item">🏆 No scores yet</div>';
            return;
        }
        
        rankList.innerHTML = rankings.slice(0, 5).map((item, index) => {
            const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '📌';
            return `
                <div class="rank-item">
                    <span style="width: 40px;">${medal}</span>
                    <span style="flex: 1;">${item.name}</span>
                    <span style="color: #3b82f6; font-weight: 800;">${item.score}</span>
                </div>
            `;
        }).join('');
    },

    updateRanking() {
        this.loadRanking();
    },

    showToast(message, type = 'info') {
        const oldToast = document.getElementById('toast-message');
        if (oldToast) oldToast.remove();
        
        const toast = document.createElement('div');
        toast.id = 'toast-message';
        
        const colors = { info: '#3b82f6', success: '#22c55e', error: '#ef4444', warning: '#eab308' };
        
        toast.style.cssText = `
            position: fixed;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%);
            background: #1e293b;
            color: white;
            padding: 14px 28px;
            border-radius: 60px;
            font-weight: 600;
            z-index: 9999;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            border-left: 5px solid ${colors[type]};
            font-size: 1rem;
            min-width: 280px;
            text-align: center;
        `;
        
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    },

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !document.getElementById('game-area').classList.contains('hidden')) {
                this.submit();
            }
        });
    }
};

// =============================================
// KHỞI ĐỘNG
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    Game.init();
    if (typeof SoundManager !== 'undefined') SoundManager.init();
});