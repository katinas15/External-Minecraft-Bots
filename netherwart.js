var robot = require("robotjs");

let x = 55
let y = 28

let sleepClick = 20
let moveLengthTime = 287


function start(){
    while(true){
        sleep(1000)

        for(let i = 0; i<y; i++){
            if(i%2 == 0) dropInventory()
            for(let j = 0; j<x; j++){
                pickAndPlant()
                pickAndPlant()
                move('w')
            }
    
            pickAndPlant()
            move('a')
    
    
            for(let j = 0; j<x; j++){
                pickAndPlant()
                pickAndPlant()
                move('s')
            }
            move('s')
            move('s')
    
            pickAndPlant()
            pickAndPlant()
            move('a')
        }
        


        for(let i = 0; i<y*2+3; i++){
            move('d')
            move('s')
        }


        dropInventory()

    }
}

function getRndInteger (min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
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

let offset = 58
let posx = 345
let posy = 513
const rows = 4
const cols = 9

function dropInventory(){
    sleep(1000)
    robot.keyTap('t')
    robot.typeString('/shop')
    robot.keyTap('enter')
    sleep(1000)
    robot.moveMouse(359, 418);
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

