class Game{
constructor(){

}
getState(){
var gameStateRef = database.ref('gameState');
gameStateRef.on("value", function (data){
gameState = data.val();
}
);
}

update(state){
database.ref('/').update({
gameState: state
}
);
}
async start(){
if(gameState === 0){
player = new Player();
var playerCountRef = await database.ref('playerCount').once("value");
if(playerCountRef.exists()){
playerCount = playerCountRef.val();
player.getCount();
}
form = new Form();
form.display();
}
player1 = createSprite(200,500);
player1.addAnimation("player1",player_img);
player1.scale=0.2;
player2 = createSprite(800,500);
player2.addAnimation("player2", player_img);
player2.scale=0.2;
players=[player1,player2];

var gameOver = createSprite(500,300,20,10);
gameOver.addImage("gameOver",gameOver_img);
gameOver.visible = false;


}
    
play(){
        
form.hide();
Player.getPlayerInfo();
image(back_img, 0, 0, 1000, 800);
var x =100;
var y=200;
var index =0;
drawSprites();
for(var plr in allPlayers){
index = index+1;
x = 500-allPlayers[plr].distance;
y=500;

players.x = mouseX;

players[index -1].x = x;
players[index - 1].y = y;
                       
if(index === player.index){ 
fill("black");
textSize(25);
text(allPlayers[plr].name ,x-25,y+25);

}
                    
textSize(25);
fill("white");
text("Player 1 :" + allPlayers.player1.score,50,50);
text("Player 2 :" + allPlayers.player2.score,50,100);
                 
}

if(keyIsDown(RIGHT_ARROW) && player.index !== null) {
player.distance -= 10
player.update();
}
if(keyIsDown(LEFT_ARROW) && player.index !== null) {
player.distance += 10
player.update();
}

if(frameCount % 120 === 0){
enemy = createSprite(random(100,1000),0,100,100);
enemy.addImage("enemy",enemy_img);
enemy.velocityY = 10;
enemy.scale = 0.2;
enemyGroup.add(enemy);
}

if(frameCount % 20 === 0) {
fruits = createSprite(random(100, 1000), 0, 100, 100);
fruits.velocityY = 6;

fruits.scale=0.2;

var rand = Math.round(random(1,5));
switch(rand){
case 1: fruits.addImage("fruit1", fruit1_img);
break;
case 2: fruits.addImage("fruit1", fruit2_img);
break;
case 3: fruits.addImage("fruit1", fruit3_img);
break;
case 4: fruits.addImage("fruit1", fruit4_img);
break;
case 5: fruits.addImage("fruit1", fruit5_img);
break;
}
fruitGroup.add(fruits);
           
}
                 
if(player.index !== null){
for(var i = 0; i < fruitGroup.length; i++){
if(fruitGroup.get(i).isTouching(players)) {
fruitGroup.get(i).destroy();
player.score = player.score+1;
player.update(); 
candySound.play();            
}
}
}

if(enemyGroup.isTouching(players)){
gameState = 2;
endGameSound.play();
}
}

end(){
console.log("Game Ended");
background(0)
textSize(130);

fill("red")
text("GAME OVER", 100,300);

if(allPlayers.player1.score > allPlayers.player2.score){
    textSize(50);
    text(allPlayers.player1.name + ":Won",300,400);
}
else{
    textSize(50);
    text(allPlayers.player2.name + ":Won",300,400);
}

}
}