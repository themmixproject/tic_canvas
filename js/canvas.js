/*

    ~Index canvas.js~
    ----------------------

    1. Monkey Patches
    2. Global Utility Functions
    3. Canvas Properties
    4. Init Values
    5. Game Variables
        5.1 Win Combinations
    6. Event Listeners
    7. Functions
    8. Game Functions
    9. Intialize

*/

/** TO MORE AWAKE STEVEN, RESTRUCTURE THE "setCoordinates()" FUNCTION
 * BASICALLY, PUT IT IN A DIFFERENT PLACE, OR JUST CREATE A SEPERATE CHAPTER FOR IT
 * 
 */

/*#####################################################\
 *|                                                    #
 *| 1. Monkey Patches                                  #
 *|                                                    #
\#####################################################*/

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

window.cancelAnimationFrame = (function () {
    return window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    function (timPtr) {
        window.clearTimeout(timPtr);
    };
})();

/*#####################################################\
 *|                                                    #
 *| 2. Global Utility Functions                        #
 *|                                                    # 
\#####################################################*/

function drawPath(x, y, x1, y1){
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x1, y1);
    c.stroke();
}

function gridX(x){
    return x * sectionWidth + topLeft.x;
}

function gridY(y){
    return y * sectionWidth + topLeft.y;
}

function resetBrush(){
    c.lineWidth = 1;
    c.strokeStyle = "black";
    c.fillStyle = "black";
    c.lineCap = "butt";
}

function easeInOutExpo(t, b, c, d) {
    if (t==0) return b;
    if (t==d) return b+c;
    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  }
  
  function easeInExpo(t, b, c, d) {
    return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  }

/*#####################################################\
 *|                                                    #
 *| 3. Canvas properties                               #
 *|                                                    #
\#####################################################*/

var gridWidth = 350;
var sectionWidth = gridWidth / 3;

var theme = {
    cross : {
        color : "#4F9BA8",
        cap : "round",
        thickness : 10
    },
    knot : {
        color : "#D9695F",
        cap : "round",
        thickness : 10
    },
    grid : {
        color : "#2D3742",
        thickness : 10,
        cap : "round"
    },
    background : "#EFCDBF"
};

var padding = 25;
 
/*#####################################################\
 *|                                                    #
 *| 4. Init Values                                     #
 *|                                                    #
 *| These values are the standard var's of canvas.js   #
 *|                                                    #
\#####################################################*/

// setting up canvas
var canvas = document.getElementById("canvas");
canvas.style.backgroundColor = theme.background;
var c = canvas.getContext('2d');
c.translate(0.5,0.5);

// var innerWidth = window.innerWidth;
// var innerHeight = window.innerHeight;

canvas.width = innerWidth;
canvas.height = innerHeight;

var center = {
    x: canvas.width / 2,
    y: canvas.height / 2
};

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

var topLeft = {
    x: center.x - sectionWidth * 1.5,
    y: center.y - sectionWidth * 1.5
};

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];


/*#####################################################\
 *|                                                    #
 *| 5. Game Variables                                  #
 *|                                                    #
\#####################################################*/

var grid = [];

for(var i=0;i<3;i++){
    grid.push([0,0,0]);
}

var computerMoved = false;

var game = {
    end: false,
    win: false
};

/*#####################################################\
 *|                                                    #
 *| 5.1 Win Combinations                               #
 *|                                                    #
\#####################################################*/

var combinations=[];

function setCombinations(){
    

    for(var y = 0; y < 3; y++){
        var array = [];
        for(var x = 0; x < 3; x++){
            array.push([x,y]);
        }
        combinations.push(array);
    }
    
    for(var y = 0; y < 3; y++){
        array = [];
        for(var x = 0; x < 3; x++){
            array.push([y,x]);
        }
        combinations.push(array);
    }

    for(i=0;i<1;i++){
        var array = [];
        var array1 = [];
            for(var x=2, y=0; x >= 0; x--, y++){
    
                array1.push([x,x]); 
    
                array.push([x, y]);
    
            }
        
        combinations.push(array1,array);
    }

}

/*#####################################################\
 *|                                                    #
 *| 6. Event Listeners                                 #
 *|                                                    #
\#####################################################*/

// document.addEventListener("click",function(event){

//     mouse.x = event.clientX;
//     mouse.y = event.clientY;

//     for(x=0; x<3;x++){
//         for(y=0;y<3;y++){

//             // var gridX = x * sectionWidth + topLeft.x;
//             // var gridY = y * sectionWidth + topLeft.y;

//             if(
//                 mouse.x >= gridX(x) && mouse.x <= gridX(x) + sectionWidth &&
//                 mouse.y >= gridY(y) && mouse.y <= gridY(y) + sectionWidth
//             ){

//                 // index = x + (y * 3);

//                 playerTurn(x, y);

//                 // console.log(x + " " + y);

//             }
//         }
//     }

// });


// event that gets execute on tap or click
function canvasEvent(clientX, clientY){
    mouse.x = clientX;
    mouse.y = clientY;

    for(x=0; x<3;x++){
        for(y=0;y<3;y++){

            // var gridX = x * sectionWidth + topLeft.x;
            // var gridY = y * sectionWidth + topLeft.y;

            if(
                mouse.x >= gridX(x) && mouse.x <= gridX(x) + sectionWidth &&
                mouse.y >= gridY(y) && mouse.y <= gridY(y) + sectionWidth
            ){

                console.log(mouse.x);
                
                // index = x + (y * 3);

                playerTurn(x, y);

                // console.log(x + " " + y);

            }
        }
    }

};

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    document.addEventListener("touchstart",function(event){
        var clientX = event.touches[0].clientX;
        var clientY = event.touches[0].clientY;

        canvasEvent(clientX, clientY);
    });
}
else{
    document.addEventListener("click",function(event) {
        canvasEvent(event.clientX, event.clientY);
    })
}


window.addEventListener("resize",function(){

    // console.log("resize");
        
    // innerWidth = window.innerWidth;
    // innerHeight = window.innerHeight;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    center = {
        x: canvas.width / 2,
        y: canvas.height / 2
    };

    topLeft = {
        x: center.x - sectionWidth * 1.5,
        y: center.y - sectionWidth * 1.5
    };

    // drawGrid();
    redraw(); 
});

/*#####################################################\
 *|                                                    #
 *| 7. Functions                                       #
 *|                                                    #
\#####################################################*/

function drawGrid(){

    c.lineCap = theme.grid.cap;
    c.strokeStyle = theme.grid.color;
    c.lineWidth = theme.grid.thickness;
    
    // horizontal lines
    for(var y = 1, o = 1; y <= 2; y++, o=-1){
        drawPath(
            center.x - (sectionWidth * 1.5), center.y + (sectionWidth * -0.5) * o,
            center.x + (sectionWidth * 1.5), center.y + (sectionWidth * -0.5) * o
        );
    }

    // vertical lines
    for(var x = 1, o = 1; x <= 2; x++, o=-1){

        drawPath(
            center.x + (sectionWidth * -0.5) * o, center.y - (sectionWidth * 1.5),
            center.x + (sectionWidth * -0.5) * o, center.y + (sectionWidth * 1.5)
        );

    }
    
    resetBrush();

}

function redraw(){
    c.clearRect(0,0,innerHeight,innerWidth);
    drawGrid();
    grid.forEach(function(item,y){
        item.forEach(function(piece,x){
            if(piece==1){
                drawX(x,y);
            }if(piece==2){
                drawO(x,y);
            }
        });
    });
}

function drawFirst(x, y){

    var iteration = 0;
    var totalIterations = 20;

    var easingValueX;
    var easingValueY;

    function draw(){

        c.lineCap = theme.cross.cap;
        c.strokeStyle = theme.cross.color;
        c.lineWidth = theme.cross.thickness;

        easingValueX = easeInOutExpo(iteration, (x + padding), (sectionWidth - padding*2), totalIterations);
        easingValueY = easeInOutExpo(iteration, (y + padding), (sectionWidth - padding*2), totalIterations);        

        drawPath(x + padding, y + padding, easingValueX, easingValueY);

        if(iteration<totalIterations){
            iteration ++;
            requestAnimationFrame(draw);
        }
        
    }

    draw();
}

function drawSecond(x, y){
    var iteration = 0;
    var totalIterations = 20;
    var easingValueX;
    var easingValueY;

    function draw(){

        c.lineCap = theme.cross.cap;
        c.strokeStyle = theme.cross.color;
        c.lineWidth = theme.cross.thickness;

        easingValueX = easeInOutExpo(iteration, (x + sectionWidth - padding), -sectionWidth+(padding*2), totalIterations);
        easingValueY = easeInOutExpo(iteration, (y + padding), sectionWidth-(padding*2), totalIterations);        

         drawPath(
            x + sectionWidth - padding,
            y + padding,
            easingValueX,
            easingValueY
        );

        if(iteration<totalIterations){
            iteration ++;
            requestAnimationFrame(draw);
        }
        
    }

    draw();
}

function drawX(x, y, animate=false){
    
    x = gridX(x);
    y = gridY(y);

    c.lineCap = theme.cross.cap;
    c.strokeStyle = theme.cross.color;
    c.lineWidth = theme.cross.thickness;

    // console.log(y + sectionWidth - padding);

    if(animate==true){
        // drawFirst(x, y);

        // drawSecond(x, y);
    }
    else{
        drawPath(x + padding, y + padding,
            x + sectionWidth - padding,
            y + sectionWidth - padding

        );

        drawPath(
            x + sectionWidth - padding,
            y + padding,
            x + padding,
            y + sectionWidth - padding
        );
    }
    

    

    resetBrush();

}

function animateCircle(x, y, rawX, rawY){
    var iteration = 0;
    var totalIterations = 50;
    var easingValue;

    function animate(){

        // console.log("run");
        
            var gridPosX = gridX(rawX) + (padding  / 2);
            var gridPosY = gridY(rawY) + (padding / 2);

            c.clearRect(
                gridPosX,
                gridPosY, 
                sectionWidth - padding,
                sectionWidth - padding

            );
            
        c.lineCap = theme.knot.cap;
        c.strokeStyle = theme.knot.color;
        c.lineWidth = theme.knot.thickness;

        easingValue = easeInOutExpo(iteration, 0, Math.PI*2, totalIterations);

        c.beginPath();
        
        c.arc(
            gridX(rawX) + sectionWidth / 2,
            gridY(rawY) + sectionWidth / 2,
            sectionWidth / 2 - padding,
            0,
            easingValue,
            false
        );
        
        c.stroke();

        if(iteration<totalIterations){
            console.log("true");
            
            iteration ++;
            requestAnimationFrame(animate);
        }
    }

    animate();
}

function drawO(x, y, aniamte=false){

    var rawX = x;
    var rawY = y;
    x = gridX(x);
    y = gridY(y);
    

    c.lineCap = theme.knot.cap;
    c.strokeStyle = theme.knot.color;
    c.lineWidth = theme.knot.thickness;

    if(aniamte == true){
        animateCircle(x, y, rawX, rawY);   
    }
    else{
        c.beginPath();
        c.arc(
            x + sectionWidth / 2,
            y + sectionWidth / 2,
            sectionWidth / 2 - padding,
            0,
            Math.PI*2,
            false
        );
        c.stroke();
    }
    

    

    resetBrush();
}

/*#####################################################\
 *|                                                    #
 *| 8. Game Functions                                  #
 *|                                                    #
\#####################################################*/

function playerTurn(x, y){
    // console.log(x + " " + y);
    if(game.end==true){game.end=false};

    if(grid[y][x] == 0){

        drawX(x,y);

        grid[y][x] = 1;

        checkWin(1);

        if(game.end == false){
            computer();
        }
    }
    
};

function computerTurn(x, y){

    grid[y][x] = 2;

    drawO(x, y, true);

    checkWin(2);

}

function computer(){
    
    function computerLoop(player){
        combinations.forEach(function(array,index){
            for(var i=0; i<3; i++){
                if(
                    grid[ array[0][1] ][ array[0][0] ] == player &&
                    grid[ array[1][1] ][ array[1][0] ] == player &&
                    grid[ array[2][1] ][ array[2][0] ] == 0 &&
                    computerMoved == false
                ){
                    computerTurn( array[2][0] , array[2][1] );
                    computerMoved = true;
                }
                else {
                    array.unshift(array[2]);
                    array.pop();
                }
            }
        });
    }
    
    computerLoop(1);
    computerLoop(2);

    if(computerMoved == false){

        function randomBox(){
            function randomX(){
                return Math.floor(Math.random()*3);
            }
            function randomY(){
                return Math.floor(Math.random() * 3);
            }
            var x = randomX();
            var y = randomY();
            if( grid[y][x] != 0 ){
                randomBox();
            }
            else{
                computerTurn( x, y);
            }
            return;
        }
        randomBox();
    }
    computerMoved = false;
    return;
}

function checkWin(player){
    var counter=0;
    
        combinations.forEach(function(combination,index){
            if(game.win==false){
                combination.forEach(function(array,index){
                    if(
                        grid[ array[1] ][ array[0] ] == player
                    ){
                        counter++
                    };
                });
            }
            if(counter===3 && game.win==false){
                game.win=true;
                game.end=true;
                console.log("win");
            }
            else{counter=0};
        });
    if(game.win==true && game.end==true){reset();
    };

    counter=0;

    grid.forEach(function(array){

        array.forEach(function(item){
            if(item!=0){
                counter++;
            };
        })
        

        
    });

    // console.log(counter);
       
    if(counter==9 && game.end==false){
        game.end=true;
        console.log("tie");
        reset();
    };
    
    counter=0;
}

function reset(){

    game.win = false;

    grid.forEach(function(item,index){
        grid[index] = [0,0,0];
    })

    for(var x=0; x<3; x++){
        for(var y=0; y<3; y++){

            var gridX = x * sectionWidth + topLeft.x + (padding  / 2);
            var gridY = y * sectionWidth + topLeft.y + (padding / 2);

            c.clearRect(
                gridX,
                gridY, 
                sectionWidth - padding,
                sectionWidth - padding

            )
            
            // c.fillRect(
            //     gridX,
            //     gridY, 
            //     sectionWidth - padding,
            //     sectionWidth - padding

            // )
        }
    }

    

};

/*#####################################################\
 *|                                                    #
 *| 9. Intialize                                      #
 *|                                                    #
\#####################################################*/

// Implementation
function init() {

    setCombinations();
    drawGrid();

    console.log(combinations);
    console.log(grid);

}

init();