
let reportCheck = {
    i : 0,
    inter : 0,
    showing : false,
    restart() {
        this.i=0;
        this.showing = true;
        this.inter = setInterval( ()=>{
            if(this.i<31) this.i++;
            else { clearInterval(this.inter); this.showing = false; }
            }, 40 );
    },
    renderMe() {
        if( !this.showing ) return false;
        ctx.drawImage(reportCheckImg[this.i], bCols*bWid - 260, bRows*bHei + 40, 170, 120);
        return true;
    }
}

let reportTime = {
    ele : document.createElement("img"),
    i : 0,
    inter : 0,
    showing : false,

    restart() {
        this.i=0;
        this.showing = true;
        this.inter = setInterval( ()=>{
            if(this.i<40) this.i++;
            else this.i=0;
        }, 40 );
    },
    renderMe() {
        if( !this.showing ) return;
        ctx.drawImage(reportTimeoutImg[this.i], bCols*bWid - 250, bRows*bHei + 30, 150, 150);
    }
}




