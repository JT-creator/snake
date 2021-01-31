let hahaInter;
let cover_end = false;
//let Desmond;

let loadingItem = {
    i : 0,
    inter : 0,
    render : function () {
        if( loadingItem.i>=90 ) { clearInterval( loadingItem.inter ); cover();}
        ctx.clearRect(0,0, canvas.getAttribute("width"), canvas.getAttribute("height") );
        loadingItem.i += 17;
        ctx.font = "30px Comic Sans MS"
        ctx.fillText("loading... "+loadingItem.i.toString()+"%", 100, 400);
        ctx.fillText("This may take up to 10 seconds", 100, 500);
        ctx.fillText("Refresh the page if failed", 100, 600);
    }
}

function loading() {
    loadingItem.inter = setInterval( loadingItem.render, 500 );
}
loading();

function cover() {
    let img1 = new Image;
    img1.onload = function () { ctx.drawImage(img1, 0, 0, bWid*bCols, bHei*bRows); }
    img1.src = "../Game/wel/cover.jpg";

    let img2 = new Image;
    img2.onload = function () { ctx.drawImage(img2, 0, bHei*bRows, bWid*bCols, 300); }
    img2.src = "../Game/wel/cover_bott.jpg";

    gameContainer.addEventListener("touchend", welcome);
    gameContainer.addEventListener("keyup", welcome);
}

function welcome() {
    //ctx.drawImage(img1, 0, 0, bWid*bCols, bHei*bRows);
    if( cover_end ) return;
    cover_end = true;
    let img1 = new Image;
    //img1.setAttribute("src", "../Game/wel/welcome.png");
    img1.onload = function () { ctx.drawImage(img1, 0, 0, bWid*bCols, bHei*bRows); }
    img1.src = "../Game/wel/welcome.jpg";
    //clearInterval(Desmond);
    //ctx.drawImage(welcomImg, 0, 0, bWid*bCols, bHei*bRows);

    let img2 = new Image;
    img2.onload = function () { ctx.drawImage(img2, 0, bHei*bRows, bWid*bCols, 300); }
    img2.src = "../Game/wel/welcome_bott.jpg";
    //ctx.drawImage(welcomImg, 0, bHei*bRows, bWid*bCols, 311);

   /* let img3 = new Image;
    img3.onload = function () { ctx.drawImage(img3, 0, bHei*bRows, 410, 300);}
    img3.src = "../Game/wel/hkust_1.png";

    setInterval( ()=>{
    ctx.font = "30px Arial";
    ctx.fillText( "4.000",115, bHei*bRows+157 );
    ctx.fillText( "123",185, bHei*bRows+200 )}
    , 20);

    let img4 = new Image;
    img4.onload = function () { ctx.drawImage(img4, 410, bHei*bRows, 290, 290);}
    img4.src = "../Game/wel/QR.jpg";*/

    gameContainer.addEventListener("touchend", gameStart);
    gameContainer.addEventListener("keyup", gameStart);
}
//Desmond = setInterval( welcome, 200);

function finalReport() {
    clearInterval(hahaInter);
    clearMainCanvas()
    /*let img = new Image;
    img.onload = function() { ctx.drawImage(img, 0, 0, bCols*bWid, bRows*bHei); }
    img.src = __imgSrc;*/

    if( gaming.endreson === "selfeat" ) {
        if( Math.floor( Math.random() * 2 ) === 0 ) ctx.drawImage(finalSelfeat1, 0, 0, bCols*bWid, bRows*bHei);
        else ctx.drawImage(finalSelfeat2, 0, 0, bCols*bWid, bRows*bHei);
    }
    else if( player.credit < RequiredCredit ) ctx.drawImage(finalCreditLow, 0, 0, bCols*bWid, bRows*bHei);
    else if( player.credit > 1.12*RequiredCredit && player.gpa >= 4.0 ) ctx.drawImage(finalCreditGod, 0, 0, bCols*bWid, bRows*bHei);
    else if( player.gpa >= 4.0 ) {
        if( Math.floor( Math.random() * 2 ) === 0 ) ctx.drawImage(finalBaoseed1, 0, 0, bCols*bWid, bRows*bHei);
        else ctx.drawImage(finalBaoseed2, 0, 0, bCols*bWid, bRows*bHei);
    }
    else if( player.credit > 1.2 * RequiredCredit ) ctx.drawImage(finalGandi, 0, 0, bCols*bWid, bRows*bHei);
    else ctx.drawImage(finalPass, 0, 0, bCols*bWid, bRows*bHei);

    if( player.credit >= RequiredCredit && gaming.endreson!=="selfeat" ){
        ctx.drawImage(certificateImg, 0, bHei*bRows, 410, 300);

        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.fillText( player.gpa.toFixed(3).toString(),115, bHei*bRows+157);
        ctx.fillText( player.credit.toString(),185, bHei*bRows+200 )

        ctx.drawImage(QRImg, 410, bHei*bRows, 290, 290);
    }
    else {
        if(gaming.endreson==="selfeat") ctx.drawImage(badImg, 0, bHei*bRows, 410, 300);
        else ctx.drawImage(creditLow_barImg, 0, bHei*bRows, 410, 300);
        ctx.drawImage(QRImg, 410, bHei*bRows, 290, 290);

        ctx.font="60px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.fillText("點擊屏幕復讀", 250, bRows*bHei-20 );
    }

    //player.renderScore();

    if( gaming.endreson === "selfeat" || player.credit<RequiredCredit ) {
        //console.log( __imgSrc );
        gameContainer.addEventListener("touchend", () => { window.location.href = window.location.href;} );
    }

}

let topDog = {
    showing : false,
    i : 0,
    inter : 0,
    nextStep : function() {
        //img.onload = function() { ctx.drawImage( img, 0, 0, bCols*bWid, bRows*bHei); }
        ctx.drawImage(topDogImg[topDog.i], 0, 0, bCols*bWid, (bRows)*bHei)

        topDog.i++;
        console.log("at top dog: "+topDog.i)
        if( topDog.i > 251 ) {
            clearInterval( topDog.inter );
            topDog.showing = false;
            finalReport();
        }
    }

}

function congrante() {
    musicTopDog.play();
    topDog.showing = true;
    topDog.inter = setInterval( topDog.nextStep, 20);
    hahaInter = setInterval( finalReport, 100);
}

let endReportJump;
function endReport() {
    loadEndReport();
    endReportJump = setInterval(releaseEndReport, 1500);
}

function releaseEndReport() {
    clearInterval( endReportJump );
    console.log("At EndReport");

    if( player.credit >= RequiredCredit && gaming.endreson!=="selfeat" ) {
        topDog.i = 0;
        congrante();
    }
    else hahaInter = setInterval( finalReport, 100);
}