var robot = require("robotjs");

let x = 5

let sleepClick = 100
let moveLengthTime = 290


function start(){
    while(true){
        sleep(1000)

        for(let i = 0; i<x; i++){
            pickAndPlant()
            move('w')
        }

        pickAndPlant()
        move('a')


        for(let i = 0; i<x; i++){
            pickAndPlant()
            move('s')
        }

        pickAndPlant()
        move('a')
     
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


function sleep(n){
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}


// GET MOUSE POS
setTimeout(function(){ 
    start()
}, 5000);

