var monkey,monkeya1,bananasa1,jungle,junglea1,stonea1,ground,gameState,PLAY,END,ObstaclesGroup,BananasGroup,score,jump,die;

function preload() {
  monkeya1 = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  junglea1 = loadImage("jungle.jpg");
  stonea1 = loadImage("stone.png");
  bananasa1 = loadImage("banana.png");
  jump = loadSound("jump(1).mp3");
  
  die = loadSound("dead.mp3");
}

function setup() {
  createCanvas(600,300);
  
  jungle=createSprite(0,0,200,200);
  jungle.scale = 1.4;
  jungle.addImage(junglea1);
  jungle.velocityX = -4;
  
  monkey=createSprite(40,280,50,50);
  monkey.addAnimation("monkey",monkeya1);
  monkey.scale = 0.12;
  
  ground=createSprite(100,280,600,20);
  ground.velocityX = -4;
  ground.visible = false;
  
  
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  
  score = 0;
  
  ObstaclesGroup = createGroup();
  BananasGroup = createGroup();
}

function draw() {
  if(gameState===PLAY){
    
    if(jungle.x<0){
  jungle.x = jungle.width/2;
}
    if(ground.x<0){
  ground.x = ground.width/2;
}
  spawnBananas();
  spawnObstacles();
    
    if(keyDown("space")&&monkey.y>=230){
      jump.play();
     monkey.velocityY = -14; 
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);
    
    if(monkey.isTouching(BananasGroup)){
      BananasGroup.destroyEach();
       score = score + 1;
       }
    
    if(monkey.isTouching(ObstaclesGroup)){
      die.play();
      gameState = END
    }
    
    if(gameState===END){
  monkey.velocityY=0;
  ground.velocityX=0;
  monkey.visible = false;
  jungle.velocityX =0;
  ObstaclesGroup.setVelocityXEach(0);
  BananasGroup.setVelocityXEach(0);
  
  
  ObstaclesGroup.setLifetimeEach(-1);
  BananasGroup.setLifetimeEach(-1); 
    }
    
    
  }
  
  drawSprites(); 
  textSize(20);
  fill("yellow");
  text("Score : "+score,200,80);
}



function spawnObstacles(){
  if(frameCount%95===0){
    var stone = createSprite(600,250,20,20);
    stone.addAnimation("stone",stonea1);
    stone.scale = 0.118;
    stone.velocityX = -6;
    stone.lifetime = 134;
    ObstaclesGroup.add(stone);
  }
}

function spawnBananas(){
  if(frameCount%87===0){
    var bananas = createSprite(600,200,20,20);
    bananas.y = random(80,150);
    bananas.addAnimation("bananas",bananasa1);
    bananas.scale =0.06;
    bananas.velocityX =-6;
    BananasGroup.add(bananas);
    
  }
}

