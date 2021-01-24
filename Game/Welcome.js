let __img;
let hahaInter;

function welcome() {
    //ctx.drawImage(img1, 0, 0, bWid*bCols, bHei*bRows);
    //img1.setAttribute("src", "../Game/wel/welcome.png");
    //img1.onload = function () { ctx.drawImage(img1, 0, 0, bWid*bCols, bHei*bRows); }
    //img1.src = "../Game/wel/welcome.png";
    ctx.drawImage(welcomImg, 0, 0, bWid*bCols, bHei*bRows);

    window.addEventListener("touchend", gameStart);
    window.addEventListener("keyup", gameStart);
}

welcome();

function finalReport() {
    clearInterval(hahaInter);
    clearMainCanvas()
    /*let img = new Image;
    img.onload = function() { ctx.drawImage(img, 0, 0, bCols*bWid, bRows*bHei); }
    img.src = __imgSrc;*/
    ctx.drawImage(__img, 0, 0, bCols*bWid, bRows*bHei);

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
        ctx.drawImage(topDogImg[topDog.i], 0, 0, bCols*bWid, (bRows-5)*bHei)

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
    if( gaming.endreson === "selfeat" ) __img = finalSelfeat;
    else if( player.credit < RequiredCredit ) __img = finalCreditLow;
    else if( player.credit > 1.2 && player.gpa > 4.0 ) __img = finalCreditGod;
    else if( player.gpa > 4.0 ) __img = finalBaoseed;
    else if( player.credit > 1.2 * RequiredCredit ) __img = finalGandi;
    else __img = finalPass;

    if( player.credit >= RequiredCredit && gaming.endreson!=="selfeat" ) {
        topDog.i = 0;
        congrante();
    }
    else hahaInter = setInterval( finalReport, 100);
}