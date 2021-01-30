
function renderBoarders() { //create Block boarders
    //if( clock.flag1 ) ctx.fillStyle = "#FAC7D1";
    ctx.fillStyle = "#E9E9E9";//color Test
    if(timeWarning) {ctx.fillStyle = "#ECDADA"; console.log("hahahahahaaaa");}

    ctx.fillRect(0, 0, bWid*bCols, bHei*bRows );
/*    for(let r=0; r<bRows; r++)
        for(let c=0; c<bCols; c++)
        {
            let grd = ctx.createRadialGradient((0.5+c)*bWid, (0.5+r)+bHei,0.4*bHei, (0.5+c)*bWid, (0.5+r)+bHei, 0.7*bHei);
            grd.addColorStop(0, "#E9E9E9");
            grd.addColorStop(1, "white");

            ctx.fillStyle = grd;
            ctx.fillRect(c*bWid, r*bHei, bWid, bHei);
        }*/


    //let img = new Image;
    //img.onload = function () { ctx.drawImage(img, 0, 0, bWid*bCols, bHei*bRows); };
    //img.src = "../Game/wel/abs.jpg";


    ctx.strokeStyle = "white";//"#DDDDDD";
    ctx.lineWidth = 2;
    for(let r=0; r<bRows; r++)
        for(let c=0; c<bCols; c++)
        {
            if( r === snake.posHeadR || c === snake.posHeadC ) {
                ctx.lineWidth = 5;
                ctx.strokeRect(c * bWid, r * bHei, bWid, bHei);
                ctx.lineWidth = 2;
            }
            ctx.strokeRect(c * bWid, r * bHei, bWid, bHei);
        }

}

let imgBar = new Image;
let barI = 0;
imgBar.src = "../Game/pbar/flag.jpg";

function renderProgressBar() {
    ctx.drawImage(barImg[barI], Math.min(bWid +( 13*bWid * player.credit/RequiredCredit ), 21*bWid ) , bHei*bRows + 240, 60 ,50 )
    barI++;
    if(barI>15) barI = 0;

    ctx.drawImage(imgBar, 15*bWid, bHei*bRows + 240, 1.6*bWid, 2*bHei );

    ctx.fillStyle = "black";
    ctx.fillRect( bWid, bHei*bRows + 290, 20*bWid, 5 );

}


function initGame(){
    for(let r=0; r<bRows; r++) //init graph[][]
    {
        graph.push([]);
        for(let c=0; c<bCols; c++)
            graph[r].push(0);
    }

    renderBoarders();

    for(let i=initLength; i>0; i--)
        graph[ snake.posHeadR+(initLength-i) ][ snake.posHeadC ] = i;
    snake.renderMe(0, 0);
}

function renderMiniReport()
{
    miniCount++;
    let i;
    if(last_cga===0 || miniCount>10 ) return;
    if(last_cga===4.3) i = 0;
    else if(last_cga===4) i = 1;
    else if(last_cga===3) i = 2;
    else if(last_cga===2) i = 3;

    ctx.drawImage( reportFood[i], 20*bWid-30, bHei*bRows+150, 2*bWid, 2*bHei);
}

function updateData()
{
    timeNode++; //increase every 0.02s
    if( timeNode%moveTime === 0 ) {
        //snake go
        switch( snake.heading ) //head move in (snake obj)
        {
            case "up":
                snake.posHeadR = (snake.posHeadR - 1 + bRows) % bRows;
                break;
            case "down":
                snake.posHeadR = (snake.posHeadR + 1 + bRows) % bRows;
                break;
            case "left":
                snake.posHeadC = (snake.posHeadC - 1 + bCols ) % bCols;
                break;
            case "right":
                snake.posHeadC = (snake.posHeadC + 1 + bCols ) % bCols;
                break;
        }
        snake.renderHeading = snake.heading;

        snake.eatFood();
        //body move in graph[][]
        for(let r=0; r<bRows; r++)
            for(let c=0; c<bCols; c++)
                if( graph[r][c]>0 ) graph[r][c]--;

        snake.eatSelf();
        graph[ snake.posHeadR ][ snake.posHeadC ] = snake.length; //head move in graph[][]

    }

    if( timeNode % 10 === 0)
        Foods.forEach( function (c) {
            c.recordTime();
            c.checkTime();
        })


    if( timeNode % FoodAppearTime === 0 )
        generateFood();

    if( timeNode%GreateAppearTime === 0 )
        GreatFood.generate();
}

function updateRender()
{
    if( timeNode%moveTime === 0 ) //May need to adjust.  rerender background
        clearMainCanvas();

    if( timeNode%3 === 0 ) renderProgressBar();

    if( timeNode%moveTime === 0 ) renderMiniReport();

    if( timeNode%2 === 0)
        if( !reportCheck.renderMe() ) reportTime.renderMe();

    if( timeNode%moveTime === 0 ) //Food
        Foods.forEach( function (c) { c.renderme(); });


    if( timeNode%moveTime === 0 ) //Snake
        snake.renderMe(0, 0);

    snake.renderHeadTail();

    if( timeNode%moveTime === 0) player.renderScore();
    if( timeNode%6 === 0 ) clock.renderMe_JudgeEnd();

    if( gaming.ended ) gameEnd();
}

function clearMainCanvas() {
    ctx.clearRect(0,0, canvas.getAttribute("width"), canvas.getAttribute("height") );
    renderBoarders();
}

function gameStart()
{
    //document.body.addEventListener('touchmove', function(event) { event.preventDefault(); }, false);
    if( gaming.started ) return;

    //musicTime.play();
    gaming.started = true;
    initGame();
    controls.haveControl();
    gaming.interval1 = setInterval(updateData, 20);
    gaming.interval2 = setInterval(updateRender, 20);

    clock.startClock();
    reportCheck.restart();
}

function gameEnd() {
    clearInterval( gaming.interval1 );
    clearInterval( gaming.interval2 );
    clearInterval( reportTime.inter );

    if( gaming.endreson === "selfeat" ) {
        let grd = ctx.createLinearGradient(snake.posHeadC * bWid, snake.posHeadR*bHei, snake.posHeadC * bWid + bWid, snake.posHeadR*bHei + bHei);
        grd.addColorStop(0, "red");
        grd.addColorStop(1, "black");
        ctx.fillStyle = grd;
        ctx.fillRect( snake.posHeadC * bWid, snake.posHeadR*bHei, bWid, bHei);
    }
    endReport();
}



//gameStart();