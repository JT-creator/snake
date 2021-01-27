let Foods = [];

//1, 2 ->A
//3, 4, 5 ->B
//6 ->C
function generateFood()
{
    let ret;
    //random type
    let seed = Math.floor( Math.random()*6 ) + 1;
    switch( seed )
    {
        case 1: case 2:
            ret = new AFood();
            break;
        case 3: case 4: case 5:
            ret = new BFood();
            break;
        case 6:
            ret = new CFood();
            break;
        default:
            console.log("Error: At generateFood()");
    }

    //random position (do not appear on the snake or just in front of snake's head)
    let possiblePos = bRows * bCols - snake.length - Foods.length - 1;
    seed = Math.floor( Math.random() * possiblePos );

    let improperCol = snake.posHeadC, improperRow = snake.posHeadR;
    switch(snake.heading) {
        case "up": improperRow = (improperRow - 1 + bRows) % bRows; break;
        case "down": improperRow = (improperRow + 1) % bRows; break;
        case "left": improperCol = (improperCol - 1 +bCols) % bCols; break;
        case "right": improperCol = (improperCol + 1) % bCols; break;
    }

    let r = 0, c = 0;
    while( graph[r][c] !== 0 && (c !== improperCol || r !== improperRow) ) {
        c++;
        if( c >= bCols ) { r++; c = c % bCols; }
    }

    while( seed > 0 ){
        c++;
        if( c >= bCols ) { r++; c = c % bCols; }
        seed--;

        while( graph[r][c] !== 0 || (c === improperCol && r === improperRow) ) { //unacceptable conditions
            c++;
            if( c >= bCols ) { r++; c = c % bCols; }
        }
    }

    ret.row = r;
    ret.col = c;
    ret.appear();

    return ret;
}


class Food {
    constructor() {
        this.credit = 3;
        this.cga = 3.0;
        this.counting = 0;
        this.source = "changeMe" ;

        this.row = 0;
        this.col = 0;
        this.onFlash = true;
    }

    recordTime() { this.counting += 10; }; //10 times
    checkTime() { if( this.counting >= FoodLastTime ) this.vanish(); };
    appear() {
        graph[ this.row ][ this.col ] = -1;
        Foods.push( this );
    };
    vanish() {
        graph[ this.row ][ this.col ] = 0;

        for(let index = 0; index < Foods.length; index++ )//findIndex
            if( this.row===Foods[index].row && this.col===Foods[index].col ) {
                Foods.splice( index, 1);
                break;
            }
        //console.log( Foods.length );
    };
    renderme() {
        if( this.credit === 4 ) { this.specialRender(); return; }
        /*ctx.beginPath();
        ctx.arc(bWid * (this.col + 0.5), bHei * (this.row + 0.5), 0.5 * bWid, 0, 2 * Math.PI);
        ctx.fillStyle = this.style;*/
        //foodImg.setAttribute("src", this.source );

        if( FoodLastTime - this.counting <= FoodFlashingTime ) {
            if( this.onFlash === false ) { ctx.drawImage(this.source, bWid * this.col, bHei * this.row, bWid, bHei ); this.onFlash = true; }
            else this.onFlash = false;
        }
        else ctx.drawImage(this.source, bWid * this.col, bHei * this.row, bWid, bHei );
    }
    addScore() {
        miniCount = 0;
        last_cga = this.cga;
        player.credit += this.credit;
        player.total_cga += this.cga * this.credit;
        if( player.credit ) player.gpa = player.total_cga/player.credit;
    };
}

class AFood extends Food {
    constructor() {
        super();
        this.cga = 4.0;
        this.source = foodImgA;
    }
}

class BFood extends Food {
    constructor() {
        super();
        this.cga = 3.0;
        this.source = foodImgB;
    }
}

class CFood extends Food {
    constructor() {
        super();
        this.cga = 2.0;
        this.source = foodImgC;
    }
}

class GreatFood extends Food {
    constructor(row, col) {
        super();
        this.cga = 4.3;
        this.credit = 4;
        this.source = foodImgG;
        this.row = row;
        this.col = col;
    }

    static generate() {
        let temp = generateFood();
        let row = temp.row;
        let col = temp.col;
        temp.vanish();

        let ret = new GreatFood(row, col);
        ret.appear();
    }

    specialRender() {
        //ctx.lineWidth = 1;
        //ctx.beginPath();
        //ctx.arc(bWid * (this.col + 0.5), bHei * (this.row + 0.5), 0, 0, 2 * Math.PI);
        //ctx.stroke();

        //foodImg.setAttribute("src", this.source );
        ctx.drawImage(this.source, (this.col-1)*bWid, (this.row-1)*bHei, bWid*3, bHei*3 );

        ctx.moveTo(bWid + 10,bHei * bRows+220);
        ctx.lineTo(bWid + 10 + (FoodLastTime - this.counting)/FoodLastTime * 12*bWid, bHei * bRows+220 );
        ctx.strokeStyle = "#FBCC21";
        ctx.lineWidth = 20;

        ctx.stroke();
        ctx.lineWidth = 2;
    }
}