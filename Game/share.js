function failure() {
    console.log("Fail");
    clearInterval( jumpIntervalInLast );

    ctx.fillStyle = "#D0D0D0";
    ctx.fillRect(150, bRows*bHei-90, 400, 80 );

    ctx.font="60px Verdana";
    ctx.fillStyle = "black";
    ctx.fillText("點擊屏幕復讀", 170, bRows*bHei-20 );

    gameContainer.addEventListener("touchend", () => { window.location.href = window.location.href;} );
}

function reprint() {
    transcriptUp.end();

    ctx.drawImage(certificateImg2, 0, 716, bWid*bCols, 512);
    ctx.font = "47px Arial";
    ctx.fillStyle = "black";
    ctx.fillText( player.gpa.toFixed(3).toString(),185, 979);
    ctx.fillText( player.credit.toString(),245, 1039 );
    if( player.gpa>=4.0 ) ctx.drawImage(thumbImg, 310, 900, 100, 100);

    ctx.drawImage(QRImg, 470, 1000, 200, 200);
}

let transcriptUp = {
    interval : 0,
    ii : 0,
    start : function() {
        transcriptUp.interval = setInterval( transcriptUp.print1, 500);
    },
    end : function() {
        clearInterval( transcriptUp.interval );
    },
    print1 : function() {
        console.log(transcriptUp.ii);
      if(transcriptUp.ii === 0) ctx.drawImage(upLast, 300, bRows*bHei-70, 125, 70 );
      else ctx.drawImage(upLast2, 300, bRows*bHei-70, 125, 70 );

        transcriptUp.ii = (transcriptUp.ii+1)%2;
    }
}

function succeed() {
    clearInterval( jumpIntervalInLast );

    transcriptUp.start();
    gameContainer.addEventListener("touchend", reprint );
}