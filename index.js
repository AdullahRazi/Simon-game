//Global variables
var colors=["green","red","yellow","blue"];
var sequence=[];
var currentClickedColor="";
var gameLevel=-1;
var sequenceCounter=0;

//Starting the game
$(document).on("keypress",function(){
   if(gameLevel==-1){
   nextSequence();
   $("h1").text("Level "+gameLevel);
   }

});

//Function that will generate a new sequence 

function nextSequence(){
   var randomColor= colors[Math.floor(Math.random()*4)];

   sequence.push(randomColor);
   generateFlash(randomColor);
   playSound(randomColor);
   gameLevel++;
   $("h1").text("Level "+gameLevel);

   currentClickedColor="";
   sequenceCounter=0;
}

//Event Listener for user clicks
$(".btn").on("click",function(){
   var clickedColor= this.getAttribute("id");
   currentClickedColor=clickedColor;
   animatePress(clickedColor);
   playSound(clickedColor);
   
   checkSequence();
});

//Function to judge user's click
function checkSequence(){
   if(sequence[sequenceCounter]==currentClickedColor){
      sequenceCounter++;
      if(sequenceCounter>sequence.length-1)
         setTimeout(function(){nextSequence()},1000);
   }   
   else
      gameOver();   
}

//Game over effects

   function gameOver(){
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
         $("body").removeClass("game-over");
         $("h1").text("Game Over, Press any key to restart");
      },500);
      

      gameLevel=-1;
      currentClickedColor="";
      sequence=[];
      sequenceCounter=0;
   }


//Utility functions below

// Function to play the sound
function playSound(soundName){
    var audio=new Audio("sounds/"+soundName+".mp3");
    audio.play();
}

//function to generate a button flash
function generateFlash(color){
   $("#"+color).fadeOut(100).fadeIn(100);
}

//function to animate on user clicks
function animatePress(color){
   $("#"+color).addClass("pressed");
   setTimeout(function(){
      $("#"+color).removeClass("pressed");
   },100);
}


