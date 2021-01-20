
function renderBoarders() { //create Block boarders
    ctx.strokeStyle = "\t#DDDDDD";
    ctx.lineWidth = 2;
    for(let r=0; r<bRows; r++)
        for(let c=0; c<bCols; c++)
            ctx.strokeRect(c * bWid, r * bHei, bWid, bHei);
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

    if( timeNode%moveTime === 0 ) //Food
        Foods.forEach( function (c) { c.renderme(); });


    if( timeNode%moveTime === 0 ) //Snake
        snake.renderMe(0, 0);


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

    initGame();
    controls.haveControl();
    gaming.interval1 = setInterval(updateData, 20);
    gaming.interval2 = setInterval(updateRender, 20);

    clock.startClock();

}

function gameEnd() {
    clearInterval( gaming.interval1 );
    clearInterval( gaming.interval2 );

}



gameStart();