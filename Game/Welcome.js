let hahaInter;
let cover_end = false;
//let Desmond;

function cover() {
    let img1 = new Image;
    img1.onload = function () { ctx.drawImage(img1, 0, 0, bWid*bCols, bHei*bRows); }
    img1.src = "../Game/wel/cover.jpg";

    let img2 = new Image;
    img2.onload = function () { ctx.drawImage(img2, 0, bHei*bRows, bWid*bCols, 300); }
    img2.src = "../Game/wel/cover_bott.jpg";

    window.addEventListener("touchend", welcome);
    window.addEventListener("keyup", welcome);
}
cover();

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

    window.addEventListener("touchend", gameStart);
    window.addEventListener("keyup", gameStart);
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

    player.renderScore();

    if( gaming.endreson === "selfeat" || player.credit<RequiredCredit ) {
        //console.log( __imgSrc );
        addEventListener("touchend", () => { window.location.href = window.location.href;} );
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