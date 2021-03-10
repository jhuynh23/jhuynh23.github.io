/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
        "LEFT": 37,
        "RIGHT": 39,
        "UP": 38,
        "DOWN": 40
    }; //assigning names to the values of the arrow keys; getting rid of magic #s

  var boardWidth = $("#board").width(); 
  var boardHeight = $("#board").height();


  // Game Item Objects

  var positionX = 0;
  var positionY = 0;
  var speedX = 0;
  var speedY = 0;

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown);  // event handler: registers keyDown events, calls handleKeyDown in response
  $(document).on("keyup", handleKeyUp); //event handler: registers keyUp events, calls handleKeyUp in response

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */

  function newFrame() { //calls repositionGameItem and redrawGameItem in order to update the position of the box every 0.0166 seconds
    
    //will change the position of the box, checking for changes in speedX/speedY (which are in response to 'keydown' events)
    repositionGameItem();

    // STOPS THE BOX FROM GOING OUTSIDE OF THE BOUNDARIES
    if (positionX > boardWidth){
        speedX - 5;
        return speedX;
    }
    else if (positionX < 0){
        speedX + 5;
        return speedX; 
    }

    if (positionY > boardHeight){
        speedY - 5;
        return speedY;
    }
    else if (positionY < 0){
        speedY + 5;
        return speedY;
    }

    //updates the new positions from repositionGameItem to the CSS which will appear ingame    
    redrawGameItem(); 

  }
  
  /* 
  Called in response to events.
  */

  function handleKeyUp (event) { //stops the box from moving when no keys are being pressed instead of moving continuously
    speedX = 0;
    speedY = 0;
  }

  function handleKeyDown(event) { 
    if (event.which === KEY.LEFT) {
        console.log("left pressed");
        speedX = -5; //when the left arrow key is pressed, speedX will be -5 (useful later for changing the positionX)
    }
    else if (event.which === KEY.RIGHT) {
        console.log("right pressed");
        speedX = 5; //when the right arrow key is pressed, speedX will be 5 (useful later for changing the positionX)
    }
    else if (event.which === KEY.UP) {
        console.log("up pressed");
        speedY = -5; //when the up arrow key is pressed, speedY will be -5 (useful later for changing the positionY)
    }
    else if (event.which === KEY.DOWN) {
        console.log("down pressed");
        speedY = 5; //when the down arrow key is pressed, speedY will be 5 (useful later for changing the positionY)
    } //speedY is negative for KEY.UP because the position is set relative to the top, not the bottom

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(){
    positionX += speedX;
    // changes the X position depending on what speedX is (speedX is determined by which key is pressed (see function handleKeyDown))

    positionY += speedY;  
    // changes the Y position depending on what speedY is (speedY is determined by which key is pressed (see function handleKeyDown))
    
  }

  function redrawGameItem(){ //(will be called in function newFrame to update the position of the box every 0.0166 seconds)
    $("#gameItem").css("left", positionX);
    // rewrites what the X position of the gameItem is in CSS
    $("#gameItem").css("top", positionY);
    // rewrites what the Y position of the gameItem is in CSS
  } 

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
