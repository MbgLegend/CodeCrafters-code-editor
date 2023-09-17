const quiz = document.getElementById("quiz-show")
const quizContainer = document.querySelector("#quiz-show .quiz-container")

let questions = []
let index = 0
let questionNum = index + 1
let seconds = 15
let timerInterval
let score = 0
let type

export async function startQuiz(quizType) {
    quiz.style.display = "flex"
    quiz.scrollIntoView({ behavior: 'smooth' })
    document.body.style.overflowY = "hidden"
    quizContainer.innerHTML = ""

    const response = await fetch("../questions.json")
    const data = await response.json()

    const question = data[quizType]
    questions.push(question)
    const currentQuestion = question[index]
    type = quizType

    quizContainer.innerHTML = `
        <div class="header">
            <h1>${quizType} quiz</h1>
            <div class="time">
                <p>
                    Time Left:
                    <span class="seconds"></span>
                </p>
            </div>
        </div>
        <hr>
        <p class="question">
            ${questionNum}. ${currentQuestion.question}
        </p>
        <div class="answers">
        </div>
        <hr>
        <div class="footer">
            <p>
                <span>${questionNum}</span>
                of
                <span>${question.length}</span>
                Questions
            </p>
        </div>
    `

    const exitQuizContainer = quizContainer.querySelector(".footer")
    const exitQuiz = document.createElement("button")
    exitQuiz.classList.add("exit-quiz")
    exitQuiz.innerText = "Exit quiz"
    exitQuizContainer.appendChild(exitQuiz)
    exitQuiz.addEventListener("click", () => {
        clearInterval(timerInterval)
        score = 0
        index = 0
        questionNum = index + 1
        seconds = 10

        quiz.style.display = "none"
        quiz.scrollIntoView({ behavior: 'smooth' })
        document.body.style.overflowY = "auto"
        quizContainer.innerHTML = ""
    })

    const timer = quizContainer.querySelector(".seconds")
    timer.textContent = seconds
    timerInterval = setInterval(() => {
        seconds--
        timer.textContent = seconds

        if (seconds === 0) {
            nextQuestion(currentQuestion, null)
        }
    }, 1000)

    const answersContainer = quizContainer.querySelector('.answers')

    currentQuestion.options.forEach((option, optionIndex) => {
        const button = document.createElement('button')
        button.textContent = option

        button.addEventListener('click', () => {
            nextQuestion(currentQuestion, optionIndex)
        })

        answersContainer.appendChild(button)
    })
}

function nextQuestion(currentQuestion, optionIndex) {
    seconds = 10
    clearInterval(timerInterval)

    if (optionIndex === currentQuestion.correct_answer) {
        score += 50
    }

    questionNum++
    index++

    if (index < questions[0].length) {
        startQuiz(type)
    } else {
        quizContainer.innerHTML = `
            <div class="quiz-done">
                <h1>Quiz done :)</h1>
                <div class="score">Score: ${score}/${questions.length * 50}</div>
            </div>
        `
        const buttonContainer = quizContainer.querySelector(".quiz-done")

        const repeatQuiz = document.createElement("button")
        repeatQuiz.innerText = "Repeat Quiz"
        buttonContainer.appendChild(repeatQuiz)
        repeatQuiz.addEventListener("click", () => {
            questions = []
            index = 0
            questionNum = index + 1
            seconds = 10
            score = 0

            startQuiz(type)
        })

        const returnToHomePage = document.createElement("button")
        returnToHomePage.innerText = "Return to homepage"
        buttonContainer.appendChild(returnToHomePage)
        returnToHomePage.addEventListener("click", () => {
            quiz.style.display = "none"
            quiz.scrollIntoView({ behavior: 'smooth' })
            document.body.style.overflowY = "auto"
            quizContainer.innerHTML = ""
        })
        
        score = 0
        index = 0
        questionNum = index + 1
    }
}