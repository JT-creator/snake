console.log("clock here");
const GamingSpan = 1; //min

let clock = {
    startTime : new Date(),

    renderMe_JudgeEnd() {
        ctx.font = "15px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.fillText("Time Left:", bWid * 3, bHei * bRows+80 );

        let temp = new Date();
        let leftMin = this.startTime.getMinutes() + GamingSpan - temp.getMinutes();
        let leftSec = this.startTime.getSeconds() - temp.getSeconds();
        if( leftSec < 0 ) {
            leftSec += 60;
            leftMin--;
        }

        ctx.fillText(   leftMin.toString() + "min " + leftSec.toString() + "sec", bWid * 12, bHei * bRows+80 );
        if( leftMin <= 0 && leftSec <= 0 ) gameEnd();
        if( leftMin < 0 ) gameEnd();
    },
    startClock() { this.startTime = new Date(); }
}