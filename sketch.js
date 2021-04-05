const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var penState="pen1";
var edges
var pushStr = 0
var edges;
var gameState="outSchoolLoad";
var player;
var school;
var canFire = true;
var speed = 0;

function preload() {
  boy_f = loadAnimation("images/boy2-f1.png","images/boy2-f2.png","images/boy2-f1.png","images/boy2-f3.png");
  boy_b = loadAnimation("images/boy2-b1.png","images/boy2-b2.png","images/boy2-b1.png","images/boy2-b3.png");
  boy_r = loadAnimation("images/boy2-r1.png","images/boy2-r2.png","images/boy2-r1.png","images/boy2-r3.png");
  boy_l = loadAnimation("images/boy2-l1.png","images/boy2-l2.png","images/boy2-l1.png","images/boy2-l3.png");

  boyF = loadAnimation("images/boy2-f1.png");
  boyB = loadAnimation("images/boy2-b1.png");
  boyR = loadAnimation("images/boy2-r1.png");
  boyL = loadAnimation("images/boy2-l1.png");

  school_img = loadImage("images/school.png");

  schoolB_img = loadImage("images/schoolBoard.gif");

  inSchool_img = loadImage("images/43bg.png");

  exit_img = loadImage("images/exit.png");

  teacher_img = loadImage("images/teacher.png");

  table_img = loadImage("images/table.png");

  pen1_img = loadImage("images/pen1.png");
  pen2_img = loadImage("images/pen2.png");

  donkey_img = loadImage("images/donkey.png");
  
}

function setup() {
  createCanvas(400,400);
  // edges = createEdgeSprites();

  engine = Engine.create();
  world = engine.world;

  groundG = new Group();
  exitG = new Group();

}

function draw() {

  console.log(gameState);

  Engine.update(engine);
  
  //console.log(gameState);

  if(gameState==="outSchoolLoad"){

    var nothing = 70;
    createCanvas(16*nothing , 9*nothing);

    school = createSprite(55,125,20,20);
    school.addImage(school_img);
    school.scale = 0.6;

    schoolGate = createSprite(school.x-130,school.y+100,50,80);

    schoolBoard = createSprite(school.x-250,school.y+100,20,20);
    schoolBoard.addImage(schoolB_img);
    schoolBoard.scale = 0.25;

    ground1 = new Path(school.x-130,school.y+300,200,280);
    ground2 = new Path(school.x+230,school.y+330,800,140);

    groundG.add(ground1.body);
    groundG.add(ground2.body);

    createPlayer();

    gameState="outSchool";
  }

  if(gameState==="outSchool"){
    background("#5D91F7");
    // MOVE PLAYER
    controlPlayer();
    // player.setCollider("rectangle",0,10,30,20)
  }

  if(playerFeet.isTouching(schoolGate)){
    gameState="inSchoolLoad";
  }

  if(gameState==="inSchoolLoad"){

    console.log("inSchoolLoad");

    school.destroy();
    schoolGate.destroy();
    schoolBoard.destroy();
    player.destroy();
    playerFeet.destroy();
    ground1.body.destroy();
    ground2.body.destroy();

    ground3 = new Path(width/2-360,height/2,width-300,height);
    ground3.body.visible = false;

    groundG.add(ground3.body);

    exit1 =  new Exit(100,485);
    // exit1.body.debug = true;
    exit1.body.setCollider("rectangle",0,5,30,10)
    exitG.add(exit1.body);

    teacher = createSprite(200,200,20,20);
    teacher.addImage(teacher_img);
    teacher.scale = 1.3;

    platform = createSprite(teacher.x,teacher.y+70,170,140);
    platform.visible=false;

    table = createSprite(teacher.x,teacher.y+60,20,20);
    table.addImage(table_img);
    table.scale=0.2;
    // table.debug = true;
    table.setCollider("rectangle",0,-100,500,200);

    createPlayer();

    player.position.x = 100;
    player.position.y = 425;

    gameState="inSchool";

  }

  if(gameState==="inSchool"){
    background(inSchool_img);

    // MOVE PLAYER
    controlPlayer();

    player.collide(table);
    player.collide(teacher);

    if(playerFeet.isTouching(exitG)){
      teacher.destroy();
      table.destroy();
      gameState="outSchoolLoad";
    }

    if(player.isTouching(platform)){
      gameState="penFightLoad";
    }

  }

    if(gameState==="penFightLoad"){

      penState="pen1";

      console.log("penFightLoad");

      teacher.destroy();
      exit1.body.destroy();
      player.destroy();
      // table.destroy();

      background(200);

      table.scale = 1.3;
      table.position.y = 250;

      createPlayer();

      player.position.x = table.x + 450;
      player.position.y = table.y - 50;
      player.changeAnimation("leftP",boyL);
      player.scale = 0.6;

      donkey = createSprite(-230,200,20,100);
      donkey.addImage(donkey_img);
      donkey.scale = 0.3

      pen1 = createSprite(450,200,20,100);
      pen1Box = createSprite(450,200,1,1);
      pen1.addImage(pen2_img)
      pen1.scale = 0.05;
      pen1.shapeColor = "red";
      pen1.rotation = 180;

      pen2 = createSprite(-50,200,20,100);
      pen2Box = createSprite(-50,200,1,1);
      pen2.addImage(pen1_img);
      pen2.scale = 0.15;
      pen2.shapeColor = "red";
      pen2.rotation = 180;
      
      gameState="penFight";
    
    }
//Math.round(random(startnumber,endnumber))\
//opspeed =Math.random(0.1,0.9);

    if(gameState==="penFight"){

      console.log(pen1.getSpeed());

      background(200);

      pen1Box.x = pen1.x;
      pen1Box.y = pen1.y;
      pen1Box.rotation = pen1.rotation;

      pen2Box.x = pen2.x;
      pen2Box.y = pen2.y;
      pen2Box.rotation = pen2.rotation;

      pen1.bounce(pen2);
      pen2.bounce(pen1);

      if(keyWentDown("UP_ARROW") && penState==="pen1" ){
        speed =  7;
        // reduceSpeed=-10
        pen1.addSpeed(speed,pen1.rotation);

        penState="pen2";
      }
  
      if(keyWentDown("LEFT_ARROW") && penState==="pen1"){
        console.log("left");
        pen1.rotation = pen1.rotation-10;
      }
      
      if(keyWentDown(39) && penState==="pen1"){
        console.log("right");
       pen1.rotation = pen1.rotation+10;
      }
//----------------------------stopping the pen ---------------------//
      pen1.setSpeedAndDirection(pen1.getSpeed()*0.96);
      pen2.setSpeedAndDirection(pen2.getSpeed()*0.96);

      if(pen1.getSpeed()<=0.01 && penState==="pen2"){
        
        var randomAngle = Math.round(random(-45,45));
        var randomSpeed = Math.round(random(7,9));

        pen2.rotation = randomAngle;
        
        speed = randomSpeed;
        pen2.addSpeed(speed,randomAngle);
        
        penState="pen1";
        
      }

      // if(penState==="pen2"){
      //   var randomSpeed = Math.random(6,8);
      //   speed = speed + randomSpeed;
      //   // reduceSpeed=-10;
      //   var randomAngle = Math.random(0,360)
      //   pen2.addSpeed(speed,randomAngle);
        
      //   penState="pen1";
      // }

     }

     
     

  // camera.position.x =displayWidth ;

  drawSprites();
}

function controlPlayer(){

  var nothing = 5;

  player.velocityX=0;
  player.velocityY=0;

  playerFeet.x = player.x;
  playerFeet.y = player.y+20;

  if(player.velocityX === 0){
    player.changeAnimation("frontP",boyF);
  }

  if(player.velocityY === 0){
    player.changeAnimation("frontP",boyF);
  }

  // LEFT ARROW
  if(keyDown(37) && player.isTouching(groundG)){
    player.velocityX = -nothing;
    player.changeAnimation("left",boy_l);
  }

  // RIGHT ARROW
  if(keyDown(39)  && player.isTouching(groundG)){
    player.velocityX = nothing;
    player.changeAnimation("right",boy_r);
  }

  // UP ARROW
  if(keyDown(38)  && player.isTouching(groundG)){
    player.velocityY = -nothing;
    player.changeAnimation("back",boy_b);
  }

  // DOWN ARROW
  if(keyDown(40)  && player.isTouching(groundG)){
    player.velocityY = nothing;
    player.changeAnimation("front",boy_f);
  }

  if(keyDown(40)  && keyDown(39)){
    player.velocityY = 0;
    player.velocityX = 0;
    player.changeAnimation("frontP",boyF);    
  }

  if(keyDown(40)  && keyDown(37)){
    player.velocityY = 0;
    player.velocityX = 0;
    player.changeAnimation("frontP",boyF);
  }

  if(keyDown(38)  && keyDown(39)){
    player.velocityY = 0;
    player.velocityX = 0;
    player.changeAnimation("frontP",boyF);
  }

  if(keyDown(38)  && keyDown(37)){
    player.velocityY = 0;
    player.velocityX = 0;
    player.changeAnimation("frontP",boyF);
  }
}

function createPlayer(){

  player = createSprite(school.x-130,school.y+180,200,200);
  playerFeet = createSprite(player.x,player.y+20,20,20);
  playerFeet.shapeColor = "yellow";
  playerFeet.visible = false;
  // player.debug = true;
  
  player.addAnimation("frontP",boyF);
  player.addAnimation("backP",boyB);
  player.addAnimation("rightP",boyR);
  player.addAnimation("leftP",boyL);
  player.addAnimation("front",boy_f);
  player.addAnimation("back",boy_b);
  player.addAnimation("right",boy_r);
  player.addAnimation("left",boy_l);
  player.scale = 0.1;
  player.frameDelay = 4;

}