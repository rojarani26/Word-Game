const words = [
    { word: "javascript", hint: "A popular programming language primarily used in web development." },
    { word: "java", hint: "A high level, object-oriented programming language and also platform independent." },
    { word: "react", hint: "A JavaScript library for building user interfaces." },
    { word: "algorithm", hint: "A step-by-step procedure for solving a problem or accomplishing a task." },
    { word: "debugging", hint: "The process of finding and fixing errors in code." },
    { word: "html", hint: "A markup language used for creating web pages." },
    { word: "css", hint: "A style sheet language used for describing the presentation of a document written in HTML." },
    { word: "function", hint: "A block of code designed to perform a particular task, called when needed." },
    { word: "variable", hint: "A storage location in programming that holds data which can change during execution." },
    { word: "object", hint: "An instance of a class containing data and methods in object-oriented programming." }
];

let chosenWord = "";
let displayedWord = [];
let remainingTime = 60;
let timer;
let progressWidth = 100;
let lastWord = "";

const wordElement = document.getElementById('word');
const guessInput = document.getElementById('guessInput');
const submitGuess = document.getElementById('submitGuess');
const hintElement = document.getElementById('hint');
const timerElement = document.getElementById('timer');
const messageElement = document.getElementById('message');
const startButton = document.getElementById('startButton');
const tryAgainButton = document.getElementById('tryAgainButton');
const gameArea = document.getElementById('gameArea');
const progressBar = document.getElementById('progress');

startButton.addEventListener('click', () => {
    startButton.classList.add('hidden');
    gameArea.classList.remove('hidden');
    startGame();
});

tryAgainButton.addEventListener('click', () => {
    tryAgainButton.classList.add('hidden');
    messageElement.textContent = '';
    startGame();
});

function startGame() {
    remainingTime = 60;
    progressWidth = 100;
    chooseNewWord();
    displayedWord = Array(chosenWord.length).fill('_');
    wordElement.textContent = displayedWord.join(' ');
    messageElement.textContent = '';
    hintElement.textContent = `Hint: ${lastWord.hint}`;
    hintElement.classList.remove('hidden');
    guessInput.disabled = false;
    submitGuess.disabled = false;
    guessInput.focus();
    updateProgressBar();

    startTimer();
}

function chooseNewWord() {
    let newWord;
    do {
        lastWord = words[Math.floor(Math.random() * words.length)];
        newWord = lastWord.word;
    } while (newWord === chosenWord);
    chosenWord = newWord;
}
function startTimer() {
    timerElement.textContent = remainingTime;
    timer = setInterval(() => {
        remainingTime--;
        timerElement.textContent = remainingTime;
        updateProgressBar();

        if (remainingTime === 0) {
            clearInterval(timer);
            gameOver(false);
        }
    }, 1000);
}

function updateProgressBar() {
    progressWidth = (remainingTime / 60) * 100;
    progressBar.style.width = progressWidth + '%';
}

submitGuess.addEventListener('click', () => {
    const guess = guessInput.value.toLowerCase();
    guessInput.value = '';  
    if (guess && chosenWord.includes(guess)) {
        for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === guess) {
                displayedWord[i] = guess;
            }
        }
        wordElement.textContent = displayedWord.join(' ');
        if (!displayedWord.includes('_')) {
            clearInterval(timer);
            gameOver(true);
        }
    } else {
        remainingTime -= 5;  
        if (remainingTime <= 0) {
            clearInterval(timer);
            gameOver(false);
        }
    }
});

function gameOver(win) {
    guessInput.disabled = true;
    submitGuess.disabled = true;
    if (win) {
        messageElement.textContent = 'You guessed the word! 🎉';
    } else {
        messageElement.textContent = `You lost! The word was: ${chosenWord}`;
    }

    tryAgainButton.classList.remove('hidden');
}



