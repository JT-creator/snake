
let reportCheck = {
    ele : document.createElement("img"),
    i : 0,
    inter : 0,
    showing : false,
    restart() {
        console.log("restart");///////////////
        this.i=3;
        this.showing = true;
        this.inter = setInterval( ()=>{
            if(this.i<34) this.i++;
            else { clearInterval(this.inter); this.showing = false; }
            }, 40 );
    },
    renderMe() {
        if( !this.showing ) return;
        console.log("now");////////////////////
        this.ele.setAttribute("src", "../Game/a/frame_"+this.i+"_delay-0.05s.jpg");
        ctx.drawImage(this.ele, bCols*bWid - 170, bRows*bHei + 50, 150, 105);
    }
}






