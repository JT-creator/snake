function controlPlayerName(arg)
{
    document.getElementById("playerName").hidden = arg;
    document.getElementById("playerName_button").hidden = arg;
    document.getElementById("playerName_label").hidden = arg;
}

function playerNameLength(name) {
    let len = 0;
    for (let i = 0; i < name.length; i++) {
        let a = name.charAt(i);

        if (a.match(/[^\x00-\xff]/ig) != null) len += 2;
        else len += 1;
        }
        return len;
}