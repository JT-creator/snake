
function welcome() {
    let img = document.createElement("img");
    img.setAttribute("src", "../Game/wel/welcome.png")
    ctx.drawImage(img, 0, 0, bWid*bCols, bHei*bRows);
    ctx.drawImage(img, 0, 0, bWid*bCols, bHei*bRows);
    ctx.drawImage(img, 0, 0, bWid*bCols, bHei*bRows);

    window.addEventListener("touchend", gameStart);
    window.addEventListener("keyup", gameStart);
}

welcome();

let __img;
function finalReport() {
    clearMainCanvas()
    ctx.drawImage(__img, 0, 0, bCols*bWid, bRows*bHei);

    player.renderScore();
}

let topDog = {
    showing : false,
    img: 0,
    i : 0,
    inter : 0,
    nextStep : function() {
        topDog.img = document.createElement("img");
        topDog.img.setAttribute("src", "../Game/wel/dog/giphy (1)-"+topDog.i+".jpg");
        ctx.drawImage(topDog.img, 0, 0, bCols*bWid, bRows*bHei);
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
    endReportJump = setInterval(releaseEndReport, 3000);
}

function releaseEndReport() {
    clearInterval( endReportJump );

    console.log("At EndReport");
    __img = document.createElement("img");
    if( gaming.endreson === "selfeat" ) __img.setAttribute("src", "../Game/wel/selfeat.png");
    else if( player.credit < RequiredCredit ) __img.setAttribute("src", "../Game/wel/creditlow.png");
    else if( player.gpa > 4.0 ) __img.setAttribute("src", "../Game/wel/baoseed.png");
    else if( player.credit > 1.2 * RequiredCredit ) __img.setAttribute("src", "../Game/wel/gandi.png");
    else __img.setAttribute("src", "../Game/wel/pass.png");

    if( player.credit >= RequiredCredit && gaming.endreson!=="selfeat" ) {
        topDog.i = 0;
        congrante();
    }
    else finalReport();
}