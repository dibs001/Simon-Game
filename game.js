var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
$(document).keypress(()=>{
    if (!started)
    {$("#level-title").text("Level " + level);
    nextSequence();
    started=true;}
});
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]==userClickedPattern[currentLevel])
    {console.log("Success");
    if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
    }}else
    {console.log("Wrong");
    playSound("wrong");
    $("#level-title").text("Game Over!Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(()=>{
    $("body").removeClass("game-over");
},200);
    startover();
    }
}
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(()=>{
        $("#"+currentColour).removeClass("pressed");
},100);
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    }
    function startover(){
        gamePattern=[];
        started=false;
        level=0;
    }