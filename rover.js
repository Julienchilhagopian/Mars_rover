 /*jshint esversion: 6 */


// The 10x10 grid

var grid = [10];

for (i=0; i < 10; i++) {
  grid[i] = [10];
  for (j=0; j < 10; j++) {
    grid[i][j] = `[${i}, ${j}]`;
  }

}




//Our 2 lovely Rovers
var myRover1 = {
  position: [1, 1],
  direction: 'S',
  name: '\ud83d\udd34 Rover1'
};


var myRover2 = {
  position: [1, 2],
  direction: 'S',
  name: '\ud83d\udd35 Rover2'
};


// this will be used in case our rovers bump into each others
const initialPosition1 = [1, 1];
const initialPosition2 = [2, 2];



// Planets are spheres after all

function roverToSphere(rover){
  if (rover.position[0] < 0) {
    rover.position[0] = 9;
  } else if (rover.position[0] > 9){
    rover.position[0] = 0;
  } else if (rover.position[1] < 0){
    rover.position[1] = 9;
  } else if (rover.position[1] > 9){
    rover.position[1] = 0;
  }
}


// 1st movement Foward

function goForward(rover) {
  switch(rover.direction) {
    case 'N':
      rover.position[0]--;
      break;
    case 'E':
      rover.position[1]--;
      break;
    case 'S':
      rover.position[0]++;
      break;
    case 'W':
      rover.position[1]++;
      break;
  }
roverToSphere(rover);
}



// 2nd movement Backward

function goBackward(rover) {
switch (rover.direction) {
  case 'N':
  rover.position[0]++;
  break;
case 'E':
  rover.position[1]++;
  break;
case 'S':
  rover.position[0]--;
  break;
case 'W':
  rover.position[1]--;
  break;
}
roverToSphere(rover);
}



// 3rd movement Right

function goRight(rover) {
switch (rover.direction) {
  case 'N':
  rover.direction = 'E';
  break;
case 'E':
  rover.direction = 'S';
  break;
case 'S':
  rover.direction = 'W';
  break;
case 'W':
  rover.direction = 'N';
  break;
}



}


// 4th movement Left

function goLeft(rover) {
switch (rover.direction) {
  case 'N':
  rover.direction = 'W';
  break;
case 'E':
  rover.direction = 'N';
  break;
case 'S':
  rover.direction = 'E';
  break;
case 'W':
  rover.direction = 'S';
  break;
}


}

// User's inputs (Rover 1 & Rover 2)

var userInput1 = prompt("Directions for the FIRST rover");
var userInput2 = prompt("Directions for the SECOND rover");



//A bit of CSS so that it looks better on the console
var style = `font-family: Helvetica, Times ; font-size: 15px`;


// The rovers commands acccording to the inputs
function commands(string, rover){

  switch(string){
  case 'f':
    goForward(rover);
    console.log(`%c${rover.name} New position : [${rover.position[0]}, ${rover.position[1]}]`, style);
    break;
  case 'b':
    goBackward(rover);
    console.log(`%c${rover.name} New position : [${rover.position[0]}, ${rover.position[1]}]`, style);
    break;
  case 'r':
    goRight(rover);
    console.log(`%c${rover.name} Turned Right \u21bb : [${rover.position[0]}, ${rover.position[1]}]`, style);
    break;
  case 'l':
    goLeft(rover);
    console.log(`%c${rover.name} Turned Left \u21ba : [${rover.position[0]}, ${rover.position[1]}]`, style);
    break;
  default:
    console.log('%c! Wrong command type !', 'font-family: Helvetica, Times ; font-size: 30px ; color: #F02A00 ');
    break;

  }
}

// Definition of the obstacles

var obstacle1 = {
  position: [6, 2],
  name: "OBSTACLE"
};

var obstacle2 = {
  position: [4, 1],
  name: "OBSTACLE"
};


// The rover returns to the last possible position
function lastPosition(rover){
  rover.position[0] = previousPositionX;
  rover.position[1] = previousPositionY;

  console.log(`%c${rover.name} returned at his last position : [${rover.position[0]}, ${rover.position[1]}]`, 'font-family: Helvetica, Times ; font-size: 15px ; font-weight: bold');

}


// The obstacles detections
function detection(rover, obstacle){
  if (rover.position[0] === obstacle.position[0]){
    if (rover.position[1] === obstacle.position[1]) {
    console.log('%cOBSTACLE REACHED WE CAN NOT GO FURTHER !', 'font-family: Helvetica, Times ; font-size: 20px ; color:#f5564d ; font-weight: bold');
    lastPosition(rover);
  } else {
    console.log("%cChill all clear", style);
  }
}
}



// The rover collision detection

// Here I found online the JSON.stringify method in order to compare two object properties
function explosion(rover1, rover2) {
  if (JSON.stringify(myRover1.position) === JSON.stringify(myRover2.position)){
    console.log('%c!!! Collision between our lovely rovers !!!', 'font-family: Helvetica, Times ; font-size: 20px ; color:#9a0202 ; font-weight: bold');
    rover1.position = initialPosition1; // Bringing back rovers to their initial position
    rover2.position = initialPosition2;
    console.log(`%cDue to the damages rovers returned to their initial position : Rover1 [${rover1.position}] Rover2 [${rover2.position}]`, style);
  } else {
    console.log("its ok");
  }
}


// Treatment of the User's input for both rovers

for (var i = 0; i < userInput1.length; i++){

var commandString1 = userInput1[i];

var previousPositionX = myRover1.position[0]; // This is used for the lastPosition function
var previousPositionY = myRover1.position[1];

commands(commandString1, myRover1);

// obstacle detection
detection(myRover1, obstacle1);
detection(myRover1, obstacle2);

// Avoiding any collisions between rovers
explosion(myRover1, myRover2);

}


for (var j = 0; j < userInput2.length; j++){

var commandString2 = userInput2[j];

var previousPositionX = myRover2.position[0];
var previousPositionY = myRover2.position[1];


commands(commandString2, myRover2);

// obstacle detection
detection(myRover2, obstacle1);
detection(myRover2, obstacle2);

// Avoiding any collisions between rovers
explosion(myRover1, myRover2);
}


// Finally the grid impression with the Rovers and the Obstacles included
function print(object){
  grid[object.position[0]][object.position[1]]= `${object.name}`;
}

print(myRover1);
print(myRover2);
print(obstacle1);
print(obstacle2);

console.log(grid);
