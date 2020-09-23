var robot = require("robotjs");

let x = 55
let y = 60

let sleepClick = 20
let moveLengthTime = 287


function start(){
    while(true){
        sleep(1000)
        for(let i = 0; i<y; i++){
            if(getRndInteger(1,10) > 8) dropInventory()
            for(let j = 0; j<x; j++){
                pickAndPlant()
                move('w')
            }
    
            pickAndPlant()
            move('a')
    
    
            for(let j = 0; j<x; j++){
                pickAndPlant()
                move('s')
            }
            move('s')
            move('s')
    
            pickAndPlant()
            move('a')
        }
        move('d')


        for(let i = 0; i<y+3; i++){
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
    sleep(sleepClick)
    robot.mouseClick("right")
    sleep(sleepClick)
}

function move(letter){
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
            if(rows == 3 && col == 0) return 
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

