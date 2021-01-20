resize();

function resize()
{
    const Hwid = window.screen.width;
    const Hhei = window.screen.height;

    let b = Math.min( (0.75 * Hwid) / bRows, (0.75 * Hhei) / bCols );
    console.log((0.75 * Hwid) / bRows, (0.75 * Hhei) / bCols );
    b = Math.floor(b);

    var can = document.getElementById("Canvas_main");
    can.setAttribute("width", Hwid );
    can.setAttribute("height", b*bRows + 75 );
}


