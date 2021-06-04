//memilih semua elemen yang dibutuhkan
const questionText = document.getElementById("question-text");
const optionBox = document.querySelector(".option-box");
const currentQuestionNum = document.querySelector(".current-question-num");
const answerDescription = document.querySelector(".answer-description");
const nextQuestionBtn = document.querySelector(".next-question-btn");
const correctAnswers = document.querySelector(".correct-answers");
const seeResultBtn = document.querySelector(".see-result-btn");
const remainingTime = document.querySelector(".remaining-time");
const timeUpText = document.querySelector(".time-up-text");
const quizHomeBox = document.querySelector(".quiz-home-box");
const quizBox = document.querySelector(".quiz-box");
const quizOverBox = document.querySelector(".quiz-over-box");
const startAgainQuizBtn = document.querySelector(".start-again-quiz-btn");
const goHomeBtn = document.querySelector(".go-home-btn");
const startQuizBtn = document.querySelector(".start-quiz-btn");
const nameText = document.getElementById("myForm");
const finalMsg = document.querySelector(".finalMsg");

let attempt = 0;
let questionIndex = 0;
let score = 0;
let number = 0;
let myArray = [];
let interval;

//inisialisasi soal quiz
const myApp = [{
    question: "hasil dari 3+(5x4)-8 adalah?",
    options: ["20","15","25","23"],
    answer: 1,
    description: "jawabannya adalah 15.",
}, {
    question: "hasil dari 3x-7 jika x=5 adalah?",
    options: ["5","7","8","3"],
    answer: 2,
    description: "jawabannya adalah 8.",
}, {
    question: "hasil dari 4x5-10 adalah",
    options: ["8","10","20","25"],
    answer: 1,
    description: "jawabannya adalah 10",
}, {
    question: "hasil dari 45+10-5+5 adalah?",
    options: ["50","60","55","45"],
    answer: 2,
    description: "jawabannya adalah 55.",
}, {
    question: "hasil dari 6x7-10:2 adalah?",
    options: ["42","37","45","30"],
    answer: 1,
    description: "jawabannya adalah 37.",
}, {
    question: "hasil dari 6x7+(4+6) adalah?",
    options: ["42","37","45","52"],
    answer: 3,
    description: "jawabannya adalah 52",
}, {
    question: "hasil dari 4x10:2 adalah?",
    options: ["40","30","20","35"],
    answer: 2,
    description: "jawabannya adalah 20.",
}, {
    question: "hasil dari 9:3x6+7 adalah?",
    options: ["40","30","20","25"],
    answer: 3,
    description: "jawabannya adalah 25.",
}, {
    question: "hasil dari 10x11+90 adalah?",
    options: [ "400","300","200","250"],
    answer: 2,
    description: "jawabannya adalah 200.",
}, {
    question: "hasil dari 10x23+39 adalah?",
    options: ["400","269","200","250"],
    answer: 1,
    description: "jawabannya adalah 269.",
},{
    question: "hasil dari 12x12+65-70 adalah?",
    options: ["400","300","200","279"],
    answer: 3,
    description: "jawabannya adalah 279.",
},{
    question: "hasil dari 14x4+12 adalah?",
    options: ["60","72","68","62"],
    answer: 2,
    description: "jawabannya adalah 68.",
},{
    question: "hasil dari 17x3+45-11 adalah?",
    options: ["75","90","85","105"],
    answer: 2,
    description: "jawabannya adalah 85.",
},{
    question: "hasil dari 67+11-23+9 adalah?",
    options: ["60","72","64","62"],
    answer: 2,
    description: "jawabannya adalah 64.",
},{
    question: "hasil dari 9^2-9+9 adalah?",
    options: ["72","81","68","62"],
    answer: 1,
    description: "jawabannya adalah 81.",
}]

// untuk menampilkan soal ke- dari berapa soal
function load() {
    //console.log("test");
    number++;
    questionText.innerHTML = myApp[questionIndex].question;
    createOptions();
    scoreBoard();
    currentQuestionNum.innerHTML = number + "/" + myApp.length;
}

// untuk menampilkan options
function createOptions() {
    optionBox.innerHTML = "";
    for (let i = 0; i < myApp[questionIndex].options.length; i++) {
        // console.log(myApp[questionIndex].options[i]);
        const option = document.createElement("div");
        option.innerHTML = myApp[questionIndex].options[i];
        option.classList.add("option");
        option.id = i;
        option.setAttribute("onclick", "check(this)");
        optionBox.appendChild(option);
    }
}

// untuk merandom soal quiz
function generateRandomQuestion() {
    let randomNumber = Math.floor(Math.random() * (myApp.length));
    let hitDuplicate = 0;
    if (myArray.length == 0) {
        questionIndex = randomNumber;
    } else {
        for (let i = 0; i < myArray.length; i++) {
            if (randomNumber == myArray[i]) {
                hitDuplicate = 1;
                // console.log("found duplicate")
            }
        }
        if (hitDuplicate == 1) {
            generateRandomQuestion();
            return;
        } else {
            questionIndex = randomNumber;
        }
    }

    myArray.push(randomNumber);
    // console.log(myArray);
    load();

}

// untuk mengecek benar atau salah jawaban yang dipilih
function check(ele) {
    // console.log(ele.id);
    const id = ele.id;
    if (id == myApp[questionIndex].answer) {
        // console.log("correct");
        ele.classList.add("correct");
        score++;
        scoreBoard();
    } else {
        // console.log("wrong");
        ele.classList.add("wrong");
        // tampilkan jawaban yang benar ketika jawaban yang diklik salah;
        for (let i = 0; i < optionBox.children.length; i++) {
            if (optionBox.children[i].id == myApp[questionIndex].answer) {
                optionBox.children[i].classList.add("show-correct");
            }
        }
    }
    attempt++;
    disableOptions();
    showAnswerDescription();
    showNextQuestionBtn();
    stopTimer();

    if (number / (myApp.length) == 1) {
        // console.log("over");
        quizOver();
    }
}

// untuk menampilkan bahwa waktu sudah berakhir
function timeIsUp() {
    showTimeUpText();
    for (let i = 0; i < optionBox.children.length; i++) {
        if (optionBox.children[i].id == myApp[questionIndex].answer) {
            optionBox.children[i].classList.add("show-correct");
        }
    }
    disableOptions();
    showAnswerDescription();
    showNextQuestionBtn();

}

// untuk memulai waktu, waktu berjalan mundur
function startTimer() {
    let timeLimit = 16;
    remainingTime.classList.remove("less-time");
    interval = setInterval(() => {
        timeLimit--; //mengurangi nilai waktu
        if (timeLimit < 10) { //jika timeLimit kurang dari 10
            timeLimit = "0" + timeLimit; //maka tambahkan 0 sebelum nilai waktu
        }
        if (timeLimit < 6) { // jika timeLimit kurang dari 6
            remainingTime.classList.add("less-time"); // maka akan menampilakan waktu akan segera berakhir
        }

        remainingTime.innerHTML = timeLimit;
        if (timeLimit == 0) { // jika timeLimit sama dengan 0 maka waktu sudah berakhir
            clearInterval(interval);
            timeIsUp();
        }
    }, 1000)
}

// waktu berhenti
function stopTimer() {
    clearInterval(interval);
}

// untuk menyembunyikan opsi 
function disableOptions() {
    for (let i = 0; i < optionBox.children.length; i++) {
        optionBox.children[i].classList.add("already-answered");
    }
}

// menampilkan deskripsi jawaban
function showAnswerDescription() {
    // deskripsi jawaban hanya akan muncul jika sudah ditentukan
    if (typeof myApp[questionIndex].description !== "undefined") {
        answerDescription.classList.add("show");
        answerDescription.innerHTML = myApp[questionIndex].description;
    }
}

// sembunyikan deskripsi jawaban
function hideAnswerDescription() {
    answerDescription.classList.remove("show");
    answerDescription.innerHTML = "";
}

// menampilkan soal berikutnya
function showNextQuestionBtn() {
    nextQuestionBtn.classList.add("show");
}

// menyembunyikan soal berikutnya
function hideNextQuestionBtn() {
    nextQuestionBtn.classList.remove("show");
}

// menampilkan waktu berakhir
function showTimeUpText() {
    timeUpText.classList.add("show");
}

// menyembunyikan waktu berakhir
function hideTimeUpText() {
    timeUpText.classList.remove("show");
}

// menampilkan score yang diperoleh
function scoreBoard() {
    correctAnswers.innerHTML = score;
}

nextQuestionBtn.addEventListener("click", nextQuestion);

// menampilkan kuis berikutnya
function nextQuestion() {
    // questionIndex++;
    generateRandomQuestion();
    // load();
    hideNextQuestionBtn();
    hideAnswerDescription();
    hideTimeUpText();
    startTimer();
}

// menampilkan hasil kuis
function quizResult() {
    document.querySelector(".total-questions").innerHTML = myApp.length;
    document.querySelector(".total-attempt").innerHTML = attempt;
    document.querySelector(".total-correct").innerHTML = score;
    document.querySelector(".total-wrong").innerHTML = attempt - score;
    const percentage = (score / (myApp.length)) * 100;
    document.querySelector(".percentage").innerHTML = Math.floor(percentage) + "%";
}

let namesAndScores = JSON.parse(localStorage.getItem("namesAndScores"));

    if (namesAndScores === null) {
        namesAndScores = [
                {"name": "Melody",
                "score": "100%"}
        ]
    };


// saat mengklik atau mengirimkan, simpan data ke penyimpanan lokal dan tambahkan nama pengguna dan skor
nameText.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = nameText.elements[0];
    let userName = name.value.trim();
    const percentage = (score / (myApp.length)) * 100 + "%";
    let entry = {
        "name": userName,
        "score": percentage
    };
    namesAndScores.push(entry);
    localStorage.setItem("namesAndScores", JSON.stringify(namesAndScores));

    let li = document.createElement("li");
    li.textContent = userName + "'s score is " + percentage;
    record.appendChild(li);
    
})

// dapatkan data dari penyimpanan lokal dan tambahkan daftar
function createRecord() {
    const record = document.querySelector("#record");
    for (let i = 0; i < namesAndScores.length; i++) {
            let name = namesAndScores[i].name;
            let score = namesAndScores[i].score;
            // console.log(name);
            // console.log(score);

            let li = document.createElement("li");
            li.textContent = name + "'s score is " + score;
            record.appendChild(li);
    }
}

createRecord();

// untuk mengulang kuis dari awal
function resetQuiz() {
    attempt = 0;
    // questionIndex = 0;
    score = 0;
    number = 0;
    myArray = [];
}

// untuk menampilkan kuis berikutnya dan hasil melihat hasil quiz
function quizOver() {
    nextQuestionBtn.classList.remove("show");
    seeResultBtn.classList.add("show");
}

// untk melihat hasil quiz
seeResultBtn.addEventListener("click", () => {
    // quizBox.style.display = "none";
    quizBox.classList.remove("show");
    seeResultBtn.classList.remove("show");
    quizOverBox.classList.add("show");
    quizResult();
})

// untuk memulai kembali quiz
startAgainQuizBtn.addEventListener("click", () => {
    quizBox.classList.add("show");
    quizOverBox.classList.remove("show");
    resetQuiz();
    nextQuestion();
})

// untuk kembali ke menu sebelumnya
goHomeBtn.addEventListener("click", () => {
    quizOverBox.classList.remove("show");
    quizHomeBox.classList.add("show");
    resetQuiz();
})

// untuk memulai kembali quiz dengan timer dan kuis yang telah diacak
startQuizBtn.addEventListener("click", () => {
    quizBox.classList.add("show");
    quizHomeBox.classList.remove("show");
    startTimer();
    generateRandomQuestion();
})

