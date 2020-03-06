
"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    fetch();
}
function fetch(){
    fetch("https://sheet.best/api/sheets/452611e6-2c2b-45fe-bdfb-f18a3114527c").then(function(response){
        return response.json();
    }).then(function (jason) {
        console.log(json);
    })
}
