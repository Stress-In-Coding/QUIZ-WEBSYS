document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        { question: "What is HTML?", options: ["Hypertext Markup Language", "Hypertext Markup links", "Home Management Link", "Hypertext Management Language"], answer: "Hypertext Markup Language" },
        { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
        { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    
    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const nextBtn = document.getElementById("next-btn");
    const scoreContainer = document.getElementById("score-container");
    const scoreEl = document.getElementById("score");
    const timerEl = document.getElementById("timer");

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        scoreContainer.classList.add("d-none");
        loadQuestion();
    }

    function loadQuestion() {
        clearTimeout(timer);
        const currentQuestion = questions[currentQuestionIndex];
        questionEl.textContent = currentQuestion.question;
        optionsEl.innerHTML = "";
        timerEl.textContent = "Time left: 5s";
        let timeLeft = 5;
        
        timer = setInterval(() => {
            timeLeft--;
            timerEl.textContent = `Time left: ${timeLeft}s`;
            if (timeLeft == 0) {
                clearInterval(timer);
                nextQuestion();
            }
        }, 1000);

        currentQuestion.options.forEach(option => {
            const btn = document.createElement("button");
            btn.textContent = option;
            btn.classList.add("option", "btn", "btn-light");
            btn.onclick = () => selectOption(btn, currentQuestion.answer);
            optionsEl.appendChild(btn);
        });
    }

    function selectOption(btn, correctAnswer) {
        clearInterval(timer);
        document.querySelectorAll(".option").forEach(button => button.disabled = true);
        if (btn.textContent === correctAnswer) {
            btn.classList.add("correct");
            score++;
        } else {
            btn.classList.add("incorrect");
        }
        nextBtn.disabled = false;
    }

    function nextQuestion() {
        nextBtn.disabled = true;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            endQuiz();
        }
    }

    function endQuiz() {
        localStorage.setItem("quizScore", score);
        scoreEl.textContent = `${score} / ${questions.length}`;
        scoreContainer.classList.remove("d-none");
    }

    nextBtn.addEventListener("click", nextQuestion);
    startQuiz();
});
