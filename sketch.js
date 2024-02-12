const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var egg,rope;
var egg_con;
var sadPuppyMImage
var eatPuppyMImage
var puppyMImage
var eggImage
var puppyM
var bgImage
var button

function preload() {
   puppyMImage=loadImage("images/PuppyM.png")
   sadPuppyMImage=loadImage("images/SadPuppyM.png")
   eggImage=loadImage("images/egg.png")
   bgImage=loadImage("images/background.png")
   eatPuppyMImage=loadImage("images/eatingPuppyM.png")
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);

  rope = new Rope(7,{x:245,y:30});
  egg = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,egg);

  egg_con = new Link(rope,egg);
puppyM=createSprite(10,610,100,100)
puppyM.addImage("puppy",puppyMImage)
puppyM.addImage("sadpuppy",sadPuppyMImage)
puppyM.addImage("eatingpuppy",eatPuppyMImage)
puppyM.scale=0.5
button=createImg("images/scissors.png")
button.position(220,30)
button.size(50,50)
button.mouseClicked(drop)
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER)
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bgImage,width/2,height/2,490,690)
  rope.show();
  if(egg!=null){
    image(eggImage,egg.position.x,egg.position.y,70,70);
  }
  
  Engine.update(engine);
  ground.show();
  if(collide(egg,puppyM)){
    puppyM.changeImage('eatingpuppy');
  
  }

  if(egg!=null && egg.position.y>=650)
  {
    puppyM.changeAnimation('sadpuppy');
    egg=null;
     
   }  
drawSprites()
 
   
}
function drop(){
  rope.break()
  egg_con.detach()
  egg_con=null
}

function collide(body,sprite){
  if(body!=null){
  var d = dist(body.position.x, body.position.y,sprite.position.x,sprite.position.y)
  if(d<80){
    World.remove(engine.world,egg)
    egg=null;
    return true;
  }
  else{
    return false;
  }
}
}