
let welcomImg = document.createElement("img");
welcomImg.src = "../Game/wel/welcome.png";

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
let finalSelfeat = document.createElement("img");
let finalCreditLow = document.createElement("img");
let finalCreditGod = document.createElement("img");
let finalBaoseed = document.createElement("img");
let finalGandi = document.createElement("img");
let finalPass = document.createElement("img");
function loadEndReport() {
    for(let i=0; i<=251; i++)
    {
        let img = document.createElement("img");
        img.setAttribute("src", "../Game/wel/dog/giphy (1)-"+i+".jpg");
        topDogImg.push(img);
    }

    finalSelfeat.src = "../Game/wel/selfeat.png";
    finalCreditLow.src = "../Game/wel/creditlow.png";
    finalCreditGod.src = "../Game/wel/god.png";
    finalBaoseed.src = "../Game/wel/baoseed.png";
    finalGandi.src = "../Game/wel/gandi.png";
    finalPass.src = "../Game/wel/pass.png";
}




