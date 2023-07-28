/*** Defining my variables */

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next");
const myTimer = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const exitButton = document.getElementById("exit-button");
const rulesArea = document.getElementsByClassName("rules-area");
const gameArea = document.getElementsByClassName("game-area");

let currentQuestionIndex = 0;
let score = 0;

/** Function to hide game area */

function hide() {
    document.gameArea.style.display = "none";
}

/** Event listener for start button */

startButton.addEventListener("click", startQuiz);

/** Event listener for exit button */

exitButton.addEventListener("click", () => {
    window.location.replace("https://www.google.com/search?sxsrf=AB5stBihUMdaRNwVD4sITH9n51b1rqiKRA:1690450300665&q=roses&tbm=isch&source=lnms&sa=X&ved=2ahUKEwjdu7mNyq6AAxVcR_EDHVlyB3wQ0pQJegQIDhAB&biw=1440&bih=711&dpr=1");
});

/**** Function to start the game */

function startQuiz() {
    document.rulesArea.hidden = true;
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

/*** Function to display question and answers */

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("button");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
};

/** Function for selecting answer and adding score dependant on answer */

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

/** Function for score at end game */

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

/** Function for next button and contains logic to see if quiz is over */

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

/** Event listener for next button */

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

/** Display output of question */

startQuiz();

/** Timer */

/**let myTimer = 15;

function timer() {
    document.myTimer.innerHTML = sec + "seconds left";
    if (myTimer < 0) {
        showScore();
    }
} */