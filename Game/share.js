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
    gameContainer.removeEventListener("touchend", reprint );
    transcriptUp.end();
    transcriptUp.isEnd = true;

    ctx.drawImage(certificateImg2, 0, 716, bWid*bCols, 512);
    ctx.font = "normal 47px Arial";
    ctx.fillStyle = "black";
    ctx.fillText( player.name, 50+ 190-(20+45*player.nameLength-1)/3.8, 945 );
    console.log(50+ 190-(24+47*player.nameLength-1)/5 );
    console.log(player.nameLength);
    ctx.fillText( player.gpa.toFixed(3).toString(),185, 1019);
    ctx.fillText( player.credit.toString(),245, 1079 );
    if( player.gpa>=4.0 ) ctx.drawImage(thumbImg, 330, 970, 100, 100);

    ctx.drawImage(QRImg, 470, 1000, 200, 200);
    //if(player.name === "下方可更改") swal("1","頁面下方可修改姓名噢");
}

let transcriptUp = {
    isEnd: false,
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