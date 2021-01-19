
var canvas = document.getElementById("Canvas_main");
var ctx = canvas.getContext("2d");

//ctx.fillStyle = "red"; ctx.fillRect(0,0,12,12 );
const bWid = 12; //Block Width
const bHei = 12; //Block Height
const bRows = 33;
const bCols = 25;
const initLength = 17; //max = 17
const moveTime = 6;
const minReactDistForTouch = 30;

let graph = []; //graph[row][col]
//  x=0: nothing    x>0: snake  x<0: food
let timeNode = 0;

let player = {
    credit : 0,
    gpa : 0,
    name : "Anonymous Snake",

}

let snake = {
    length : initLength,
    posHeadR : Math.floor(bRows/2 ),
    posHeadC : Math.floor(bCols/2 ),
    heading : "up",

    renderMe(rowConst, colConst) { //can adjust if needed, (0,0) means no adjust
        for(let r=0; r<bRows; r++)
            for(let c=0; c<bRows; c++) {
                if( r === this.posHeadR && c === this.posHeadC ) {
                   ctx.fillStyle = "red";
                   ctx.fillRect((c + 0.5*rowConst)*bWid, (r + 0.5*colConst)*bHei, bWid, bHei);
                }
                else if( graph[r][c] > 0 ) {
                    ctx.fillStyle = "black";
                    ctx.fillRect((c + 0.5*rowConst)*bWid, (r + 0.5*colConst)*bHei, bWid, bHei);
                }
            }
    }
}

let controls = {
    key : 0,
    touchStartX : 0,
    touchStartY : 0,
    touchEndX : 0,
    touchEndY : 0,
    minReactDist : minReactDistForTouch,
    keyReact() {
        switch( this.key )
        {
            case 38:
                snake.heading = "up";
                break;
            case 40:
                snake.heading = "down";
                break;
            case 37:
                snake.heading = "left";
                break;
            case 39:
                snake.heading = "right";
                break;
            default:
                console.log(this.key);
        }
    },
    touchReact() {
        let mDist;
        mDist = Math.abs( controls.touchStartX - controls.touchEndX ) + Math.abs(controls.touchStartY - controls.touchEndY );
        if( mDist < controls.minReactDist ) return;

        let vecUpToDown = controls.touchEndY - controls.touchStartY;
        let vecLeftToRight = controls.touchEndX - controls.touchStartX;
        vecUpToDown *= 0.75;

        if( Math.abs(vecUpToDown) > Math.abs( vecLeftToRight ) ) {
            if( vecUpToDown > 0 ) controls.key = 40;
            else controls.key = 38;
        }
        else {
            if( vecLeftToRight > 0 ) controls.key = 39;
            else controls.key = 37;
        }

        controls.keyReact();
    },

    haveControl() {
        //keyboard
        window.addEventListener("keydown", function(e) { controls.key = e.keyCode; controls.keyReact(); });
        window.addEventListener("keyup", function(e) { this.key = 0; });
        //touches
        window.addEventListener("touchstart", function (e) { controls.touchStartX = e.pageX; controls.touchStartY = e.pageY; });
        window.addEventListener("touchend", function (e) { controls.touchEndX = e.pageX; controls.touchEndY = e.pageY; controls.touchReact(); });

    },
    //button
    buttonReactUp() { controls.key = 38; controls.keyReact(); },
    buttonReactDown() { controls.key = 40; controls.keyReact(); },
    buttonReactLeft() { controls.key = 37; controls.keyReact(); },
    buttonReactRight() { controls.key = 39; controls.keyReact(); }
}



