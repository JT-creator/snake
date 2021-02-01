let hahaInter, readyInter;
let cover_end = false;
//let Desmond;

function get_touch_x(e) {
    if (window.navigator.msPointerEnabled) return controls.touchEndX = e.pageX;
    else return controls.touchEndX = e.changedTouches[0].clientX;
}

function get_touch_y(e) {
    if (window.navigator.msPointerEnabled) return controls.touchEndY = e.pageY;
    else return controls.touchEndY = e.changedTouches[0].clientY;
}

function helperx(e) {
    command_center.startX = get_touch_x(e);
    command_center.startY = get_touch_y(e);
}
function helpery(e){
    command_center.endX = get_touch_x(e);
    command_center.endY = get_touch_y(e);
    command_center.interpret_command();
}

let command_center = {
    num : 0,
    startX : 0,
    startY : 0,
    endX : 0,
    endY : 0,
    ready_count : 0,

    init : function() {
        let img1 = new Image;
        img1.onload = function () { ctx.drawImage(img1, 0, 0, bWid*bCols, bHei*bRows); }
        img1.src = "../Game/wel/cover0.jpg";

        let img2 = new Image;
        img2.onload = function () { ctx.drawImage(img2, 0, bHei*bRows, bWid*bCols, 300); }
        img2.src = "../Game/wel/cover_bott0.jpg";

        gameContainer.addEventListener("touchstart", helperx );
        gameContainer.addEventListener("touchend", helpery );
    },
    interpret_command : function() {
        let x0=command_center.startX, y0=command_center.startY, x1=command_center.endX, y1=command_center.endY;
        if( Math.abs(y1-y0) > Math.abs(x1-x0) ) return;
        if( Math.abs(x1-x0) < minReactDistForTouch ) return;

        if( x1-x0 > 0 ) command_center.num++;
        else command_center.num--;

        if( command_center.num > 4 ) command_center.num = 4;
        if( command_center.num < -1 ) command_center.num = -1;

        console.log(command_center.num);
        if( command_center.num === -1 || command_center.num === 4 ) readyGame();
        else {
            ctx.clearRect(0,0, canvas.getAttribute("width"), canvas.getAttribute("height") );
            let i = command_center.num;
            ctx.drawImage(wel_up_img[i], 0, 0, bWid*bCols, bHei*bRows);
            ctx.drawImage(wel_down_img[ Math.min(i, 1) ], 0, bHei*bRows, bWid*bCols, 300);
        }
    },

    renderLight : function() {
        ctx.drawImage(readyImg[command_center.ready_count], 0, 0, bWid * bCols, bWid * bCols);
        command_center.ready_count++;
        console.log( "ready_count"+command_center.ready_count );
        if (command_center.ready_count >= 4) {
            gameStart();
            clearInterval(readyInter);
        }
    }
}

function readyGame() {
    let num_hints = 1;
    gameContainer.removeEventListener("touchstart", helperx);

    gameContainer.removeEventListener("touchend", helpery);

    ctx.fillStyle = "#E9E9E9";
    ctx.fillRect(0,0, canvas.getAttribute("width"), canvas.getAttribute("height") );
    let i = Math.floor( Math.random()*num_hints ) + 3;
    ctx.drawImage(readyImg[i], 0, bHei*bRows, bWid*bCols, 300);

    command_center.ready_count = 0;
    readyInter = setInterval( command_center.renderLight,900);
}

let loadingItem = {
    i : 0,
    inter : 0,
    render : function () {
        if( loadingItem.i>=90 ) { clearInterval( loadingItem.inter ); command_center.init();}
        ctx.clearRect(0,0, canvas.getAttribute("width"), canvas.getAttribute("height") );
        loadingItem.i += 7;
        ctx.font = "30px Comic Sans MS"
        ctx.fillText("loading... "+loadingItem.i.toString()+"%", 100, 400);
        ctx.fillText("This may take up to 10 seconds", 100, 500);
        ctx.fillText("Refresh the page if failed", 100, 600);
    }
}

function loading() {
    loadingItem.inter = setInterval( loadingItem.render, 100 );
}
loading();

/*function cover() {
    let img1 = new Image;
    img1.onload = function () { ctx.drawImage(img1, 0, 0, bWid*bCols, bHei*bRows); }
    img1.src = "../Game/wel/cover.jpg";

    let img2 = new Image;
    img2.onload = function () { ctx.drawImage(img2, 0, bHei*bRows, bWid*bCols, 300); }
    img2.src = "../Game/wel/cover_bott.jpg";

    gameContainer.addEventListener("touchend", (e)=>{ console.log(get_touch_x(e), get_touch_y(e)); console.log(canvas.getAttribute("width"));} );
    gameContainer.addEventListener("keyup", welcome);
}

function welcome() {
    //ctx.drawImage(img1, 0, 0, bWid*bCols, bHei*bRows);
    if( cover_end ) return;
    gameContainer.removeEventListener("touchend", welcome);
    gameContainer.removeEventListener("keyup", welcome);

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
    img4.src = "../Game/wel/QR.jpg";*h/

    gameContainer.addEventListener("touchend", gameStart);
    gameContainer.addEventListener("keyup", gameStart);
}*/
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