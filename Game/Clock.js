////console.log("clock here");
const GamingSpanMin = 2; //min
const GamingSpanSec = 50;//sec

let clock = {
    startTime : new Date(),
    flag1 : false,//color Test

    renderMe_JudgeEnd() {
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.fillText("Time Left:", bWid + 10, bHei * bRows+180 );

        let temp = new Date();
        let leftHour = this.startTime.getHours() - temp.getHours();
        let leftMin = this.startTime.getMinutes() + GamingSpanMin - temp.getMinutes();
        let leftSec = this.startTime.getSeconds() + GamingSpanSec - temp.getSeconds();

        if( leftHour < 0 ) leftMin -= 60;
        if( leftSec < 0 ) {
            leftSec += 60;
            leftMin--;
        }
        else if( leftSec >= 60 ) {
            leftSec -= 60;
            leftMin++;
        }

        if( leftSec === 59 || leftSec === 58 || (leftMin===0 && leftSec<30) ) ctx.fillStyle = "red";
        if(leftMin===0 && leftSec<30 && !reportTime.showing ) reportTime.restart();
        //if( leftMin===0 && leftSec===30 ) this.flag1 = true; ////color Test
        if( leftMin===0 && leftSec===30 ) musicTime.play();
        if( leftMin===0 && leftSec===30 ) {timeWarning = true;}
        if( leftMin===0 && leftSec===15 ) possibilityDrop = true;
        ctx.fillText(   leftMin.toString() + "min " + leftSec.toString() + "sec", bWid * 7+10, bHei * bRows+180 );
        if( leftMin <= 0 && leftSec <= 0 ) gameEnd();
        if( leftMin < 0 ) gameEnd();
        ctx.fillStyle = "black";
    },
    startClock() { this.startTime = new Date(); }
}