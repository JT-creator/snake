
let welcomImg = document.createElement("img");
welcomImg.src = "../Game/wel/welcome.jpg";

let musicTopDog = new Audio("../Game/Audio/TopDog.mp3");
let musicDing = new Audio("../Game/Audio/Ding.mp3");
let musicTime = new Audio("../Game/Audio/Time.mp3");

let thumbImg = document.createElement("img");
thumbImg.setAttribute("src","../Game/f/thumb.jpg");

let headImg = [];//0 up, 1 down, 2 left, 3 right
if(true) {
    let img1 = document.createElement("img");
    img1.setAttribute("src", "../Game/f/dhead_up.jpg");
    headImg.push(img1);
    let img2 = document.createElement("img");
    img2.setAttribute("src", "../Game/f/dhead_down.jpg");
    headImg.push(img2);
    let img3 = document.createElement("img");
    img3.setAttribute("src", "../Game/f/dhead_left.jpg");
    headImg.push(img3);
    let img4 = document.createElement("img");
    img4.setAttribute("src", "../Game/f/dhead_right.jpg");
    headImg.push(img4);
}

let barImg = [];
for(let i = 0; i<=15; i++)
{
    let img = document.createElement("img");
    img.setAttribute("src", "../Game/pbar/dog/barDog-"+ i +".jpg");
    barImg.push(img);
}

let foodImgA = document.createElement("img");
foodImgA.src = "../Game/f/Food6.jpg";
let foodImgB = document.createElement("img");
foodImgB.src = "../Game/f/Food8.jpg";
let foodImgC = document.createElement("img");
foodImgC.src = "../Game/f/Food7.jpg";
let foodImgG = document.createElement("img");
foodImgG.src = "../Game/f/Food4.jpg";
let foodImgGB = document.createElement("img");
foodImgGB.src = "../Game/f/Food4B.jpg";

let reportCheckImg = [];
for(let i=3; i<=34; i++)
{
    let img = document.createElement("img");
    img.setAttribute("src", "../Game/a/frame_"+i+"_delay-0.05s.jpg");
    reportCheckImg.push(img);
}

let reportTimeoutImg = [];
for(let i=0; i<=40; i++)
{
    let img = document.createElement("img");
    img.setAttribute("src", "../Game/b/source-"+i+".jpg");
    reportTimeoutImg.push(img);
}

let certificateImg = document.createElement("img");
certificateImg.src = "../Game/wel/hkust_1.png";
let badImg = document.createElement("img");
badImg.src = "../Game/wel/bad.jpg";
let QRImg = document.createElement("img");
QRImg.src = "../Game/wel/QR.jpg";

let topDogImg = [];
let miniCount = 0;
let finalSelfeat1 = document.createElement("img");
let finalSelfeat2 = document.createElement("img");
let finalCreditLow = document.createElement("img");
let finalCreditGod = document.createElement("img");
let finalBaoseed1 = document.createElement("img");
let finalBaoseed2 = document.createElement("img");
let finalGandi = document.createElement("img");
let finalPass = document.createElement("img");
finalSelfeat1.src = "../Game/wel/selfeat1.jpg";
finalSelfeat2.src = "../Game/wel/selfeat2.jpg";
finalCreditLow.src = "../Game/wel/creditlow.jpg";
finalCreditGod.src = "../Game/wel/god.jpg";
finalBaoseed1.src = "../Game/wel/baoseed1.jpg";
finalBaoseed2.src = "../Game/wel/baoseed2.jpg";
finalGandi.src = "../Game/wel/gandi.jpg";
finalPass.src = "../Game/wel/pass.jpg";
function loadEndReport() {
    for(let i=0; i<=251; i++)
    {
        let img = document.createElement("img");
        img.setAttribute("src", "../Game/wel/dog/giphy (1)-"+i+".jpg");
        topDogImg.push(img);
    }
}

let last_cga = 0;
let reportFood = [];
if(true)
{
    let img1 = document.createElement("img");
    img1.setAttribute("src", "../Game/f/FoodR1.jpg");
    reportFood.push(img1);

    let img2 = document.createElement("img");
    img2.setAttribute("src", "../Game/f/FoodR2.jpg");
    reportFood.push(img2);

    let img3 = document.createElement("img");
    img3.setAttribute("src", "../Game/f/FoodR3.jpg");
    reportFood.push(img3);

    let img4 = document.createElement("img");
    img4.setAttribute("src", "../Game/f/FoodR4.jpg");
    reportFood.push(img4);
}



