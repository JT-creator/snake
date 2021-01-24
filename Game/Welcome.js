let img1;

function welcome() {
    img1 = new Image;
    //ctx.drawImage(img1, 0, 0, bWid*bCols, bHei*bRows);
    //img1.setAttribute("src", "../Game/wel/welcome.png");
    img1.onload = function () { ctx.drawImage(img1, 0, 0, bWid*bCols, bHei*bRows); }
    img1.src = "../Game/wel/welcome.png";

    window.addEventListener("touchend", gameStart);
    window.addEventListener("keyup", gameStart);
}

welcome();

let __imgSrc;
function finalReport() {
    clearMainCanvas()
    let img = new Image;
    img.onload = function() { ctx.drawImage(img, 0, 0, bCols*bWid, bRows*bHei); }
    img.src = __imgSrc;

    player.renderScore();

    if( gaming.endreson === "selfeat" ) {
        console.log( __imgSrc );
        addEventListener("touchend", () => { window.location.href = window.location.href;} );
    }

}

let topDog = {
    showing : false,
    i : 0,
    inter : 0,
    nextStep : function() {
        let img = new Image;
        img.onload = function() { ctx.drawImage( img, 0, 0, bCols*bWid, bRows*bHei); }
        img.src = "../Game/wel/dog/giphy (1)-"+topDog.i+".jpg";

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
}

let endReportJump;
function endReport() {
    endReportJump = setInterval(releaseEndReport, 1500);
}

function releaseEndReport() {
    clearInterval( endReportJump );

    console.log("At EndReport");
    __img = document.createElement("img");
    if( gaming.endreson === "selfeat" ) __imgSrc = "../Game/wel/selfeat.png";
    else if( player.credit < RequiredCredit ) __imgSrc = "../Game/wel/creditlow.png";
    else if( player.credit > 1.2 && player.gpa > 4.0 ) __imgSrc = "../Game/wel/god.png";
    else if( player.gpa > 4.0 ) __imgSrc = "../Game/wel/baoseed.png";
    else if( player.credit > 1.2 * RequiredCredit ) __imgSrc = "../Game/wel/gandi.png";
    else __imgSrc = "../Game/wel/pass.png";

    if( player.credit >= RequiredCredit && gaming.endreson!=="selfeat" ) {
        topDog.i = 0;
        congrante();
    }
    else finalReport();
}