let defaultWid = 704;
var canvas = document.getElementById("Canvas_main");
var ctx = canvas.getContext("2d");

//ctx.fillStyle = "red"; ctx.fillRect(0,0,12,12 );
const bRows = 29;
const bCols = 22;
const bWid = 32; //Block Width
const bHei = 32; //Block Height
const initLength = 12; //max = 17
const moveTime = 8;
const FoodAppearTime = 120;
const FoodLastTime = 360;
const FoodFlashingTime = 50;
const GreateAppearTime = 1000;
const minReactDistForTouch = 30;

const RequiredCredit = 120;

let jumpIntervalInLast;

let graph = []; //graph[row][col]
//  x=0: nothing    x>0: snake  x<0: food
let timeNode = 0;
let timeWarning = false;

let player = {
    credit : 0,
    gpa : 0,
    total_cga : 0,
    name : "Anonymous Snake",

    renderScore() {
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.fillText("cga", bWid * 2+10, bHei * bRows+70 );
        ctx.fillText( player.gpa.toFixed(5).toString(), bWid +10, bHei * bRows+70+40 );

        ctx.fillText("total credits", bWid * 8+10, bHei * bRows+70 );
        ctx.fillText( player.credit.toString() + "/" + RequiredCredit.toString(), bWid * 9+10, bHei * bRows+70+40 );

        if( player.gpa >= 4.0 ) ctx.drawImage(thumbImg, bWid * 2+100, bHei * bRows+40, 2*bWid, 2*bWid);
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
                    grd.addColorStop(0,"#E3A408");
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
        let grd = ctx.createRadialGradient((oc + 0.5)*bWid,(or + 0.5)*bHei,0.1*bWid,(oc + 0.5)*bWid,(or + 0.5)*bHei,1.1*bWid);
        grd.addColorStop(0,"#E3A408");
        grd.addColorStop(1,"white");
        ctx.fillStyle = grd;
        if( graph[or][oc] > 0 ) ctx.fillRect(oc*bWid, or*bHei, bWid, bHei);

        //ctx.fillStyle = "#E34C00";
        switch( snake.renderHeading )
        {
            case "up":
                //ctx.fillRect(c*bWid, r*bHei + (1 - fac)*bHei, bWid, Math.min(bHei, bHei*bRows - (r*bHei + (1 - fac)*bHei) ) );
                ctx.drawImage(headImg[0], c*bWid, r*bHei + (1 - fac)*bHei, bWid, bHei);
                ctx.fillStyle = "white"
                ctx.fillRect(0, bRows*bHei, bCols*bWid, bHei);
                /*if( r*bHei + (1 - fac)*bHei + 0.35*bHei > bHei * bRows ) break;
                ctx.fillStyle = "black";
                ctx.beginPath();
                ctx.arc((c+0.3)*bWid, r*bHei + (1 - fac)*bHei + 0.35*bHei, 0.1*bWid, 0, 2 * Math.PI);
                //ctx.stroke();
                ctx.fill();

                ctx.beginPath();
                ctx.arc((c+0.7)*bWid, r*bHei + (1 - fac)*bHei + 0.35*bHei, 0.1*bWid, 0, 2 * Math.PI);
                //ctx.stroke();
                ctx.fill();*/
                break;
            case "down":
                //ctx.fillRect(c*bWid, r*bHei - (1-fac)*bHei, bWid, bHei);
                ctx.drawImage(headImg[1], c*bWid, r*bHei - (1-fac)*bHei, bWid, bHei);
                /*ctx.fillStyle = "black";
                ctx.beginPath();
                ctx.arc((c+0.3)*bWid, r*bHei - (1-fac)*bHei + 0.65*bHei, 0.1*bWid, 0, 2 * Math.PI);
                //ctx.stroke();
                ctx.fill();

                ctx.beginPath();
                ctx.arc((c+0.7)*bWid, r*bHei - (1-fac)*bHei + 0.65*bHei, 0.1*bWid, 0, 2 * Math.PI);
                //ctx.stroke();
                ctx.fill();*/
                break;
            case "left":
                //ctx.fillRect(c*bWid + (1-fac)*bWid, r*bHei, Math.min(bWid, bWid*bCols-(c*bWid + (1-fac)*bWid) ), bHei );
                ctx.drawImage(headImg[2], c*bWid + (1-fac)*bWid, r*bHei, bWid, bHei);
                /*ctx.fillStyle = "black";
                ctx.beginPath();
                ctx.arc(c*bWid + (1-fac)*bWid + 0.35*bWid, r*bHei + 0.3*bHei, 0.1*bWid, 0, 2 * Math.PI);
                //ctx.stroke();
                ctx.fill();

                ctx.beginPath();
                ctx.arc(c*bWid + (1-fac)*bWid + 0.35*bWid, r*bHei + 0.7*bHei, 0.1*bWid, 0, 2 * Math.PI);
                //ctx.stroke();
                ctx.fill();*/
                break;
            case "right":
                //ctx.fillRect(c*bWid - (1-fac)*bWid, r*bHei, bWid, bHei);
                ctx.drawImage(headImg[3], c*bWid - (1-fac)*bWid, r*bHei, bWid, bHei);
                /*ctx.fillStyle = "black";
                ctx.beginPath();
                ctx.arc(c*bWid - (1-fac)*bWid + 0.65*bWid, r*bHei + 0.3*bHei, 0.1*bWid, 0, 2 * Math.PI);
                //ctx.stroke();
                ctx.fill();

                ctx.beginPath();
                ctx.arc(c*bWid - (1-fac)*bWid + 0.65*bWid, r*bHei + 0.7*bHei, 0.1*bWid, 0, 2 * Math.PI);
                //ctx.stroke();
                ctx.fill();*/
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
                if (Foods[ind].credit === 5)
                    if (Math.abs(snake.posHeadR - Foods[ind].row) === 1 && Math.abs(snake.posHeadC - Foods[ind].col) === 1) {
                        reportCheck.restart();
                        Foods[ind].addScore();
                        Foods[ind].vanish();
                        snake.length++;
                    }
        }
    }
}

var gameContainer = document.querySelector(".game-container");
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
        gameContainer.addEventListener("touchstart", function (e) {

            if ((!window.navigator.msPointerEnabled && e.touches.length > 1) || e.targetTouches.length > 1) return;

            if (window.navigator.msPointerEnabled) {
                controls.touchStartX = e.pageX;
                controls.touchStartY = e.pageY;
            } else {
                controls.touchStartX = e.touches[0].clientX;
                controls.touchStartY = e.touches[0].clientY;
            }

            //controls.touchStartX = e.pageX; controls.touchStartY = e.pageY;
            e.preventDefault();
        });

        gameContainer.addEventListener("touchmove", function (e) {
            e.preventDefault();
        });

        gameContainer.addEventListener("touchend", function (e) {
            //controls.touchEndX = e.pageX; controls.touchEndY = e.pageY;
            if ((!window.navigator.msPointerEnabled && e.touches.length > 0) || e.targetTouches.length > 0) return;

            if (window.navigator.msPointerEnabled) {
                controls.touchEndX = e.pageX;
                controls.touchEndY = e.pageY;
            } else {
                controls.touchEndX = e.changedTouches[0].clientX;
                controls.touchEndY = e.changedTouches[0].clientY;
            }

            controls.touchReact();
        });
    },
    //button
   /* buttonReactUp() { controls.keyReact(38); },
    buttonReactDown() { controls.keyReact(40); },
    buttonReactLeft() { controls.keyReact(37); },
    buttonReactRight() { controls.keyReact(39); } */
}




