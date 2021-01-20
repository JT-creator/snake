let defaultWid = 700;
var canvas = document.getElementById("Canvas_main");
var ctx = canvas.getContext("2d");

//ctx.fillStyle = "red"; ctx.fillRect(0,0,12,12 );
const bRows = 33;
const bCols = 25;
const bWid = 28; //Block Width
const bHei = 28; //Block Height
const initLength = 3; //max = 17
const moveTime = 6;
const FoodAppearTime = 100;
const FoodLastTime = 300;
const GreateAppearTime = 700;
const minReactDistForTouch = 30;

let graph = []; //graph[row][col]
//  x=0: nothing    x>0: snake  x<0: food
let timeNode = 0;

let player = {
    credit : 0,
    gpa : 0,
    total_cga : 0,
    name : "Anonymous Snake",

    renderScore() {
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.fillText("cga", bWid * 3, bHei * bRows+50 );
        ctx.fillText( player.gpa.toFixed(5).toString(), bWid * 2, bHei * bRows+50+40 );

        ctx.fillText("total credit", bWid * 9, bHei * bRows+50 );
        ctx.fillText( player.credit.toString(), bWid * 10, bHei * bRows+50+40 );
    }
}

let gaming = {
    ended : false,
    interval1 : 0,
    interval2 : 0
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
    },
    eatSelf() { //call when body moved in data, but head haven't
        if (graph[snake.posHeadR][snake.posHeadC] > 0) {
            gaming.ended = true;
        }
    }, //self-eat
    eatFood() { //food eat
        if (graph[snake.posHeadR][snake.posHeadC] < 0) { //yes FOOD!!
            for (let r = 0; r < bRows; r++)
                for (let c = 0; c < bCols; c++)
                    if(graph[r][c] > 0) graph[r][c]++;

            let ind;
            for(ind=0; ind<Foods.length; ind++)
                if( Foods[ind].col === snake.posHeadC && Foods[ind].row === snake.posHeadR ) break;

            graph[ Foods[ind].row ][ Foods[ind].col ] = 0;
            Foods[ind].addScore();
            Foods[ind].vanish();

            snake.length++;
        }
    }
}

let controls = {
    touchStartX : 0,
    touchStartY : 0,
    touchEndX : 0,
    touchEndY : 0,
    minReactDist : minReactDistForTouch,
    keyReact( key ) {
        switch( key )
        {
            case 38:
                if( snake.heading === "down" ) break;
                snake.heading = "up";
                break;
            case 40:
                if( snake.heading === "up" ) break;
                snake.heading = "down";
                break;
            case 37:
                if( snake.heading === "right" ) break;
                snake.heading = "left";
                break;
            case 39:
                if( snake.heading === "left" ) break;
                snake.heading = "right";
                break;
            default:
                console.log(key);
        }
    },
    touchReact() {
        let mDist;
        mDist = Math.abs( controls.touchStartX - controls.touchEndX ) + Math.abs(controls.touchStartY - controls.touchEndY );
        if( mDist < controls.minReactDist ) return;

        let vecUpToDown = controls.touchEndY - controls.touchStartY;
        let vecLeftToRight = controls.touchEndX - controls.touchStartX;
        vecUpToDown *= 0.75;

        let key;
        if( Math.abs(vecUpToDown) > Math.abs( vecLeftToRight ) ) {
            if( vecUpToDown > 0 ) key = 40;
            else key = 38;
        }
        else {
            if( vecLeftToRight > 0 ) key = 39;
            else key = 37;
        }

        controls.keyReact( key );
    },

    haveControl() {
        //keyboard
        window.addEventListener("keydown", function(e) { controls.keyReact(e.keyCode); });
        //window.addEventListener("keyup", function(e) { });
        //touches
        window.addEventListener("touchstart", function (e) { /*e.preventDefault();*/ controls.touchStartX = e.pageX; controls.touchStartY = e.pageY; });
        window.addEventListener("touchend", function (e) { /*e.preventDefault();*/ controls.touchEndX = e.pageX; controls.touchEndY = e.pageY; controls.touchReact(); });

        document.body.addEventListener("touchmove", function(e){ /*e.preventDefault();*/ });
    },
    //button
   /* buttonReactUp() { controls.keyReact(38); },
    buttonReactDown() { controls.keyReact(40); },
    buttonReactLeft() { controls.keyReact(37); },
    buttonReactRight() { controls.keyReact(39); } */
}

var gameContainer = document.querySelector(".game-container");
gameContainer.addEventListener("touchstart", function (event) {
    event.preventDefault();
});

gameContainer.addEventListener("touchmove", function (event) {
    event.preventDefault();
});



