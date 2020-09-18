function drawO(x, y, animate=false){

    var rawX = x;
    var rawY = y;
    x = gridX(x);
    y = gridY(y);
    

    c.lineCap = theme.knot.cap;
    c.strokeStyle = theme.knot.color;
    c.lineWidth = theme.knot.thickness;

    if(animate == true){
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
 *| 9. O Animation Function                            #
 *|                                                    #
\#####################################################*/

function animateCircle(x, y, rawX, rawY){
    var iteration = 0;
    // var totalIterations = toFps(500);
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

        easingValue = easeOutQuart(iteration, 0, Math.PI*2, toFps(oDuration));

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

        if(iteration<toFps(oDuration) && game.end==false){
            // console.log("true");
            
            iteration ++;
            requestAnimationFrame(animate);
        }
        else if(game.end==true && game.win==false){
            c.clearRect(
                gridPosX,
                gridPosY, 
                sectionWidth - padding,
                sectionWidth - padding

            );
        }
        else if(game.end==true && game.win==true){
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
    }

    animate();
}