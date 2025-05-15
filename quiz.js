// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "В каком году был заложен первый камень в ознаменование строительства города Ленинска?",
        imgSrc : "img/html.png",
        choiceA : "A)1950",
        choiceB : "B)1955",
        choiceC : "C)1960",
        choiceD : "D)1965",
        correct : "B"

    },{
        question : "Кто родился 6 мая 1966 года?",
        imgSrc : "img/css.png",
        choiceA : "A)Скворцов Александр Александрович",
        choiceB : "B)Иванов Сергей Петрович",
        choiceC : "C)Петрова Анна Викторовна",
        choiceD : "D)Смирнов Дмитрий Андреевич",
        correct : "A"
    },{
        question : "В каком году состоялся четвертый регулярный набор космонавтов в отряд Министерства обороны СССР?",
        imgSrc : "img/css.png",
        choiceA : "A)1965",
        choiceB : "B)1967",
        choiceC : "C)1969",
        choiceD : "D)1971",
        correct : "B"
      },{
        question : "Какой указ подписал президент РФ в 1992 году?",
        imgSrc : "img/css.png",
        choiceA : "A)О создании Военно-космических сил",
        choiceB : "B)О закрытии космодрома",
        choiceC : "C)О развитии науки",
        choiceD : "D)О реализации программы по космическим исследованиям",
        correct : "A"
      },{
        question : "Кто родился 9 мая 1949 года?",
        imgSrc : "img/css.png",
        choiceA : "A)Атьков Олег Юрьевич",
        choiceB : "B)Гречко Георгий Михайлович",
        choiceC : "C)Леонов Алексей Архипович",
        choiceD : "D)Комаров Владимир Михайлович",
        correct : "A"
      },{
        question:  "В каком году было подписано Соглашение между АН СССР и NASA?",
        imgSrc : "img/css.png",
        choiceA : "A)1975",
        choiceB : "B)1977",
        choiceC : "C)1979",
        choiceD : "D)1981",
        correct : "B"
      },{
        question:  "Кто родился 13 мая 1942 года?",
        imgSrc : "img/css.png",
        choiceA : "A)Джанибеков Владимир Александрович",
        choiceB : "B)Попов Юрий Александрович",
        choiceC : "C)Севастьянов Валерий Андреевич",
        choiceD : "D)Волков Александр Александрович",
        correct : "A"
      },{
        question:  "В каком году стартовал КК «Союз Т-5»?",
        imgSrc : "img/css.png",
        choiceA : "A)1980",
        choiceB : "B)1982",
        choiceC : "C)1984",
        choiceD : "D)1986",
        correct : "B"
      },{
        question:  "Какой экипаж стартовал на «Союз-40»?",
        imgSrc : "img/css.png",
        choiceA : "A)Попов и Прунариу",
        choiceB : "B)Гречко и Непорашов",
        choiceC : "C)Стрекалов и Крикалев",
        choiceD : "D)Севастьянов и Волков",
        correct : "A"
      },{
        question:  "Кто выполнил первый полёт на ракетном BИ-1?",
        imgSrc : "img/css.png",
        choiceA : "A)Г.Я. Бахчиванджи",
        choiceB : "B)А.Н. Туполев",
        choiceC : "C)Ю.А. Гагарин",
        choiceD : "D)В.П. Севастьянов",
        correct : "A"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 300; // 5min
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";

    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}
