var balloon, ballonimg;
var database;
var bg;
var position;
var balloonPosition;

function preload(){

bg = loadImage("Images/Bg.png");
ballonimg = loadAnimation("Images/Hot Air Ballon-02.png", "Images/Hot Air Ballon-03.png", "Images/Hot Air Ballon-04.png");

}
function setup() {
  createCanvas(displayWidth, windowHeight);

  database = firebase.database();
  
  balloon = createSprite(200, 200);
  balloon.addAnimation("ballon", ballonimg);
  balloon.scale = 0.3;

  balloonPosition = database.ref('Hot Air Balloon/position');
  balloonPosition.on("value", readPosition, showError)
}

function draw() {
  background(bg);  
  drawSprites();
  text("Use Arrow Keys to control Hot Air Balloon", 100, 100);

  if(keyDown(LEFT_ARROW) || touches.length < windowWidth/2){
    writePosition(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(10,0);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-10);
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+10);
  }
}

function readPosition(data){

  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;

}

function writePosition(x, y){

  database.ref('Hot Air Balloon/position').set({
    'x': position.x + x,
    'y': position.y + y
})
}

function showError(){

  console.log("Error in the program is due to the writting mistake");

}

