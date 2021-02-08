let hahaInter, readyInter;
let cover_end = false;
//let Desmond;
let hintsUp = [], hintsDown = [], num_hints;
num_hints = 12;
hintsUp.push("Hall7 的小夥伴"); hintsDown.push("認得我嗎？");
hintsUp.push("Hall7 的小夥伴"); hintsDown.push("認得我嗎？");
hintsUp.push("想解鎖隱藏結局？"); hintsDown.push("嘗試在爆4前提下獲得最多學分");
hintsUp.push("想解鎖隱藏結局？"); hintsDown.push("嘗試在爆4前提下獲得最多學分");
hintsUp.push("滑動操作的手勢"); hintsDown.push("只有在擡起手後才會生效");
hintsUp.push("如果不在乎cga"); hintsDown.push("會有怎樣的結局呢？");
hintsUp.push("如果不在乎cga"); hintsDown.push("會有怎樣的結局呢？");
hintsUp.push("只為了爆4選課？"); hintsDown.push("這樣可能無法畢業");
hintsUp.push("只為了爆4選課？"); hintsDown.push("這樣可能無法畢業");
hintsUp.push("遊戲一旦開始"); hintsDown.push("頁面滑動將會禁用");
hintsUp.push("成為民藝坊的會員"); hintsDown.push("總能得到意想不到的福利！");
hintsUp.push("不要錯過A++"); hintsDown.push("因為教這門可的Prof真的很贊");

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

        moved = true;
        if( x1-x0 < 0 ) command_center.num++;
        else command_center.num--;

        if( command_center.num > 4 ) command_center.num = 4;
        if( command_center.num < -1 ) command_center.num = -1;

        console.log(command_center.num);
        if( command_center.num === -1 || command_center.num === 4 ) readyGame();
        else {
            ctx.clearRect(0,0, canvas.getAttribute("width"), canvas.getAttribute("height") );
            let i = command_center.num;
            ctx.drawImage(wel_up_img[i], 0, 0, bWid*bCols, bHei*bRows);
            ctx.drawImage(wel_down_img[i], 0, bHei*bRows, bWid*bCols, 300);
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
    gameContainer.removeEventListener("touchstart", helperx);

    gameContainer.removeEventListener("touchend", helpery);

    ctx.fillStyle = "#E9E9E9";
    ctx.fillRect(0,0, canvas.getAttribute("width"), canvas.getAttribute("height") );
    ctx.drawImage(readyImg[3], 0, bHei*bRows, bWid*bCols, 300);

    ctx.fillStyle = "black";
    ctx.font = "35px Verdana";
    let ii = Math.floor(Math.random()*num_hints);
    ctx.fillText( hintsUp[ ii ], 100, bRows*bHei+50 );
    ctx.fillText( hintsDown[ ii ], 160, bRows*bHei+100 );

    command_center.ready_count = 0;
    readyInter = setInterval( command_center.renderLight,900);
}

function errPrint() {
    if(moved) return;
    clearInterval( startInterval );
    console.log("hahere");
    ctx.font = "50px Verdana";
    ctx.fillText("我們遇到了一個問題", 100, 800);
    ctx.font = "30px Verdana";
    ctx.fillText("請選擇對自己", 50, 900);
    ctx.fillStyle = "red";
    ctx.fillText("所在區域友好的網站", 240, 900);
    ctx.fillStyle = "black";
    ctx.fillText("進行遊戲", 520, 900);

    ctx.fillText("或者嘗試刷新", 50, 950);

    ctx.drawImage(wel_up_img[0], 0, 0, bWid*bCols, bHei*bRows);
    ctx.drawImage(wel_down_img[0], 0, bHei*bRows, bWid*bCols, 300);
}

let loadingItem = {
    i : -1,
    inter : 0,
    render : function () {
        if( loadingItem.i>=5 ) {
            clearInterval( loadingItem.inter );

            startInterval = setInterval(errPrint, 5000);
            command_center.init();
        }
        else
        {
            ctx.clearRect(0,0, canvas.getAttribute("width"), canvas.getAttribute("height") );
            loadingItem.i += 1;
            ctx.drawImage(preloadImg[loadingItem.i%3], 8, 0, 684, 1200);
        }
    }
}

function loading() {
    loadingItem.inter = setInterval( loadingItem.render, 1000 );
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
    //if( topDog.showing ) return;
    clearInterval(hahaInter);
    clearMainCanvas()
    /*let img = new Image;
    img.onload = function() { ctx.drawImage(img, 0, 0, bCols*bWid, bRows*bHei); }
    img.src = __imgSrc;*/

    if( gaming.endreson === "selfeat" && player.credit<RequiredCredit ) {
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
    else if( player.gpa > 3.9 ) ctx.drawImage(pityImg, 0, 0, bCols*bWid, bRows*bHei);
    else ctx.drawImage(finalPass, 0, 0, bCols*bWid, bRows*bHei);

    if( player.credit >= RequiredCredit ){
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
    }

    //player.renderScore();

    if( player.credit<RequiredCredit ) {
        //console.log( __imgSrc );
        jumpIntervalInLast = setInterval(failure, 3000 );
    }
    else {
        jumpIntervalInLast = setInterval(succeed, 2000 );
    }

}

let topDog = {
    once: true,
    showing : false,
    i : 0,
    inter : 0,
    nextStep : function() {
        //img.onload = function() { ctx.drawImage( img, 0, 0, bCols*bWid, bRows*bHei); }
        ctx.drawImage(topDogImg[topDog.i], 0, 0, bCols*bWid, (bRows)*bHei)

        topDog.i++;
        console.log("at top dog: "+topDog.i)
        if( topDog.i > 251 ) {
            if(!topDog.once) {
                clearInterval( topDog.inter );
                topDog.showing = false;
                hahaInter = setInterval( finalReport, 100);
            }
            else{
                topDog.once = false;
                topDog.i = 1;
            }
        }
    }

}

function congrante() {
    let ran = Math.floor( Math.random()*3 );
    ctx.drawImage(noticeNameImg[ran], 0, bHei*bRows, bWid*bCols, 300);

    ctx.fillStyle="black";
    ctx.font="500 40px Arial";
    ctx.fillText("可在下方更改姓名", 15, bHei*bRows+70 );
    ctx.fillText("制作自己的成績單噢!", 45, bHei*bRows+130 );

    controlPlayerName(false);
    musicTopDog.play();
    topDog.showing = true;
    topDog.inter = setInterval( topDog.nextStep, 20);
    //hahaInter = setInterval( finalReport, 100);
}

let endReportJump;
function endReport() {
    loadEndReport();
    endReportJump = setInterval(releaseEndReport, 1500);
}

function releaseEndReport() {
    clearInterval( endReportJump );
    console.log("At EndReport");

    if( player.credit >= RequiredCredit ) {
        topDog.i = 0;
        congrante();
    }
    else hahaInter = setInterval( finalReport, 100);
}