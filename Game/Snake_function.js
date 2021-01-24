
function renderBoarders() { //create Block boarders
    //if( clock.flag1 ) ctx.fillStyle = "#FAC7D1";
    ctx.fillStyle = "#E9E9E9";//color Test

    ctx.fillRect(0, 0, bWid*bCols, bHei*bRows );
    //let img = new Image;
    //img.onload = function () { ctx.drawImage(img, 0, 0, bWid*bCols, bHei*bRows); };
    //img.src = "../Game/wel/abs.jpg";


    ctx.strokeStyle = "white";//"#DDDDDD";
    ctx.lineWidth = 2;
    for(let r=0; r<bRows; r++)
        for(let c=0; c<bCols; c++)
        {
            if( r === snake.posHeadR || c === snake.posHeadC ) {
                ctx.lineWidth = 3;
                ctx.strokeRect(c * bWid, r * bHei, bWid, bHei);
                ctx.lineWidth = 2;
            }
            ctx.strokeRect(c * bWid, r * bHei, bWid, bHei);
        }

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