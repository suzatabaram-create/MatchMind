var playerName = "";
function startQuiz() {

    var userName = document.getElementById("userName").value;
    if (userName == "") {
        alert("Please enter your name");
        return;}
        
    sessionStorage.setItem("playerName", userName);
    window.location.href = "category.html";
}