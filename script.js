const quizData = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris"
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Leo Tolstoy"],
      answer: "William Shakespeare"
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      answer: "Pacific Ocean"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Jupiter", "Mars", "Saturn", "Uranus"],
      answer: "Mars"
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
      answer: "Leonardo da Vinci"
    }
  ];
  
  const quizContainer = document.getElementById("quiz");
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");
  const submitButton = document.getElementById("submit");
  const scoreElement = document.getElementById("score-value");
  
  let currentQuestion = 0;
  let score = 0;
  let wrongAnswers = 0;
  
  function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.textContent = currentQuizData.question;
    choicesElement.innerHTML = "";
  
    currentQuizData.options.forEach(option => {
      const optionElement = document.createElement("button");
      optionElement.textContent = option;
      optionElement.classList.add("option");
      optionElement.addEventListener("click", checkAnswer);
      choicesElement.appendChild(optionElement);
    });
  }
  
  function checkAnswer(event) {
    const selectedOption = event.target;
    const currentQuizData = quizData[currentQuestion];
  
    if (selectedOption.textContent === currentQuizData.answer) {
      selectedOption.classList.add("correct");
      score++;
    } else {
      selectedOption.classList.add("wrong");
      const correctOption = choicesElement.querySelector(`button:nth-child(${currentQuizData.options.indexOf(currentQuizData.answer) + 1})`);
      correctOption.classList.add("correct");
      wrongAnswers++;
    }
  
    disableOptions();
    currentQuestion++;
  
    if (currentQuestion < quizData.length) {
      setTimeout(() => {
        resetOptions();
        loadQuestion();
      }, 1000);
    } else {
      setTimeout(() => {
        showScore();
      }, 1000);
    }
  }
  
  function disableOptions() {
    const options = choicesElement.querySelectorAll(".option");
    options.forEach(option => {
      option.disabled = true;
    });
  }
  
  function resetOptions() {
    const options = choicesElement.querySelectorAll(".option");
    options.forEach(option => {
      option.classList.remove("correct", "wrong");
      option.disabled = false;
    });
  }
  
  function showScore() {
    quizContainer.innerHTML = `
      <h1>Quiz Completed!</h1>
      <div id="score">Your Score: ${score} out of ${quizData.length}</div>
      <div id="wrong-answers">Wrong Answers: ${wrongAnswers}</div>
      <p>Thank you for taking the quiz!</p>
    `;
  }
  
  loadQuestion();
  
  submitButton.addEventListener("click", checkAnswer);
  