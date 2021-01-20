console.log("clock here");
const GamingSpan = 2; //min

let clock = {
    startTime : new Date(),

    renderMe_JudgeEnd() {
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.fillText("Time Left:", bWid * 2, bHei * bRows+180 );

        let temp = new Date();
        let leftMin = this.startTime.getMinutes() + GamingSpan - temp.getMinutes();
        let leftSec = this.startTime.getSeconds() - temp.getSeconds();
        if( leftSec < 0 ) {
            leftSec += 60;
            leftMin--;
        }

        ctx.fillText(   leftMin.toString() + "min " + leftSec.toString() + "sec", bWid * 8, bHei * bRows+180 );
        if( leftMin <= 0 && leftSec <= 0 ) gameEnd();
        if( leftMin < 0 ) gameEnd();
    },
    startClock() { this.startTime = new Date(); }
}