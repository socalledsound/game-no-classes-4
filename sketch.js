// constants to set the canvas size to the size of the window
const canvasWidth = window.innerWidth
const canvasHeight = window.innerHeight
// i changed these variable names
// and also changed them where we call the functions
// variables for mario
let marioX = canvasWidth/2
let marioY = canvasHeight/2
let marioWidth = canvasWidth/30
let marioHeight = canvasWidth/15
let marioSpeed = 20
// variables for the coin
let coinWidth = canvasWidth/30
let coinHeight = canvasWidth/15
let coinX = canvasWidth - canvasWidth/10
let coinY = canvasHeight/2
let showCoin = true
let score = 0
let coinsCollected = [false]

// now lets load in some assets
let marioImg, coinImg

// HEY! notice that to use sounds we have to add the p5.sound library to libs
// and then import it in our index.html

function preload(){
    marioImg = loadImage('./assets/mario.png')
    coinImg = loadImage('./assets/coin.png')
    coinSound = loadSound('./assets/coin.mp3')
}

function setup(){
    createCanvas(canvasWidth, canvasHeight)

}

function draw(){
    background(30)

    //let's also draw a scoreboard
    drawScoreboard(score)

    // now we have some functions (below) that draw our characters!
    // instead of a color let's pass in an image
    drawMario(marioImg, marioX, marioY, marioWidth, marioHeight)
    if(!coinsCollected[0]){
        drawCoin(coinImg, coinX, coinY, coinWidth, coinHeight)
    }
    
    // every time through the draw loop let's check if mario made it to the coin
    let atGoal = checkGoal(marioX, marioY, marioWidth, marioHeight, coinX, coinY, coinWidth, coinHeight)

    if(atGoal){
     // now we need to add an extra step to this 
    // because we will stay at the goal.
    // let's keep track of whether the coin has been collected previously
    // I'm going to use an array, I bet you can guess why?
    // we'll find out in the next version of this
        if(!coinsCollected[0]){

            coinsCollected[0]  =true
            score++
            coinSound.play()
        }


    }

}

function keyPressed(){
    console.log(key)
    if(key === 'd'){
        marioX+=marioSpeed
    }
    if(key === 'a'){
        marioX-=marioSpeed
    }
    if(key === 'w'){
        marioY-=marioSpeed
    }
    if(key === 's'){
        marioY+=marioSpeed
    }
    
}

// new draw functions now, they use an image instead
// we could probably write just one but I like the way it looks in the draw loop better this way personally
// and later if we want to change the way we draw this we can
function drawMario(img, x, y, w, h){
    image(img, x, y, w, h)
}

function drawCoin(img, x, y, w, h){
    image(img, x, y, w, h)
}

// notice how again I used different parameter names rather than the specific ones in the main program
// that way we can use this function again in another project if we want to
function checkGoal(x1,y1,w1, h1, x2, y2, w2, h2){
    if(x1 + w1 > x2 &&
        x1 < x2 + w2 && 
        y1 < y2 + h2 &&
        y1 + h1 > y2  ){
            return true
        } else {
            return false
        }
}


function drawScoreboard(score){
    fill(255)
    textSize(30)
    text('score : ', 40, 40)
    text(score, 140, 42)
}



// function makeCharacter(x,y,size,color){
//     return{
//         x:x,
//         y:y,
//         size:size,
//         color: color
//     }
// }