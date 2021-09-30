var highscorePage = document.querySelector('#highscorePage');
var questionsPage = document.querySelector('#questionsPage');

document.getElementById("HSlinkpage").addEventListener("click", ()=>{

    questionsPage.style.display = 'none';

    highscorePage.style.display = 'block';

    //clears scores
    clear.addEventListener("click", function() {

        localStorage.clear();

        highScore.innerHTML = null;

    });
    //go back button
    goBack.addEventListener("click", function () {
        window.location.replace("./index.html");
        console.log(goBack);
    });
});

var questions = [
    {
        title: "This turtle gets its name because of its exceptionally large head:",
        choices: ["Leatherback sea turtle", "Hawksbill sea turtle", "Loggerhead sea turtle", "Green sea turtle"],
        answer: "Loggerhead sea turtle"
    },
    {
        title: "What do hawksbill sea turtles eat?",
        choices: ["Sponges", "Anemones", "Squid", "All of the above"],
        answer: "All of the above"
    },
    {
        title: "When a female turtle crawls out of the ocean onto a beach, but for some reason does not nest, it is called a:",
        choices: ["Successful crawl", "Head start", "False crawl", "Body pit"],
        answer: "False crawl"
    },
    {
        title: "While a female sea turtle is nesting, she appears to shed 'tears,' but the turtle is really:",
        choices: ["Secreting extra water from her body", "Secreting extra salt from her body", "Secreting sand from her body", "Secreting sugar from her body"],
        answer: "Secreting extra salt from her body"
    },
    {
        title: "All sea turtles nest in these regions of the world:",
        choices: ["Arctic & temperate waters", "Temperate & subtropical waters", "Subtropical & tropical waters", "Tropical & arctic waters"],
        answer: "Subtropical & tropical waters"
    },

];

var score = 0;
var questionIndex = 0

var currentTime = document.querySelector("#currentTime"),
 timer = document.querySelector("#startTime"),
 questionsDiv = document.querySelector("#questionsDiv"),
 container = document.querySelector("#container");

var secondsLeft = 30;
var holdInterval = 0;
var penalty = 5;
var createList = document.createElement("ul");

timer.addEventListener("click", function() {
    if (holdInterval === 0) {
        holdInterval = setInterval(function() {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        return;
        }, 1000);
    }
    render(questionIndex);
    return;
});

function render(questionIndex) {

    questionsDiv.innerHTML = "";
    createList.innerHTML = "";
    
    for (var i = 0; i < questions.length; i++) {

    
        var userQuestion = questions[questionIndex].title;
    
        var userChoices = questions[questionIndex].choices;
    
        questionsDiv.textContent = userQuestion;

    }
    
    userChoices.forEach(function (newItem) {
    
        var listItem = document.createElement("li");
    
        listItem.textContent = newItem;
    
        questionsDiv.appendChild(createList);
    
        createList.appendChild(listItem);
    
        listItem.addEventListener("click", (compare));
    
    })

}

function compare(event) {

    var element = event.target;
    //try spacing out your code to read easier

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
    
        createDiv.setAttribute('id', 'createDiv');
 
        if (element.textContent == questions[questionIndex].answer) {
 
            score++;
 
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
 
        } else {
 
            secondsLeft = secondsLeft - penalty;

            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
            console.log();
        }

    }

    //scrolls through questions
    questionIndex++;
    if (questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "Done with Quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
}
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // takes the time remainng as score and appends to page 
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }
    //text
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);
    //declares the input space of initials, starts empty
    var createInitial = document.createElement("input");
    createInitial.setAttribute("type", "text");
    createInitial.setAttribute("id", "initials");
    createInitial.textContent = "";

    questionsDiv.appendChild(createInitial);

    // create submit button
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    createSubmit.addEventListener("click", function () {
        var initials = createInitial.value;
        //no empty inputs will be valid
        if (initials == '') {
            alert("No value entered!");
            return;
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }

            allScores.push(finalScore);


            var newScore = JSON.stringify(allScores);

            localStorage.setItem("allScores", newScore);
            // var questionsPage = document.querySelector('#questionsPage');
            questionsPage.style.display = 'none';
        }
        // var highscorePage = document.querySelector('#highscorePage');

        highscorePage.style.display = 'block';

        var highScore = document.querySelector("#highScore");

        var clear = document.querySelector("#clear");

        var goBack = document.querySelector("#goBack");



        var allScores = localStorage.getItem("allScores");

        allScores = JSON.parse(allScores);

        if (allScores !== null) {

            for (var i = 0; i < allScores.length; i++) {

                var createLi = document.createElement("li");
                createLi.textContent = allScores[i].initials + " " + allScores[i].score;
                highScore.appendChild(createLi);

            }
        }

        //clears scores
        clear.addEventListener("click", function() {

            localStorage.clear();

            highScore.innerHTML = null;

        });

        goBack.addEventListener("click", function () {
            window.location.replace("./index.html");
            console.log(goBack);
        });

    });
}



