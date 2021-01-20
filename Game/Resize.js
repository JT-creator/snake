resize();

function resize()
{
    const Hwid = document.body.clientWidth;
    const Hhei = document.body.clientHeight;

    let b = Math.min( (0.75 * Hwid) / bRows, (0.75 * Hhei) / bCols );
    console.log((0.75 * Hwid) / bRows, (0.75 * Hhei) / bCols );
    b = Math.floor(b);

    var can = document.getElementById("Canvas_main");
    can.setAttribute("width", b*bCols );
    can.setAttribute("height", b*bRows + 75 );
}


