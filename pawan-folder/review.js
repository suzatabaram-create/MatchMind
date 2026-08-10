// ===========================
// GET REVIEW DATA
// ===========================

var data =
JSON.parse(sessionStorage.getItem("review"));

var box =
document.getElementById("box");


// ===========================
// SHOW ALL QUESTIONS
// ===========================

for(var i = 0; i < data.length; i++){

    var item = data[i];

    var text = "";

    text += "<div class='box'>";

    text += "<h3>Question " + (i + 1) + "</h3>";

    text += "<p>" + item.question + "</p>";


    // Show all options

    for(var j = 0; j < item.options.length; j++){

        var cls = "option";

        if(item.options[j] == item.correct){

            cls = "option correct";

        }

        if(item.options[j] == item.selected &&
           item.selected != item.correct){

            cls = "option wrong";

        }

        text += "<div class='" + cls + "'>";

        text += item.options[j];

        text += "</div>";

    }


    // Skipped question

    if(item.selected == "Skipped"){

        text += "<p class='skip'>Your Answer : Skipped</p>";

    }


    text += "<p class='time'>Time Taken : " + item.time + " seconds</p>";

    text += "</div>";

    box.innerHTML += text;

}