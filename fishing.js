var robot = require("robotjs");


let interval = 200
let pixelMargin = 50
let r = 200
let g = 190
let b = 170


function start(){
    let start
    let current
    let check = false
    while(true){
        sleep(100)
   
        current = new Date().getTime()
        var mouse = robot.getMousePos();
        // Get pixel color in hex format.
        var hex = robot.getPixelColor(mouse.x, mouse.y);
        hex = hexToRgb(hex)

        console.log(JSON.stringify(hex))
        if(!(hex.r > r - pixelMargin && hex.r < r + pixelMargin)) {
            console.log('1 NOT CHECKING')
            check = false
            continue
        }

        if(!(hex.g > g - pixelMargin && hex.g < g + pixelMargin)) {
            console.log('2 NOT CHECKING')
            check = false
            continue
        }

        if(!(hex.b > b - pixelMargin && hex.b < b + pixelMargin)) {
            console.log('3 NOT CHECKING')
            check = false
            continue
        }


        if(!check) {
            console.log('CHECKING')
            check = true
            start = new Date().getTime()
        } else {
            console.log('CHECKING')
            if(start + interval < current){
                robot.mouseClick("right")
                sleep(1000)
                robot.mouseClick("right")
                sleep(3000)
                start = new Date().getTime()
                check = false
            }
        }
        
    }
}

function getRndInteger (min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function pickAndPlant(){
    robot.mouseClick()
	robot.mouseClick("right")
    sleep(sleepClick)
    robot.mouseClick("right")
    sleep(sleepClick)
    robot.mouseClick("right")
robot.mouseClick("right")
}

function move(letter){
	sleep(sleepClick)
    robot.mouseClick("right")
    robot.keyToggle(letter, 'down')
    sleep(moveLengthTime)
    robot.keyToggle(letter, 'up')
}

let offset = 38
let posx = 815
let posy = 600
const rows = 4
const cols = 9

function dropInventory(){
    sleep(1000)
    robot.keyTap('t')
    robot.typeString('/shop')
    robot.keyTap('enter')
    sleep(1000)
    robot.moveMouse(816, 526);
    robot.mouseClick()

    let invPos = []
    let loc
    for(let i = 0;i<rows;i++){
        for(let o = 0;o<cols;o++){
            if(i == 3 && o == 0) continue

			    loc = {y: posy + offset*i, x: posx + offset*o}
			    console.log(loc)
			    invPos.push(loc)
		
        }
    }


    robot.keyToggle('shift', 'down')
    for(let i in invPos){
        let pos = invPos[i]
        sleep(100)
        robot.moveMouse(pos.x, pos.y);
        robot.mouseClick()
    }
    robot.keyToggle('shift', 'up')

    robot.keyTap('escape')
}


function sleep(n){
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}


// GET MOUSE POS
setTimeout(function(){ 
    start()
}, 5000);

