let Foods = [];

//1, 2, 3 ->A
//4, 5 ->B
//6 ->C
function generateFood()
{
    let ret;
    //random type
    let seed = Math.floor( Math.random()*6 ) + 1;
    switch( seed )
    {
        case 1: case 2: case 3:
            ret = new AFood();
            break;
        case 4: case 5:
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
        this.style = "#CC00CC" ;

        this.row = 0;
        this.col = 0;
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
        console.log( Foods.length );
    };
    renderme() {
        ctx.beginPath();
        ctx.arc(bWid * (this.col + 0.5), bHei * (this.row + 0.5), 0.5 * bWid, 0, 2 * Math.PI);
        ctx.fillStyle = this.style;
        ctx.fill();
    }
    addScore() {};
}

class AFood extends Food {
    constructor() {
        super();
        this.cga = 4.0;
        this.style = "#FFCC22";
    }
}

class BFood extends Food {
    constructor() {
        super();
        this.cga = 3.0;
        this.style = "#0066FF";
    }
}

class CFood extends Food {
    constructor() {
        super();
        this.cga = 2.0;
        this.style = "#FF3EFF";
    }
}