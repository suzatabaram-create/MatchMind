
// QUIZ VARIABLES
 

var playerName = "";
var quizQuestions = [];
var currentQuestionIndex = 0;
var chosenCategory = "";
var chosenDifficulty = "";
var chosenAmount = 10;
var questionSource = "api";



// SCORE VARIABLES


var score = 0;
var correct = 0;
var wrong = 0;
var skipped = 0;



// ANSWER VARIABLE


var answered = false;



// REVIEW VARIABLES


var review = [];
var questionTime = 0;



// TIMER VARIABLES


var timeLeft = 30;
var timer;



// START QUIZ


if (document.querySelector(".question")) {

    chosenCategory =
        sessionStorage.getItem("category") || "any";

    chosenDifficulty =
        sessionStorage.getItem("difficulty") || "easy";

    chosenAmount =
        parseInt(
            sessionStorage.getItem("amount") || 10
        );

    questionSource =
        sessionStorage.getItem("questionSource") || "api";

    currentQuestionIndex = 0;

    loadQuestions();
}



// LOAD QUESTIONS


function loadQuestions() {

    
    // MANUAL QUESTIONS
    

    if (questionSource == "manual") {

        loadManualQuestions();

        return;
    }


   
    // API QUESTIONS
   

    loadAPIQuestions();
}



// LOAD API QUESTIONS


function loadAPIQuestions() {

    var apiUrl =
        "https://opentdb.com/api.php?amount=" +
        chosenAmount +
        "&type=multiple";


    if (chosenCategory != "any") {

        apiUrl +=
            "&category=" + chosenCategory;
    }


    if (chosenDifficulty != "any") {

        apiUrl +=
            "&difficulty=" + chosenDifficulty;
    }


    console.log(apiUrl);


    fetch(apiUrl)

        .then(function(response) {

            return response.json();

        })

        .then(function(data) {

            if (data.response_code != 0) {

                alert("No questions found.");

                window.location.href =
                    "category.html";

                return;
            }


            quizQuestions = data.results;

            currentQuestionIndex = 0;

            showQuestion();

        })

        .catch(function(error) {

            console.log(error);

            alert("Could not load questions.");

        });
}



// LOAD MANUAL QUESTIONS


function loadManualQuestions() {


   
    // ALL CATEGORIES
   

    if (chosenCategory == "any") {

        loadAllManualQuestions();

        return;
    }


    var selectedQuestions = [];


   
    // FIND CATEGORY + DIFFICULTY
    

    for (
        var i = 0;
        i < manualQuestions.length;
        i++
    ) {

        var group =
            manualQuestions[i];


        if (
            group.category ==
            getManualCategory()

            &&

            group.difficulty.toLowerCase() ==
            chosenDifficulty.toLowerCase()
        ) {

            selectedQuestions =
                group.questions.slice();

            break;
        }
    }


   
    // CHECK QUESTIONS
    

    if (selectedQuestions.length == 0) {

        alert(
            "No manual questions found for this category and difficulty."
        );

        window.location.href =
            "category.html";

        return;
    }


    
    // SHUFFLE QUESTIONS
    

    selectedQuestions =
        shuffle(selectedQuestions);


   
    // SELECT NUMBER OF QUESTIONS
    

    quizQuestions =
        selectedQuestions.slice(
            0,
            chosenAmount
        );


    currentQuestionIndex = 0;

    showQuestion();
}



// MANUAL CATEGORY NAME


function getManualCategory() {

    if (chosenCategory == "9") {

        return "General Knowledge";
    }


    if (chosenCategory == "17") {

        return "Science & Nature";
    }


    if (chosenCategory == "18") {

        return "Computers";
    }


    if (chosenCategory == "19") {

        return "Mathematics";
    }


    if (chosenCategory == "21") {

        return "Sports";
    }


    // If All Categories is selected

    return "";
}



// LOAD MANUAL ALL CATEGORIES


function loadAllManualQuestions() {

    var allQuestions = [];


    for (
        var i = 0;
        i < manualQuestions.length;
        i++
    ) {

        var group =
            manualQuestions[i];


        if (
            group.difficulty.toLowerCase() ==
            chosenDifficulty.toLowerCase()
        ) {

            for (
                var j = 0;
                j < group.questions.length;
                j++
            ) {

                allQuestions.push(
                    group.questions[j]
                );
            }
        }
    }


    
    // CHECK QUESTIONS
   

    if (allQuestions.length == 0) {

        alert(
            "No manual questions found for this difficulty."
        );

        window.location.href =
            "category.html";

        return;
    }


   
    // SHUFFLE QUESTIONS
    

    allQuestions =
        shuffle(allQuestions);


   
    // SELECT NUMBER OF QUESTIONS
    

    quizQuestions =
        allQuestions.slice(
            0,
            chosenAmount
        );


    currentQuestionIndex = 0;

    showQuestion();
}


// SHUFFLE


function shuffle(array) {

    for (
        var i = array.length - 1;
        i > 0;
        i--
    ) {

        var j =
            Math.floor(
                Math.random() * (i + 1)
            );


        var temp =
            array[i];

        array[i] =
            array[j];

        array[j] =
            temp;
    }


    return array;
}



// DECODE HTML


function decodeHTML(html) {

    var txt =
        document.createElement("textarea");

    txt.innerHTML = html;

    return txt.value;
}



// TIMER


function startTimer() {

    clearInterval(timer);

    timeLeft = 30;

    questionTime = 0;


    document.querySelector(".timer").innerHTML =
        timeLeft + "s";


    timer = setInterval(function() {

        timeLeft--;

        questionTime++;


        document.querySelector(".timer").innerHTML =
            timeLeft + "s";


        if (timeLeft <= 0) {

            clearInterval(timer);

            skipQuestion();
        }

    }, 1000);
}



// SHOW QUESTION


function showQuestion() {

    var q =
        quizQuestions[currentQuestionIndex];


    if (q == null) {

        return;
    }


    document.querySelector("h4").innerHTML =
        "Question " +
        (currentQuestionIndex + 1);


    document.querySelector("h3").innerHTML =
        decodeHTML(q.question);


    var options = [];


    // API QUESTION
  

    if (questionSource == "api") {

        options.push(q.correct_answer);


        for (
            var i = 0;
            i < q.incorrect_answers.length;
            i++
        ) {

            options.push(
                q.incorrect_answers[i]
            );
        }
    }


   
    // MANUAL QUESTION
    

    else {

        for (
            var i = 0;
            i < q.options.length;
            i++
        ) {

            options.push(
                q.options[i]
            );
        }
    }


    // SHUFFLE OPTIONS
    

    options =
        shuffle(options);


   
    // DISPLAY OPTIONS
   

    var optionBoxes =
        document.querySelectorAll(".text");


    for (
        var i = 0;
        i < optionBoxes.length;
        i++
    ) {

        optionBoxes[i].innerHTML =
            decodeHTML(options[i]);
    }


    
    // SAVE CORRECT ANSWER
    

    var correctAnswer;


    if (questionSource == "api") {

        correctAnswer =
            decodeHTML(q.correct_answer);
    }

    else {

        correctAnswer =
            decodeHTML(q.answer);
    }


    document.querySelector(".card").dataset.correct =
        correctAnswer;


  
    // SAVE OPTIONS FOR REVIEW
  

    document.querySelector(".card").dataset.options =
        JSON.stringify(options);


    
    // RESET BUTTONS
  

    var optionButtons =
        document.querySelectorAll(".option");


    for (
        var i = 0;
        i < optionButtons.length;
        i++
    ) {

        optionButtons[i].classList.remove(
            "selected"
        );
    }


    answered = false;

    startTimer();
}


// OPTION BUTTONS


var optionButtons =
    document.querySelectorAll(".option");


for (
    var i = 0;
    i < optionButtons.length;
    i++
) {

    optionButtons[i].onclick = function() {


        if (answered == true) {

            return;
        }


      
        // REMOVE OLD SELECTION
       

        for (
            var j = 0;
            j < optionButtons.length;
            j++
        ) {

            optionButtons[j].classList.remove(
                "selected"
            );
        }


        this.classList.add("selected");


       
        // GET ANSWER
       

        var selectedAnswer =
            this.querySelector(".text").innerHTML;


        var correctAnswer =
            document.querySelector(".card")
            .dataset.correct;


        var optionList =
            JSON.parse(
                document.querySelector(".card")
                .dataset.options
            );


       
        // CHECK ANSWER
      

        if (selectedAnswer == correctAnswer) {

            correct++;


          
            // SCORE
          

            if (timeLeft > 20) {

                score =
                    score + 30;
            }

            else if (timeLeft > 10) {

                score =
                    score + 20;
            }

            else {

                score =
                    score + 10;
            }


         
            // REVIEW
           

            review.push({

                question:
                    decodeHTML(
                        quizQuestions[
                            currentQuestionIndex
                        ].question
                    ),

                options:
                    optionList,

                selected:
                    selectedAnswer,

                correct:
                    correctAnswer,

                result:
                    true,

                time:
                    questionTime
            });
        }


        else {

            wrong++;


            review.push({

                question:
                    decodeHTML(
                        quizQuestions[
                            currentQuestionIndex
                        ].question
                    ),

                options:
                    optionList,

                selected:
                    selectedAnswer,

                correct:
                    correctAnswer,

                result:
                    false,

                time:
                    questionTime
            });
        }


        answered = true;

        clearInterval(timer);
    };
}



// SKIP QUESTION


function skipQuestion() {

    clearInterval(timer);


    if (answered == true) {

        return;
    }


    var correctAnswer =
        document.querySelector(".card")
        .dataset.correct;


    var optionList =
        JSON.parse(
            document.querySelector(".card")
            .dataset.options
        );


   
    // COUNT SKIPPED
  

    skipped++;


    // SAVE REVIEW
    

    review.push({

        question:
            decodeHTML(
                quizQuestions[
                    currentQuestionIndex
                ].question
            ),

        options:
            optionList,

        selected:
            "Skipped",

        correct:
            correctAnswer,

        result:
            false,

        time:
            questionTime
    });


    answered = true;


  
    // GO TO NEXT QUESTION
  

    currentQuestionIndex++;


    if (
        currentQuestionIndex >=
        quizQuestions.length
    ) {

        finishQuiz();

        return;
    }


    showQuestion();
}



// NEXT QUESTION


function nextQuestion() {

    clearInterval(timer);


    if (answered == false) {

        alert(
            "Please select an answer or press Skip."
        );

        startTimer();

        return;
    }


    currentQuestionIndex++;


    if (
        currentQuestionIndex >=
        quizQuestions.length
    ) {

        finishQuiz();

        return;
    }


    showQuestion();
}



// FINISH QUIZ


function finishQuiz() {

    clearInterval(timer);


    sessionStorage.setItem(
        "score",
        score
    );


    sessionStorage.setItem(
        "correct",
        correct
    );


    sessionStorage.setItem(
        "wrong",
        wrong
    );


    sessionStorage.setItem(
        "skipped",
        skipped
    );


    sessionStorage.setItem(
        "total",
        quizQuestions.length
    );


 
    // SAVE REVIEW
    

    sessionStorage.setItem(
        "review",
        JSON.stringify(review)
    );


    window.location.href =
        "score.html";
}