document.addEventListener("DOMContentLoaded", init);

let sweaters = ["mvr", "mvr-1", "mvr-paars", "mvr-rood", "mvr-cyaan", "mvr-geel", "mvr-gravel", "mvr-groen"];
function init(){
    startLoop()
}

function startLoop(){
    let timerId = setInterval(() => {
        let index =  Math.floor(Math.random() * 8);
        let flipmvr = "";
        if (index%3 == 1){
            flipmvr = "flip-horizontally"
        }
        document.querySelector("img").src = `../images/stef/sweaters/${sweaters[index]}.png`
        document.querySelector("img").className = flipmvr},500);
}