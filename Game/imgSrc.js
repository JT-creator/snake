
let welcomImg = document.createElement("img");
welcomImg.src = "../Game/wel/welcome.png";

let musicTopDog = new Audio("../Game/Audio/TopDog.mp3");
let musicDing = new Audio("../Game/Audio/Ding.mp3");
let musicTime = new Audio("../Game/Audio/Time.mp3");

let headImg = [];//0 up, 1 down, 2 left, 3 right
if(true) {
    let img1 = document.createElement("img");
    img1.setAttribute("src", "../Game/f/head_up.jpg");
    headImg.push(img1);
    let img2 = document.createElement("img");
    img2.setAttribute("src", "../Game/f/head_down.jpg");
    headImg.push(img2);
    let img3 = document.createElement("img");
    img3.setAttribute("src", "../Game/f/head_left.jpg");
    headImg.push(img3);
    let img4 = document.createElement("img");
    img4.setAttribute("src", "../Game/f/head_right.jpg");
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

let topDogImg = [];
let miniCount = 0;
let finalSelfeat = document.createElement("img");
let finalCreditLow = document.createElement("img");
let finalCreditGod = document.createElement("img");
let finalBaoseed = document.createElement("img");
let finalGandi = document.createElement("img");
let finalPass = document.createElement("img");
function loadEndReport() {
    finalSelfeat.src = "../Game/wel/selfeat.png";
    finalCreditLow.src = "../Game/wel/creditlow.png";
    finalCreditGod.src = "../Game/wel/god.png";
    finalBaoseed.src = "../Game/wel/baoseed.png";
    finalGandi.src = "../Game/wel/gandi.png";
    finalPass.src = "../Game/wel/pass.png";

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



