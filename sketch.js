//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock = 30;
var dogImg;
var feed;
var addFood;
var fedTime;
var lastFed;
var FoodObj;

function preload()
{
  //load images here
  dogImg = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();
	createCanvas(1000, 500);
  dog = createSprite(650,300,10,10);
  dog.addImage(dogImg);
  dog.scale=0.5;

  foodS=database.ref('Food');
  foodS.on("value",readStock);

  FoodObj = new Foods;


  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87);

  FoodObj.display();
  drawSprites();
 /* //add styles here
  textSize(30);
  fill("black");
  stroke("black");
  text("Food remaining : "+foodS,170,160);
  textSize(13);
 */

 fedTime=database.ref('FeedTime');
 fedTime.on("value",function(data){
   lastFed=data.val();
 });

 fill(255,255,254);
 textSize(15);
 if(lastFed>=12){
   text("Last Fed : "+ lastFed%12 + " PM", 350, 30);
 }else if(lastFed<=0){
   text("Last Fed : 12 AM", 350,30);
 }else{
   text("Last Fed : "+ lastFed + " AM", 350, 30);
 }

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){


  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }


  database.ref('/').update({
    food:x
  })

}



function feedDog(){
  dog.addImage(happyDog);

  FoodObj.updateFoodStock(FoodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:FoodObj.getFoodStock(),
    FeedTime:hour()
  })
}


function addFoods(){
  foodS++;
  database.ref('/').update({
    foodS:foodS
  })
}