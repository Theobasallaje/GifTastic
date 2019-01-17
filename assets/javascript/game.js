
var questions = [
    {
        question: "Question 1?",
        options: ["answer", "O2", "O3", "O4"],
        answer: "answer"
    },
    {
        question: "Question 2?",
        options: ["answer", "O2", "O3", "O4"],
        answer: "answer"
    },
    {
        question: "Question 3?",
        options: ["answer", "O2", "O3", "O4"],
        answer: "answer"
    }
];
//objects
var results = {

}

//global variables
var questionsElement = $("#questions");
var submit = $("#submit");
var timerElement = $("#timer");
var timer = 60
var timerInterval;

var correct = 0;
var wrong = 0;
var counter = 0;

//functions
function startGame(){
    correct = 0;
    wrong=0;
    timer=60;
    timerInterval = setInterval(function(){ 
        if(timer > 1){ 
            timer-- 
            timerElement.html("Timer: " + timer);
        } else{ 
            alert("time out")
            clearInterval(timerInterval)
        } 
    }
    
    , 1000)
    timerElement.html("Timer: " + timer);
    questionsElement.empty();
    displayQuestions();
}

startGame()


// function displayQuestions(){
//     for (var i=0; i<questions.length; i++){
//         questionsElement.append(`<div class="card">${questions[i].question}</div>`);
//         for (var j=0; j< questions[i].options.length; j++){
//             questionsElement.append(`<input number=${i+1} data-value="${questions[i].options[j]}" name=${questions[i].question} type="radio" class="options">${questions[i].options[j]}`);
//         }
//     }
// }

function displayQuestion(counter){
    
    counter++;
}


$(document).on('click', '.options', function(){
    var value = $(this).attr('data-value');
    var questionNumber = $(this).attr('number');
    // alert(questionNumber + value);
    results[questionNumber] = value;
    console.log(results);
})

submit.on('click', function(){
    for (var i=0; i<questions.length; i++){
        if (questions[i].answer === results[i+1]){
            correct++;
        }
        else {
            wrong++;
        }
    }
    clearInterval(timerInterval);
    console.log(correct);
    console.log(wrong);
    $('#questions').html(`<div> you had this many correct :  ${correct}</div>
                        <div> you had this many wrong : ${wrong}</div>`);
    setTimeout(startGame, 2000)
})


