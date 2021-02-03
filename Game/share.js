function failure() {
    console.log("Fail");
    clearInterval( jumpIntervalInLast );

    ctx.fillStyle = "#D0D0D0";
    ctx.fillRect(150, bRows*bHei-90, 400, 80 );

    ctx.font="60px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.fillText("點擊屏幕復讀", 170, bRows*bHei-20 );

    gameContainer.addEventListener("touchend", () => { window.location.href = window.location.href;} );
}

function reprint() {
    ctx.drawImage(certificateImg2, 0, 716, bWid*bCols, 512);
    ctx.font = "50px Arial";
    ctx.fillStyle = "black";
    ctx.fillText( player.gpa.toFixed(3).toString(),185, 979);
    ctx.fillText( player.credit.toString(),245, 1037 );

    ctx.drawImage(QRImg, 430, 960, 250, 250);
}

function succeed() {
    clearInterval( jumpIntervalInLast );

    ctx.drawImage(upLast, 300, bRows*bHei-70, 125, 70 );
    gameContainer.addEventListener("touchend", reprint );
}