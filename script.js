const questions = [

    {
        question: "1. Qual é o principal objetivo de um site falso do governo?",

        answers: [
            "A) Oferecer serviços públicos.",
            "B) Enganar pessoas e obter informações pessoais.",
            "C) Divulgar notícias oficiais."
        ],

        correct: 1
    },

    {
        question: "2. O que você deve fazer ao receber um link prometendo dinheiro de um benefício?",

        answers: [
            "A) Clicar imediatamente.",
            "B) Informar seus dados pessoais.",
            "C) Verificar a informação nos canais oficiais."
        ],

        correct: 2
    },

    {
        question: "3. O serviço Valores a Receber do Banco Central cobra taxas pela consulta?",

        answers: [
            "A) Não. A consulta oficial é gratuita.",
            "B) Sim, sempre cobra uma taxa.",
            "C) Somente por mensagem."
        ],

        correct: 0
    },

    {
        question: "4. Qual atitude ajuda a proteger suas contas na internet?",

        answers: [
            "A) Compartilhar suas senhas.",
            "B) Utilizar autenticação em duas etapas.",
            "C) Acessar qualquer página."
        ],

        correct: 1
    },

    {
        question: "5. O que fazer se você informar seus dados em uma página suspeita?",

        answers: [
            "A) Ignorar o ocorrido.",
            "B) Compartilhar o link com amigos.",
            "C) Proteger suas contas e procurar os canais oficiais."
        ],

        correct: 2
    }

];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const resultElement = document.getElementById("result");
const nextButton = document.getElementById("next-question");
const numberElement = document.getElementById("question-number");
const progressBar = document.getElementById("progress-bar");

function showQuestion() {

    answered = false;

    const question = questions[currentQuestion];

    questionElement.textContent = question.question;

    numberElement.textContent =
        `Pergunta ${currentQuestion + 1} de ${questions.length}`;

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    answersElement.innerHTML = "";

    resultElement.textContent = "";

    nextButton.style.display = "none";

    question.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.textContent = answer;

        button.addEventListener("click", () => {
            checkAnswer(index, button);
        });

        answersElement.appendChild(button);

    });

}

function checkAnswer(selected, selectedButton) {

    if (answered) return;

    answered = true;

    const correct = questions[currentQuestion].correct;

    const buttons = answersElement.querySelectorAll("button");

    buttons.forEach(button => {
        button.disabled = true;
    });

    if (selected === correct) {

        score++;

        resultElement.textContent =
            "Muito bem! Você acertou a resposta!";

        resultElement.style.color = "#35e69b";

    } else {

        resultElement.textContent =
            "Resposta incorreta. A alternativa correta é: " +
            questions[currentQuestion].answers[correct];

        resultElement.style.color = "#ff7777";

    }

    selectedButton.style.borderColor =
        selected === correct ? "#35e69b" : "#ff7777";

    buttons[correct].style.borderColor = "#35e69b";

    nextButton.style.display = "block";

    if (currentQuestion === questions.length - 1) {

        nextButton.textContent = "Ver resultado";

    } else {

        nextButton.textContent = "Próxima pergunta";

    }

}

function nextQuestion() {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    } else {

        showResult();

    }

}

function showResult() {

    questionElement.textContent = "Quiz finalizado!";

    numberElement.textContent = "Resultado final";

    answersElement.innerHTML = "";

    progressBar.style.width = "100%";

    resultElement.textContent =
        `Você acertou ${score} de ${questions.length} perguntas!`;

    resultElement.style.color = "#35e69b";

    nextButton.style.display = "block";

    nextButton.textContent = "Refazer quiz";

    nextButton.onclick = restartQuiz;

}

function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    nextButton.onclick = nextQuestion;

    showQuestion();

}

nextButton.addEventListener("click", nextQuestion);

showQuestion();