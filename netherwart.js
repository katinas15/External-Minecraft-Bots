var robot = require("robotjs");

let x = 50
let y = 50

let sleepClick = 20
let moveLengthTime = 290


function start(){
    while(true){
        sleep(1000)
        for(let i = 0; i<y; i++){
            for(let j = 0; j<x; j++){
                if(!(j == 0 && i == 0)) pickAndPlant()
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


        for(let i = 0; i<y+10; i++){
            move('d')
            move('s')
        }
        sleep(1000)
        robot.mouseClick("right")
        dropInventory()

        robot.keyToggle('escape', 'down')
        sleep(10)
        robot.keyToggle('escape', 'up')
    }
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

let offset = 40
let posx = 815
let posy = 600
const rows = 4
const cols = 9

function dropInventory(){
    let invPos = []
    let loc
    for(let i = 0;i<rows;i++){
        for(let o = 0;o<cols;o++){
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
}


function sleep(n){
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}


// GET MOUSE POS
setTimeout(function(){ 
    start()
}, 5000);

