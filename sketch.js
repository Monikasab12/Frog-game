var oceanImg, ocean;
var coinImg, coin, coinGroup;
var climberImg, climber, climbersGroup;
var frog, frogImg;
var gameState = "play"

var score = 0;

function preload(){
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
  
}

function setup(){
  createCanvas(580,450);
  
  
 ocean = createSprite(300,300);
 ocean.addImage("ocean",oceanImg);
ocean.velocityY = 1;

  frog = createSprite(200,200,50,50);
  frog.scale = 0.1;
  frog.addImage("frog", frogImg);  
  
  //create coin group and climber group
  climbersGroup = new Group();
  coinGroup = new Group();
}

function draw(){
  background(0);
 
  drawSprites();

  fill("yellow")
  textSize(15);
  text("Score: "+ score, 500,30);
  
  if (gameState === "play") {

    if(keyDown("left_arrow")){
      frog.x = frog.x - 3;
    }
    
    if(keyDown("right_arrow")){
      frog.x = frog.x + 3;
    }
    
    if(keyDown("space")){
      frog.velocityY = -5;
    }
    
    frog.velocityY = frog.velocityY + 0.8
  
   if(ocean.y > 300){
      ocean.y = 300
    }
    spawnCoin();

    if(frog.isTouching(coinGroup)){
     coinGroup.destroyEach();
     
     score = score + 1;
  }
    if(frog .y > 450){
      gameState = "end";
    }
  }
  
   if (gameState === "end"){
    fill("yellow")
    textSize(30);
    text("GameOver", 200,200);
    ocean.velocityY = 0;
    coinGroup.destroyEach();
    climbersGroup.destroyEach();
  }

}

// create the coin and climber in the same function
function spawnCoin() {
  
  if (frameCount % 280 === 0) {
    console.log(frameCount);
    //make the x position of the coin and climber the same
    var coin = createSprite(80, -50);
    var climber = createSprite(80,10);
    coin.scale = 0.1;
    climber.scale = 0.3;
    
    coin.x = Math.round(random(80,200));
    climber.x = coin.x;
  
    
    coin.addImage(coinImg);
    climber.addImage(climberImg);
    
    coin.velocityY = 1;
    climber.velocityY = 1;
    
    
   frog.depth = coin.depth;
   frog.depth +=1;
   
    //assign lifetime to the variable
    coin.lifetime = 600;
    climber.lifetime = 600;
  

    
    //add each door to the group
    coinGroup.add(coin);
  
  climbersGroup.add(climber);
  }
}