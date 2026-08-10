
// CATEGORY VARIABLES


var chosenCategory = "";
var chosenDifficulty = "";
var chosenAmount = 10;
var questionSource = "api";


// WELCOME MESSAGE


var storedName = sessionStorage.getItem("playerName");
var welcomeText = document.getElementById("welcomeText");

if (storedName != null && welcomeText) {

    welcomeText.innerHTML =
        "Hi " + storedName + ", choose your quiz settings";

}


// OPTION PILLS


var optionGroups = document.querySelectorAll(".option-pills");

for (var i = 0; i < optionGroups.length; i++) {

    var pills = optionGroups[i].querySelectorAll(".pill");

    for (var j = 0; j < pills.length; j++) {

        pills[j].onclick = function () {

            var group = this.parentElement;

            var allPills = group.querySelectorAll(".pill");

            for (var k = 0; k < allPills.length; k++) {

                allPills[k].classList.remove("selected");

            }

            this.classList.add("selected");

            var targetId = group.getAttribute("data-target");

            var target = document.getElementById(targetId);

            if (target) {

                target.value = this.getAttribute("data-value");

            }

        };

    }

}

// BEGIN QUIZ


function beginQuizClicked() {

    chosenCategory =
        document.getElementById("categorySelect").value;

    chosenDifficulty =
        document.getElementById("difficultySelect").value;

    chosenAmount =
        parseInt(document.getElementById("amountSelect").value);


   
    // QUESTION SOURCE
   

    var sourceSelect =
        document.getElementById("sourceSelect");

    if (sourceSelect) {

        questionSource = sourceSelect.value;

    }
    else {

        questionSource = "api";

    }


    
    // SAVE QUIZ SETTINGS
   

    sessionStorage.setItem(
        "category",
        chosenCategory
    );

    sessionStorage.setItem(
        "difficulty",
        chosenDifficulty
    );

    sessionStorage.setItem(
        "amount",
        chosenAmount
    );

    sessionStorage.setItem(
        "questionSource",
        questionSource
    );



    // RESET OLD QUIZ DATA
   

    sessionStorage.removeItem("score");
    sessionStorage.removeItem("correct");
    sessionStorage.removeItem("wrong");
    sessionStorage.removeItem("skipped");
    sessionStorage.removeItem("total");
    sessionStorage.removeItem("review");


   
    // GO TO QUIZ
  

    window.location.href = "quiz.html";

}