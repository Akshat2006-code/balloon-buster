var sword,fruit,monster, monsterGroup, knifeswooshSound, gameoversound;


var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;


function preload(){
  swordImage=loadImage("sword.png");
  gameoverImage=loadImage("gameover.png")
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  monsterImg=loadImage("alien1.png");
  knifeSwooshSound=loadSound("knifeSwooshSound.mp3");
  gameoversound=loadSound("gameover.mp3");
  
  }

function setup() {
  createCanvas(600,600);
  sword=createSprite(300,500,20,20)
  sword.addImage(swordImage);
  sword.scale=0.7
  
  fruitGroup= new Group();
  monsterGroup= new Group();
   
}

function draw(){
  background("White");
  
  textSize(24);  
  fill("Red");
  text("score" +score,200,30);
  
  
  if (gameState == PLAY){
    sword.y=World.mouseY;
    sword.x=World.mouseX;
     fruit();
     enemy();
    
    
    
    if (fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+2;
      
      knifeSwooshSound.play();
    }
    if (sword.isTouching(monsterGroup)){
  gameState=END;
  }
    if (monsterGroup.isTouching(sword)){
      gameState=END;
      gameoversound.play()
    }
         
  }
  if (gameState == END){
    monsterGroup.velocityX=0
    fruitGroup.velocityX=0
    sword.addImage(gameoverImage)
  }       
        
  drawSprites();
 
  }

function fruit() {
  if(World.frameCount%80==0){
    
    
    var fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    position=Math.round(random(1,2));
    if(position==1)
    {
    fruit.x=400;
    fruit.velocityX=-(7+(score/4));
    }
    else
    {
      if (position==2){
        fruit.x=0;
        
        fruit.velocityX= (7+(score/4));
      }
    }
    //fruit.debug=true;
    r=Math.round(random(1,4));
    if (r == 1)       {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    
    fruit.y=Math.round(random(50,340));    
    
    //fruit.velocityX=-7;
    fruit.setLifetime=100;
    
    
    fruitGroup.add(fruit);  
    }
}





function enemy() {
  if(World.frameCount%200===0) {
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImg);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    monsterGroup.add(monster);
  }
  
}


