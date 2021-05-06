/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // KEYS SETUP //

  var KEY = {
        "W": 87,
        "S": 83,
        "UP": 38,
        "DOWN": 40 
    };
  
  // Game Item Objects
  var points;
  
function gameObject($id){
  var Object = {};
  
  Object.id = $id;
  Object.x = Number($($id).css('left').replace(/[^-\d\.]/g, ''));
  Object.y = Number($($id).css('top').replace(/[^-\d\.]/g, ''));
  Object.width = $($id).width();
  Object.height = $($id).height();
  Object.speedX = 0;
  Object.speedY = 0;

  return Object;
}

var rightpaddle = gameObject("#rightpaddle");
var leftpaddle = gameObject("#leftpaddle");
var ball = gameObject("#ball");
var board = gameObject("#board");
var leftpaddleScoreBox = gameObject("#leftpaddleScoreBox");
var rightpaddleScoreBox = gameObject("#rightpaddleScoreBox");
var obj1Score = 0;
var obj2Score = 0;
var ballStartingX = 325;
var ballStartingY = 200;
//   var ballPositionX;
//   var ballPositionY;
//   var ballSpeedX;
//   var ballSpeedY;
//   var leftpaddlePositionX; //(static?)//
//   var rightpaddlePositionX; //(static?)//
//   var rightpaddlePositionY; // not static //
//   var leftpaddlePositionY; //not static//
//   var dottedlinePositionX;

//   var leftpaddleSpeedY;
//   var rightpaddleSpeedY;
   //points (board.length, board,width)//



  // one-time setup

  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  
  $(document).on('keydown', handleKeyDown);  // event handler: registers keyDown events, calls handleKeyDown in response                         
  $(document).on('keyup', handleKeyUp); // event handler: registers keyUp events, calls handleKeyUp in response
  $(document).on('click', handleOnClick);


  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
*/
  function newFrame() {
    repositionPaddle(); // updates the positions
 
    var rightpaddleBottomY = rightpaddle.y + rightpaddle.height; //finds the value of right paddle's bottom border
    var leftpaddleBottomY = leftpaddle.y + leftpaddle.height; //finds the value of left paddle's bottom border
        //// PADDLE-WALL COLLISIONS ////////

        if (rightpaddle.y < 0){ //stops the right paddle from crossing to top border
            rightpaddle.speedY = 0;
            return rightpaddle.speedY;
        }
        
        else if (rightpaddleBottomY > board.height){ //stops the right paddle from crossing the bottom border
            rightpaddle.speedY = 0;
            return rightpaddle.speedY;
        }

        else if (leftpaddle.y < 0){ //stops the left paddle from crossing to top border
            leftpaddle.speedY = 0;
            return leftpaddle.speedY;
        }
        else if (leftpaddleBottomY > board.height){ //stops the left paddle from crossing to bottom border
            leftpaddle.speedY = 0;
            return leftpaddle.speedY;
        }

    redrawPaddle(); // redraws the objects in their new positions
    stopBall();
    displayScore(leftpaddleScoreBox, rightpaddleScoreBox);

  }
  
  
  ////////////////     HANDLER FUNCTIONS -  called in response to events    /////////////////////////////////////////
  

  function handleEvent(event) {
        //KEEPING THIS FOR REFERENCE RIGHT NOW
  }

  function handleOnClick(event){	      

    console.log("clickity");

    pickSides(); //gets the ball to move at the start of the game randomly

    // //// BALL-WALL COLLISIONS ////////
    // var ballBottomY = ball.y + ball.height; //finds the value of right paddle's bottom border

    // if (ball.y < 0){ //stops the ball from crossing to top border
    //     ball.speedY = 0;
    //     ball.speedX = 0;
    //     return ball.speedY;
    //     return ball.speedX;
    //     }
        
    // else if (ball.y > board.height){ //stops the ball from crossing the bottom border
    //     ball.speedY = 0;
    //     ball.speedX = 0;
    //     return ball.speedY;
    //     return ball.speedX;
    //     }
 }

  function handleKeyDown(event) { //called in response to a keyDown event//
    if (event.which === KEY.UP) { //when the up arrow key is pressed, the right paddle's speedY will be 5. this causes the rightpaddle to go up.
        rightpaddle.speedY = -5; 
    }
    else if (event.which === KEY.DOWN) {//when the down arrow key is pressed, the right paddle's speedY will be -5. this causes the rightpaddle to go down.
        rightpaddle.speedY = 5;
    }

    else if (event.which === KEY.W) { //when the W key is pressed, the left paddle's speedY will be 5. this causes the leftpaddle to go up.
        leftpaddle.speedY = -5;
    }

    else if (event.which === KEY.S) { //when the W key is pressed, the left paddle's speedY will be 5. this causes the leftpaddle to go up.
        leftpaddle.speedY = 5;
    }
  }

  function handleKeyUp (event) {
    rightpaddle.speedY = 0;
    leftpaddle.speedY = 0;
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionPaddle () {
      rightpaddle.y += rightpaddle.speedY;

    //updates the right paddle's y when speedY changes

      leftpaddle.y += leftpaddle.speedY;

    //updates the left paddle's y when speedY changes

      ball.x += ball.speedX;

    //updates the ball's x when speedX changes

      ball.y += ball.speedY;

    //updates the ball's y when speedY changes

  }

  function redrawPaddle(){ //(will be called in function newFrame to update the position of the paddle every 0.0166 seconds)
   
    $("#rightpaddle").css("top", rightpaddle.y);
    // rewrites what the Y position of the rightPaddle is in CSS

    $("#leftpaddle").css("top", leftpaddle.y);
    // rewrites what the Y position of the leftPaddle is in CSS

    $("#ball").css("left", ball.x);
    // rewrites what the X position of the ball is in CSS

    $("#ball").css("top", ball.y);
    // rewrites what the Y position of the ball is in CSS
  } 

  function stopBall(){
          //// BALL-WALL COLLISIONS (non-scoring)////////

    var ballBottomY = ball.y + ball.height; //finds the value of right paddle's bottom border
    var ballRightX = ball.x + ball.width;

    if (ball.y < 0){ //stops the ball from crossing to top border
        ball.speedY = ball.speedY * -1;
        return ball.speedY;
        }
        
    else if (ballBottomY > board.height){ //stops the ball from crossing the bottom border
        ball.speedY = ball.speedY * -1;
        return ball.speedY;
        }
        //// BALL-WALL COLLISIONS (scoring)////////
    else if (ball.x < 0){ //when the ball crosses the left side of the board, it will return ot its starting position
        ball.speedY = 0;
        ball.speedX = 0;
        ball.y = ballStartingY;
        ball.x = ballStartingX;
        return ball.y;
        return ball.x;
        return ball.speedY;
        return ball.speedX;
        return true;
    }
    else if (ballRightX > board.width){ //when the ball crosses the right side of the board, it will return to its starting position
        ball.speedY = 0;
        ball.speedX = 0;
        ball.y = ballStartingY;
        ball.x = ballStartingX;
        return ball.y;
        return ball.x;
        return ball.speedY;
        return ball.speedX;
        return false;
    }
  }

function doCollide(stick, pongpong) {
    //sides of square1
    stick.leftX = stick.x;
    stick.topY = stick.y;
    stick.rightX = stick.x + stick.width;
    stick.bottomY = stick.y + stick.height;
  
    //sides of square2
    pongpong.leftX = pongpong.x;
    pongpong.topY = pongpong.y
    pongpong.rightX = pongpong.x + pongpong.width;
    pongpong.bottomY = pongpong.y + pongpong.height;

  
    if ((stick.leftX < stick.rightX) && 
        (stick.rightX > stick.leftX) && 
        (stick.topY < stick.bottomY) && 
        (stick.bottomY > stick.topY)) {
      return true;
    }
    // TODO: Return true if they are overlapping, false otherwise
    else {
      return false;
    }
		
}

  function displayScore(obj1, obj2){ //displays the score...duh

    var endGameScore = 11; //the score to end the game at is 11

    if (stopBall() === false){
        // for(l = 0; l <= endGameScore; l++){
            $(obj1.id).append($("<p>").text("score:" + obj2Score++));
        
    }
    else if (stopBall() === true){
        // for(r = 0; r <= endGameScore; r++){
            $(obj2.id).append($("<p>").text(obj1Score++));
        
    }
  }
  function rollDice(number) {	//creates a random number to be used in pick sides
    var side = Math.ceil(Math.random() * number);
    return side;
  }	

  function pickSides(){ //causes the ball to move to a certain side

    ////// WHICH WAY WILL THE BALL GO HORIZONTALLY //////////

    var chanceX = rollDice(2); //rollDice(2) to pick a side because i'm lazy
    if ((chanceX % 2)=== 0){//if chance is even, the ball goes to the left
        ball.speedX = -5;
    }
    else if ((chanceX % 2) === 1){ //if chance is not even, the ball goes to the right
        ball.speedX = 5;
    };

    ////// WHICH WAY WILL THE BALL GO VERTICALLY //////////

    var chanceY = rollDice(2); //rollDice(2) to pick a side because i'm lazy
    
    if ((chanceY % 2) === 0){//if chance is even, the ball goes to the left
        ball.speedY = -5;
    }
    else if ((chanceY % 2) === 1){ //if chance is not even, the ball goes to the right
        ball.speedY = 5;
    };
  }


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();

}

}
