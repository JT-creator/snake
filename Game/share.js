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

let ad = {
    num : 500,
    isClosed : false,

    print() {
        ctx.drawImage(adImg, 0, 419, 700, 297);
        ad.refreshCircle();
    },
    refreshCircle() {
        ctx.strokeStyle = "#f7e6cc";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.arc(40, 450, 30,  0, 2 * Math.PI);
        ctx.stroke();

        ctx.strokeStyle = "#f5958e";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(40, 450, 30, -0.5 * Math.PI, ad.num/500* 2*Math.PI - 0.5*Math.PI);
        ctx.stroke();

        ad.num--;
        if( ad.num>0 && !ad.isClosed ) setTimeout( ad.refreshCircle, 10);
        if( ad.num === 0 ) ad.close();
    },
    close() {
        ctx.drawImage(ending, 0, 0, bCols*bWid, bRows*bHei);
        reprintTrans();
        ad.isClosed = true;
    },
}

function reprintTrans() {
    //gameContainer.removeEventListener("touchend", reprint );
    //transcriptUp.end();
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
    //interval : 0,
    //ii : 0,
    //manual, auto now
    /*start : function() {
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
    }*/
}

function succeed() {
    clearInterval( jumpIntervalInLast );

    reprintTrans();
    ad.print();
    player.autoNameRefresh();
    //transcriptUp.start();
    //gameContainer.addEventListener("touchend", reprint );
}