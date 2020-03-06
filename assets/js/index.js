"use Strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    checkIngelogdBluven();
    document.querySelector("#letsgo").addEventListener("click", letsgo);
    loadComments();
    document.querySelector("#commenting").addEventListener("submit", postComment);
}

function checkIngelogdBluven() {
    if (localStorage.getItem("ingelogdBluvn")){
        document.querySelector("#haha").classList.add("hidden");
        document.querySelector("body").classList.remove("noscroll");
        document.querySelector("#niemeeringelogdbluvn").addEventListener("click", niemeeringelogdbluvn);
    }
}

function niemeeringelogdbluvn() {
    localStorage.removeItem("ingelogdBluvn");
    location.reload();
}

const cipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);

    return text => text.split('')
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join('');
};

const decipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
    return encoded => encoded.match(/.{1,2}/g)
        .map(hex => parseInt(hex, 16))
        .map(applySaltToChar)
        .map(charCode => String.fromCharCode(charCode))
        .join('');
};

const myCipher = cipher('VlummensIsSuperHot');
const myDecipher = decipher('VlummensIsSuperHot');

function letsgo(e) {
    e.preventDefault();
    let wachtwoord = document.querySelector("#superSterkWachtwoord").value;
    if (wachtwoord === myDecipher("69736a72727a716c")) {
        document.querySelector("#haha").classList.add("hidden");
        document.querySelector("body").classList.remove("noscroll");
        localStorage.setItem("ingelogdBluvn", "True");
    } else {
        window.alert("NOOOOOOOOOOOOOOOOOOOOOOOOOB!!!!");
    }
    document.querySelector("#superSterkWachtwoord").value = "";
    checkIngelogdBluven();
}

function loadComments() {
    fetch("https://sheet.best/api/sheets/52bd4abd-455c-4ddc-96a6-5c355d7a1f73").
    then((response) => {
        return response.json();})
        .then((data) => {
            transformComments(data);
        })
    }

function transformComments(data){
    let html = document.querySelector("#list").innerHTML;
    let lst = "";
 

    for (let i=data.length-1; i>=0; i--){

        lst += `<li class="message">${data[i].naam}: ${data[i].reactie}</li>`


    }

    document.querySelector("#list").innerHTML = lst;
}

function postComment(e){
    e.preventDefault();
    let name = document.querySelector("#naam").value;
    let reactie = document.querySelector("#reactie").value;

    console.log(name[0]);
    if (name[0] !== "<" && reactie[0] !== "<"){
        let data = {
            "naam": name,
            "reactie": reactie
        };
    
    
        fetch("https://sheet.best/api/sheets/52bd4abd-455c-4ddc-96a6-5c355d7a1f73", {method: 'POST',   headers: {
            'Content-Type': 'application/json',
          }, body: JSON.stringify(data)})
          .then(loadComments());
    }


}