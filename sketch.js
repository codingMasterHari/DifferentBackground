const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
const bgSound = new Audio("applebgsoung.wav");
var score = 0;
 
var particles = [];
var plinkos = [];
var divisions = [];
var divisionHeight = 300;
var particle;
var score = 0;
var amountOfTimePlayed = 15;
var gameState = "play";
function preload() {
  rabbit = loadImage("rabbit.png");
  bg = loadImage("treeBG.png");
  squirrel = loadImage("spuirrel.png");
  snake = loadImage("snake.png");
  bird = loadImage("bird.png");
  butterfly = loadImage("butterfly.png");
}

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2, height, width, 20);

  //create division objects
  for (var k = 0; k <= 800; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  //create 1st row of plinko objects
  for (var j = 75; j <= width; j+=50) { 
    plinkos.push(new Plinko(j,75));
  }

  //create 2nd row of plinko objects
  for (var j = 50; j <= width-10; j=j+50) {
    plinkos.push(new Plinko(j, 175));
  }

  //create 3rd row of plinko objects
  for (var j = 25; j <= width-20; j=j+50) {
    plinkos.push(new Plinko(j, 275));
  }
  
  //create 4th row of plinko objects
  for (var j = 0; j <= width-25; j=j+50) {
    plinkos.push(new Plinko(j+20, 375));
  }
}

function mousePressed() {
  if (gameState == "play") {
    amountOfTimePlayed-=1;
    particle = new Particle(mouseX, 0, 10, 10);
  }
}

function draw() {
  background(bg);
  image(rabbit, 400, 500, 60, 40);
  image(squirrel, 200, 200, 60, 50);
  image(snake, 550, 200, 100, 50);
  image(bird, 400, 100, 30, 30);
  image(butterfly, 350, 300, 40, 40);
  image(butterfly, 400, 400, 40, 40);
  image(butterfly, 100, 100, 40, 40);
  image(butterfly, 300, 200, 40, 40);
  bgSound.play();
  bgSound.loop = true;
  randomNumber = Math.round(random(0, 1200));
  console.log(randomNumber);
 
  Engine.update(engine);
  ground.display();
  
  //display the plinkos 
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();   
  }
   
  //display the divisions
  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  if (particle != null) {
    particle.display();
    if (particle.body.position.y > 760) {
      if (particle.body.position.x < 300) {
        score = score + 500;
      }
      if (particle.body.position.x > 300 && particle.body.position.x < 600) {
        score = score + 300;
      }
      if (particle.body.position.x > 600 && particle.body.position.x < 800) {
        score = score + 200;
      }
      particle = null;
      if (amountOfTimePlayed <= 0) {
        gameState = "end";
      }
    }

  }
  if (gameState == "end") {
    textSize(35);
    text("Good Job! Your Score is: " + score, 200, 250);
  }

  textSize(20);
  fill("red")
  text("500", 20, 530);
  text("500", 100, 530);
  text("500", 180, 530);
  text("500", 260, 530);
  text("300", 340, 530);
  text("300", 420, 530);
  text("300", 500, 530);
  text("200", 580, 530);
  text("200", 660, 530);
  text("200", 740, 530);
  fill("lightblue");
  textSize(28)
  text("Score:" + score, 600, 50);
  text("Number Of Times Left:" + amountOfTimePlayed, 100, 50);
}