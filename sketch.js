//Declaring of variables, Game State, Restart and Game Over
var monkey, monkeyAni, monkeyAni_collided;
var banana, bananaImage, bananaGroup;
var Ground;
var obstacle, obstacleImage, obstacleGroup;
var score = 0;
var SurvivalTime = 0;
var PLAY;
var END;
var gameState = PLAY;
var GM, GMImage;

function preload()
{
  //Loading Monkey Animation
  monkeyAni =   loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkeyAni_collided = loadAnimation("sprite_6.png");
  
  //Loading Banana Image, obstacle Image, Restart Button and Game Over Image.
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  GMImage = loadImage("GM.png");
}

function setup()
{
  createCanvas(500,500);
  
  //Creating Monkey and adding its Animation
  monkey = createSprite(80,365,20,20);
  monkey.addAnimation("moving",monkeyAni);
  monkey.addAnimation("collided",monkeyAni_collided);
  monkey.scale = 0.1;
  
  //Creating Game Over Sprite 
  GM = createSprite(250,150);
  GM.addImage(GMImage);
  GM.scale = 0.455;

  //Creating Ground
  Ground = createSprite(250,400,1000,10);
  Ground.shapeColor = "brown";
  
  //Creating The Groups
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  obstacleGroup.setColliderEach("rectangle",0,0,obstacleGroup.wdth,obstacleGroup.height);
  obstacleGroup.debugEach = true;
}

function draw()
{
  background("White");
  
  Ground.velocityX = -4;
  
  //Infinite Ground  
  if(Ground.x < 0)
  { 
    Ground.x = Ground.width/2;
  }
  
  GM.visible = false;
        
  //Calling the functions in Game State PLAY
  BananasFunction();
  ObstaclesFunction();
        
  //Jump of Monkey. 
  if(keyDown("space") && monkey.y >=250)
    {
      monkey.velocityY = -6;
    }
        
  //Adding Gravity to the Ground.
  monkey.velocityY = monkey.velocityY + 0.5;
        
  //If the monkey touches any banana. The banana will destroy and the score will increase by 1
  if(monkey.isTouching(bananaGroup))
    {
      bananaGroup.destroyEach();
      score = score + 1;
    }
        
  if(monkey.isTouching(obstacleGroup))
    {
      GM.visible = true;
      SurvivalTime = 0
        
      Ground.velocityX = 0;
      monkey.velocityY = 0;
      
      //set lifetime of the game objects so that they are never destroyed
      obstacleGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
      
      //banana and obstacles will stop moving
      obstacleGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);
    }
  
  monkey.collide(Ground);
  
  drawSprites();
  
  fill("black");
  textSize(20);
  text("Bananas Collected: "+ score, 25, 65);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 25,35);
}

function BananasFunction()
  {
    if (frameCount % 80 === 0)
      {
        //Creating the banana
        banana = createSprite (600,Math.round(random(275,200)),10,10);
        banana.addImage(bananaImage);
        banana.scale = 0.1;
        
        //moving the banana, providing banana the lifetime and adding banana in its group.
        banana.velocityX = -5;
        banana.lifetime = 250;
        bananaGroup.add(banana);
      }
  }

function ObstaclesFunction()
  {
    if (frameCount % 175 === 0)
      {
        //Creating the obstacles
        obstacle = createSprite(600,360,10,10)
        obstacle.addImage(obstacleImage);
        obstacle.scale = 0.2;
        
        //moving the obstacle, providing obstacle the lifetime and adding obstacle in its group.
        obstacle.velocityX = -4.5;
        obstacle.lifetime = 250;
        obstacleGroup.add(obstacle);
      }
  }