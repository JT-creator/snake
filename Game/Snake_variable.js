let defaultWid = 700;
var canvas = document.getElementById("Canvas_main");
var ctx = canvas.getContext("2d");

//ctx.fillStyle = "red"; ctx.fillRect(0,0,12,12 );
const bRows = 33;
const bCols = 25;
const bWid = 28; //Block Width
const bHei = 28; //Block Height
const initLength = 17; //max = 17
const moveTime = 6;
const FoodAppearTime = 100;
const FoodLastTime = 300;
const FoodFlashingTime = 50;
const GreateAppearTime = 700;
const minReactDistForTouch = 30;

const RequiredCredit = 70;

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
    started : false,
    ended : false,
    interval1 : 0,
    interval2 : 0,
    endreson : "timeout"
}


let snake = {
    length : initLength,
    posHeadR : Math.floor(bRows/2 ),
    posHeadC : Math.floor(bCols/2 ),
    heading : "up",
    renderHeading : "up",

    renderMe(rowConst, colConst) { //can adjust if needed, (0,0) means no adjust
        for(let r=0; r<bRows; r++)
            for(let c=0; c<bRows; c++) {
                if( r === this.posHeadR && c === this.posHeadC ) {
                   /*ctx.fillStyle = "red";
                   ctx.fillRect((c + 0.5*rowConst)*bWid, (r + 0.5*colConst)*bHei, bWid, bHei);*/
                }
                else if( graph[r][c] > 0 ) {
                    //gradiant
                    let grd = ctx.createRadialGradient((c + 0.5)*bWid,(r + 0.5)*bHei,0.1*bWid,(c + 0.5)*bWid,(r + 0.5)*bHei,1.3*bWid);
                    grd.addColorStop(0,"black");
                    grd.addColorStop(1,"white");
                    ctx.fillStyle = grd;
                    //ctx.fillStyle = "black";
                    ctx.fillRect((c + 0.5*rowConst)*bWid, (r + 0.5*colConst)*bHei, bWid, bHei);

                   /* ctx.strokeStyle = "white";
                    ctx.strokeWidth = 10;
                    ctx.strokeRect((c + 0.1)*bWid, (r + 0.1)*bHei, 0.8*bWid, 0.8*bHei);*/
                }
            }
    },
    renderHeadTail()
    {
        let fac = timeNode%moveTime; //moveTime === 6
        fac = fac / moveTime;

        let c = snake.posHeadC, r = snake.posHeadR;

        let oc = c, or = r;
        switch( snake.renderHeading )
        {
            case "up": or = (or + 1 + bRows)%bRows; break;
            case "down": or = (or - 1 + bRows)%bRows; break;
            case "left": oc = (oc + 1 + bCols)%bCols; break;
            case "right": oc = (oc - 1 + bCols)%bCols; break;
        }
        let grd = ctx.createRadialGradient((oc + 0.5)*bWid,(or + 0.5)*bHei,0.1*bWid,(oc + 0.5)*bWid,(or + 0.5)*bHei,1.3*bWid);
        grd.addColorStop(0,"black");
        grd.addColorStop(1,"white");
        ctx.fillStyle = grd;
        if( graph[or][oc] > 0 ) ctx.fillRect(oc*bWid, or*bHei, bWid, bHei);

        ctx.fillStyle = "red";
        switch( snake.renderHeading )
        {
            case "up":
                ctx.fillRect(c*bWid, r*bHei + (1 - fac)*bHei, bWid, Math.min(bHei, bHei*bRows - (r*bHei + (1 - fac)*bHei) ) );

                if( r*bHei + (1 - fac)*bHei + 0.35*bHei > bHei * bRows ) break;
                ctx.fillStyle = "black";
                ctx.beginPath();
                ctx.arc((c+0.3)*bWid, r*bHei + (1 - fac)*bHei + 0.35*bHei, 0.1*bWid, 0, 2 * Math.PI);
                //ctx.stroke();
                ctx.fill();

                ctx.beginPath();
                ctx.arc((c+0.7)*bWid, r*bHei + (1 - fac)*bHei + 0.35*bHei, 0.1*bWid, 0, 2 * Math.PI);
                //ctx.stroke();
                ctx.fill();
                break;
            case "down":
                ctx.fillRect(c*bWid, r*bHei - (1-fac)*bHei, bWid, bHei);
                ctx.fillStyle = "black";
                ctx.beginPath();
                ctx.arc((c+0.3)*bWid, r*bHei - (1-fac)*bHei + 0.65*bHei, 0.1*bWid, 0, 2 * Math.PI);
                //ctx.stroke();
                ctx.fill();

                ctx.beginPath();
                ctx.arc((c+0.7)*bWid, r*bHei - (1-fac)*bHei + 0.65*bHei, 0.1*bWid, 0, 2 * Math.PI);
                //ctx.stroke();
                ctx.fill();
                break;
            case "left":
                ctx.fillRect(c*bWid + (1-fac)*bWid, r*bHei, Math.min(bWid, bWid*bCols-(c*bWid + (1-fac)*bWid) ), bHei );
                ctx.fillStyle = "black";
                ctx.beginPath();
                ctx.arc(c*bWid + (1-fac)*bWid + 0.35*bWid, r*bHei + 0.3*bHei, 0.1*bWid, 0, 2 * Math.PI);
                //ctx.stroke();
                ctx.fill();

                ctx.beginPath();
                ctx.arc(c*bWid + (1-fac)*bWid + 0.35*bWid, r*bHei + 0.7*bHei, 0.1*bWid, 0, 2 * Math.PI);
                //ctx.stroke();
                ctx.fill();
                break;
            case "right":
                ctx.fillRect(c*bWid - (1-fac)*bWid, r*bHei, bWid, bHei);
                ctx.fillStyle = "black";
                ctx.beginPath();
                ctx.arc(c*bWid - (1-fac)*bWid + 0.65*bWid, r*bHei + 0.3*bHei, 0.1*bWid, 0, 2 * Math.PI);
                //ctx.stroke();
                ctx.fill();

                ctx.beginPath();
                ctx.arc(c*bWid - (1-fac)*bWid + 0.65*bWid, r*bHei + 0.7*bHei, 0.1*bWid, 0, 2 * Math.PI);
                //ctx.stroke();
                ctx.fill();
                break; //canvas boarder did the rest
        }

     /*   if( graph[or][oc] <= 0 ) {
            ctx.fillStyle = "white";
            ctx.fillRect(oc*bWid, or*bHei, bWid, bHei );
        }*/

    },

    eatSelf() { //call when body moved in data, but head haven't
        if (graph[snake.posHeadR][snake.posHeadC] > 0) {
            gaming.endreson = "selfeat";
            gaming.ended = true;
        }
    }, //self-eat
    eatFood() { //food eat
        if (graph[snake.posHeadR][snake.posHeadC] < 0) { //yes FOOD!!
            for (let r = 0; r < bRows; r++)
                for (let c = 0; c < bCols; c++)
                    if (graph[r][c] > 0) graph[r][c]++;

            let ind;
            for (ind = 0; ind < Foods.length; ind++)
                if (Foods[ind].col === snake.posHeadC && Foods[ind].row === snake.posHeadR) break;

            graph[Foods[ind].row][Foods[ind].col] = 0;
            console.log("here "+ind);
            reportCheck.restart();
            Foods[ind].addScore();
            Foods[ind].vanish();

            snake.length++;
        }

        //special one
        else {
            for (let ind = 0; ind < Foods.length; ind++)
                if (Foods[ind].credit === 4)
                    if (Math.abs(snake.posHeadR - Foods[ind].row) === 1 && Math.abs(snake.posHeadC - Foods[ind].col) === 1) {
                        reportCheck.restart();
                        Foods[ind].addScore();
                        Foods[ind].vanish();
                        snake.length++;
                    }
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



