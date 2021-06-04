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
    question: "hasil dari (10+20)^2?",
    options: ["900", "300", "600", "100"],
    answer: 0,
    description: "jawabanny adalah 900",
}, {
    question: "hasil dari 20 x (10+5)?",
    options: ["200", "250", "300", "600"],
    answer: 2,
    description: "jawabannya adalah 300",
}, {
    question: "hasil dari 4x-82 jika nilai x=5?",
    options: ["102", "202", "82", "182"],
    answer: 0,
    description: "jawabannya adalah 102",
}, {
    question: "hasil dari 4,036:0,04 adalah?",
    options: ["1.009", "10.09", "100.9", "100.09"],
    answer: 2,
    description: "hasilnyaa adalah 100.9.",
}, {
    question: "hasil dari 0,875 : 1/4 adalah?",
    options: ["0.75", "0.86", "0.90", "0.70"],
    answer: 3,
    description: "jawabannya adalah 0.70.",
}, {
    question: "hasil dari 34x-6x+4 jika nilai x=10 adalah?",
    options: ["290", "284", "296", "270"],
    answer: 1,
    description: "jawabannya adalah 284",
}, {
    question: "jika x = 54 + 6 + 0.5 y =70.5 maka?",
    options: ["x > y", "x = y", "x < y", "y < x"],
    answer: 2,
    description: "jawabannya x < y",
}, {
    question: "jika x berat total p kotak yang masing-masing beratnya q kg, dan y = berat total q kotak yang masing-masing beratnya p kg, maka…?",
    options: ["x > y", "x = y", "x < y", "x dan y tidak bisa ditentukan"],
    answer: 1,
    description: "jawabannya adalah x = y",
}, {
    question: "jika nilai x terletak antara y dan z. sedang z < x maka?",
    options: ["x > y", "x = y", "x < y", "x dan y tidak bisa ditentukan"],
    answer: 3,
    description: "jawabannya adalah x dan y tidak bisa ditentukan",
}, {
    question: "Berapakah 33% dari 163?",
    options: ["53.79", "54.33", "5.37", "5379"],
    answer: 0,
    description: "jawabannya adalah 53.79",
}, {
    question: "Jika sebuah foto berukuran 12 cm dan 15 cm diletakkan disebuah karton. Pada bagian atas kiri dan kanan foto masih tersisa karton selebar 2 cm, jika foto dan karton sebangun maka panjang karton adalah...?",
    options: ["25 cm", "30 cm", "15 cm", "20 cm"],
    answer: 3,
    description: "jawabannya adalah 20 cm",
}, {
    question: "Pak RW mendapat sumbangan 8 karung beras. Tiap karung beratnya 50 kg. Beras dibagikan kepada 20 orang warga. Tiap warga memperoleh beras sebanyak…?",
    options: ["20 kg", "25 kg", "30 kg", "35 kg"],
    answer: 0,
    description: "jawabannya adalah 20 kg",
}, {
    question: "Berapa banyak rusuk yang dimiliki kubus?",
    options: ["6 buah rusuk", "8 buah rusuk", "10 buah rusuk", "12 buah rusuk"],
    answer: 3,
    description: "jawabannya adalah 12 buah rusuk",
}, {
    question: "Diketahui nilai : A = 5, B = 2 Hitunglah jika A³ – 3A²B + 3AB² – B³?",
    options: ["25", "27", "30", "35"],
    answer: 0,
    description: "jawabannya adalah 27",
}, {
    question: "hasil dari 100 – 4 – 90 – 7 – 80 adalah?",
    options: ["8", "9", "10", "15"],
    answer: 2,
    description: "jawabannya adalah 10",
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
        timeLimit--;//mengurangi nilai waktu
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

