var score = parseInt(sessionStorage.getItem("score")) || 0;
var correct = parseInt(sessionStorage.getItem("correct")) || 0;
var wrong = parseInt(sessionStorage.getItem("wrong")) || 0;
var skipped = parseInt(sessionStorage.getItem("skipped")) || 0;
var total = parseInt(sessionStorage.getItem("total")) || 0;


// ===========================
// CALCULATE FULL MARKS
// ===========================

var fullMarks = total * 30;


// ===========================
// SCORE CIRCLE
// ===========================

// Show score like 240/300
document.querySelector(".circle").innerHTML =
score + "/" + fullMarks;


// ===========================
// STATISTICS
// ===========================

document.querySelectorAll(".card h3")[0].innerHTML = correct;
document.querySelectorAll(".card h3")[1].innerHTML = wrong;
document.querySelectorAll(".card h3")[2].innerHTML = skipped;


// ===========================
// RESULT MESSAGE
// ===========================

var title = document.querySelector(".result-text h2");
var message = document.querySelector(".result-text p");

var percent = (score / fullMarks) * 100;

if (percent == 100) {

    title.innerHTML = "Perfect Score!";
    message.innerHTML =
        "Great job — you got all answers correct.";

}
else if (percent >= 80) {

    title.innerHTML = "Excellent!";
    message.innerHTML =
        "You performed really well.";

}
else if (percent >= 60) {

    title.innerHTML = "Good Job!";
    message.innerHTML =
        "Nice effort. Keep practicing.";

}
else if (percent >= 40) {

    title.innerHTML = "Not Bad";
    message.innerHTML =
        "Practice a little more to improve.";

}
else {

    title.innerHTML = "Keep Practicing!";
    message.innerHTML =
        "Don't give up. Try again.";

}