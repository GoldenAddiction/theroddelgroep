document.addEventListener("DOMContentLoaded",init);


function init(){
    //loadInDivs();
    setInterval(function(){changeOceanManLyrics()}, 3000);
}

function loadInDivs(){
    let cont = document.querySelector("#container");
    let html = "";

    for ( let i = 0; i < 43; i++){

        if (i%3 === 0){
            html+= "<div class='div1'>div 1</div>"
        }
        else if (i%5 === 0){
            html+= "<div class='div2'>div 1</div>"
        }
        else if (i%10 === 0){
            html+= "<div class='div3'>div 1</div>"
        }
        else {
            html+= "<div class='div4'>div 1</div>"
        }


    }

    cont.innerHTML = html;
}

let lyricCount = 0;
function changeOceanManLyrics() {
    let p = document.querySelector("#oceanMan");
    if (lyricCount >= oceanManlyrics.length){
        lyricCount = 0;
    }
    console.log(lyricCount);
    p.innerText = oceanManlyrics[lyricCount];
    lyricCount = lyricCount + 1;
}