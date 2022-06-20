var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var gameStarted = false;

$(document).on("keydown", function() {
  //this if statement will run when game starts for the first time or on Restart
  if (!gameStarted) {
    $("#level-title").text("Level " + level);
    gameStarted = true;
    nextSequence();
  }
});

function nextSequence() {

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4); //random number btw 0-3

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //animating pressed button

  playSound(randomChosenColor); //playing sound for pressed button
}


//taking user input

$(".btn").on("click", function() {

  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer((userClickedPattern.length) - 1); //passing index of last input by user
});


//playing sound of pressed button

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//animating pressed button

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function checkAnswer(userInputIndex) {

  if (userClickedPattern[userInputIndex] === gamePattern[userInputIndex]) {

    if (userInputIndex === (gamePattern.length) - 1) //if all inputs of user were correct
    {
      userClickedPattern = []; //moving to next level
      setTimeout(nextSequence(), 2000);
    }
  } else {

    playSound("wrong");

    $("body").addClass("game-over"); //adding class game-over to body

    setTimeout(function() {
      $("body").removeClass("game-over"); //removing class game-over from body
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart"); //changing title to GameOver

    startOver(); //restarting the game
  }
}


//Restarting the game

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
  userClickedPattern = [];
}
