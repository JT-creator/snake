
let reportCheck = {
    ele : document.createElement("img"),
    i : 0,
    inter : 0,
    showing : false,
    restart() {
        this.i=3;
        this.showing = true;
        this.inter = setInterval( ()=>{
            if(this.i<34) this.i++;
            else { clearInterval(this.inter); this.showing = false; }
            }, 40 );
    },
    renderMe() {
        if( !this.showing ) return false;
        this.ele.setAttribute("src", "../Game/a/frame_"+this.i+"_delay-0.05s.jpg");
        ctx.drawImage(this.ele, bCols*bWid - 250, bRows*bHei + 50, 150, 105);
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
            if(this.i<39) this.i++;
            else this.i=0;
        }, 40 );
    },
    renderMe() {
        if( !this.showing ) return;
        this.ele.setAttribute("src", "../Game/b/source-"+this.i+".jpg");
        ctx.drawImage(this.ele, bCols*bWid - 250, bRows*bHei + 30, 150, 150);
    }
}




