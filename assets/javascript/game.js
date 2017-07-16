// Declares all variables
var picture=["assets/images/correct.png", "assets/images/wrong.png", "assets/images/happy.png", "assets/images/question.png", "assets/images/normal.png"];
var name = $("#name").val();
var intervalId;
var number=0;
var correct=0;
var wrong=0;
var unanswered=0;
var press=false;

// Declares all questions array
var allQuestion = [
  a = {
    question:"What is Javascript?",
    option: ["JavaScript is an Object Oriented Programming language", "Javascript is a complete programming language", "Javascript is a structured programming language"],
    answer: "JavaScript is an Object Oriented Programming language",
    reason: ["This question is too easy for you... let's try harder question", ", javaScript is a client-side as well as server side scripting language. JavaScript is also an Object Oriented Programming language. You don't even know a basic question?!?"]
  },
  b = {
    question:"Is it possible to break JavaScript Code into several lines?",
    option: ["It is impossible!!!", "JavaScript ignores break in string statement", "Breaking within a string statement can be done by the use of a backslash"],
    answer: "Breaking within a string statement can be done by the use of a backslash",
    reason: ["Great!!! You know your stuff...", ", breaking within a string statement can be done by the use of a backslash, at the end of the first line. I think you need to go back to school"]
  },
  c = {
    question:"What is 'this' keyword in JavaScript?",
    option: ["It is a global variable that available throughout the length of the code", "It refers to the object from where it was called", "It is a declared variable in the program but have not been given any value"],
    answer: "It refers to the object from where it was called",
    reason: ["Great answer!!!", ", you don't know 'this' keyword... do you know 'that' keyword in JavaScript?"]
  }
];

// Declares timer object
var timer = {
  reset: function() {
    this.time = 12;
    $("#timer").show();
    $("#timer").html("Take your time, you have "+timer.time+" second");
  },
  start: function() {
    intervalId = setInterval(timer.count, 1000);  
  },
  stop: function() {
    clearInterval(intervalId);
  },
  count: function() {
    timer.time--;
    if (timer.time === 0) {
    answerResult.noAnswer();
    } else
    if (timer.time >= 6) {
    $('#timer').html("Take your time, you have "+timer.time+" second");
    } else
    if (timer.time < 6) {
    $('#timer').html("Hurry "+name+", you only have "+timer.time+" second left");
    $("#timer").animate({opacity:0},200,"linear",function(){
    $(this).animate({opacity:1},200);
    });
    }
    else {
    check();
    }
  }
};

// Declares the result for all the answers
var answerResult = {
  correctAnswer: function() {
    $("body").addClass("background");
    correct++;
    image(picture[0]);
    $("#timer").hide();
    $("#option").empty();
    $("#question").html(allQuestion[number].reason[0]);
    timer.time=10;
    setTimeout(check,1000*5);
  },
  wrongAnswer: function() {
    wrong++;
    image(picture[1]);
    $("#timer").hide();
    $("#option").empty();
    $("#question").html(name+allQuestion[number].reason[1]);
    timer.time=10;
    setTimeout(check,1000*5);
  },
  noAnswer: function() {
    unanswered++;
    image(picture[3]);
    $("#timer").hide();
    $("#option").empty();
    $("#question").html(name+allQuestion[number].reason[1]);
    timer.time=10;
    setTimeout(check,1000*5);
  }
};

// When OK button pressed on first page. 
$("#ok").click(function() {
  if ($("#name").val().length === 0 ) {
    alert("Please check-in your name");
    return;
  }
    $("#firstLoad").hide();
    timer.start();
    callQuestion(0);
  });

// When enter pressed on first page. Also Prevent space and numbers for input
$(document).keypress(function(e) {
  if(e.which == 13) {
    if (!press) {
    $("#name").change();
    $("#ok").click(); 
    }  
  }
  if (e.which == 32) {
    return false;
  } 
  if ((e.which > 47) && (e.which < 58)) {
    return false;
  }
});

// Uppercase the first letter then lowercase the rest from the name input 
$("#name").on("change",function(){
    this.value = this.value.substr(0, 1).toUpperCase() + this.value.substr(1).toLowerCase();
    name = $(this).val()
    $(this).attr("value",name);
});

// Load the first image and hide restart button
image(picture[0]);
$("#restart").hide();
 
// Function to call a Question
function callQuestion() {
  $("body").removeClass("background");
  press=true;
  timer.reset();
  image(picture[4]);
  $("#question").html(allQuestion[number].question);
  for (var i = 0; i < 3; i++) {
    var charDiv = $("<p>").text(allQuestion[number].option[i]);
    charDiv.attr("value",allQuestion[number].option[i]);
    charDiv.addClass("answer");
    $("#option").append(charDiv);
  }
  $(".answer").click(function() {
    var answer = ($(this).attr("value"));
    if (answer==allQuestion[number].answer) {
      answerResult.correctAnswer();
    } else {
      answerResult.wrongAnswer();
    }
  });
}

// Function to check the need to call next question or show the score
function check() {
  number++;
  timer.reset();
  $("#option").empty();
  if (number < allQuestion.length) {
    callQuestion(number);
  } else {
      score();
  }
}

// function to show the image
function image(pic) {
  var image=$("<img>");
  image.attr("src", pic);
  image.addClass("img-responsive")
  $("#pic").html(image);
}

// Function to show the score
function score() {
  $("body").addClass("background");
  timer.stop();
  var first = $("<p>").text("Here you go " + name + ",");
  var like = $("<p>").text("You got " + correct + " answer(s) correct");
  var dont = $("<p>").text("You got " + wrong + " answer(s) wrong");
  var why = $("<p>").text("You didn't answer " + unanswered + " question(s)");
  first.append(like).append(dont).append(why);
  $("#question").html(first);
  $("#timer").hide();
  $("#restart").show();
  image(picture[2]);
  if (correct===3) {
    first.append($("<p>").text("Congratulation "+name+"! You are hired!!! When can you start working?"));
  } else if (correct===2) {
    first.append($("<p>").text("We will contact you again for the second interview"))
  } else {
    first.append($("<p>").text("Thank you for your time, we will call you for the result within three days. Try to have a nice day!"))
  }
}

// When RESTART button pressed
$("#restart").click(function() {
  window.location.reload(true);
  });