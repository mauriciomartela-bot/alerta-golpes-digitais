const questions = [
    {
        question: "1. O que é um site falso?",
        answers: [
            "Uma página criada para enganar usuários.",
            "Um site oficial do governo.",
            "Uma página de notícias."
        ],
        correct: 0,
        explanation: "Correto! Sites falsos tentam imitar páginas legítimas para enganar pessoas."
    },
    {
        question: "2. O que fazer ao receber um link suspeito?",
        answers: [
            "Abrir imediatamente.",
            "Compartilhar com amigos.",
            "Não clicar e verificar a origem."
        ],
        correct: 2,
        explanation: "Correto! É importante verificar a origem antes de acessar qualquer link."
    },
    {
        question: "3. O serviço Valores a Receber cobra alguma taxa?",
        answers: [
            "Sim, sempre cobra.",
            "Não, o serviço oficial é gratuito.",
            "Depende do valor recebido."
        ],
        correct: 1,
        explanation: "Correto! O serviço oficial do Banco Central é gratuito."
    },
    {
        question: "4. Qual é um sinal de possível golpe?",
        answers: [
            "Endereço oficial confirmado.",
            "Informação em um canal oficial.",
            "Promessa de dinheiro mediante pagamento antecipado."
        ],
        correct: 2,
        explanation: "Correto! Cobranças antecipadas para liberar supostos benefícios são um sinal de alerta."
    },
    {
        question: "5. Como se proteger de sites falsos?",
        answers: [
            "Verificar o endereço e consultar fontes oficiais.",
            "Informar a senha em qualquer página.",
            "Confiar em todas as mensagens recebidas."
        ],
        correct: 0,
        explanation: "Correto! Sempre confira os endereços e utilize canais oficiais."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const questionNumber = document.getElementById("question-number");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const progressBar = document.getElementById("progress-bar");
const resultElement = document.getElementById("quiz-result");
const scoreElement = document.getElementById("score");

function showQuestion() {
    answered = false;

    const question = questions[currentQuestion];

    questionNumber.textContent =
        `Pergunta ${currentQuestion + 1} de ${questions.length}`;

    questionElement.textContent = question.question;

    answersElement.innerHTML = "";
    feedbackElement.textContent = "";

    nextButton.disabled = true;
    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "Ver resultado"
            : "Próxima pergunta";

    progressBar.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.textContent = answer;
        button.className = "answer-btn";

        button.addEventListener("click", () => {
            checkAnswer(index);
        });

        answersElement.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const question = questions[currentQuestion];
    const buttons = answersElement.querySelectorAll("button");

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === question.correct) {
            button.classList.add("correct");
        }

        if (index === selectedIndex && index !== question.correct) {
            button.classList.add("incorrect");
        }
    });

    if (selectedIndex === question.correct) {
        score++;
        feedbackElement.textContent = "✓ " + question.explanation;
        feedbackElement.style.color = "#4ade80";
    } else {
        feedbackElement.textContent =
            "✗ Resposta incorreta. " + question.explanation;
        feedbackElement.style.color = "#f87171";
    }

    nextButton.disabled = false;
    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;
}

function showResult() {
    questionElement.hidden = true;
    questionNumber.hidden = true;
    answersElement.hidden = true;
    feedbackElement.hidden = true;
    nextButton.hidden = true;

    resultElement.hidden = false;

    scoreElement.textContent =
        `Você acertou ${score} de ${questions.length} perguntas!`;
}

nextButton.addEventListener("click", () => {
    if (!answered) return;

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResult();
    }
});

document.getElementById("restart-button").addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;

    questionElement.hidden = false;
    questionNumber.hidden = false;
    answersElement.hidden = false;
    feedbackElement.hidden = false;
    nextButton.hidden = false;

    resultElement.hidden = true;

    showQuestion();
});

showQuestion();