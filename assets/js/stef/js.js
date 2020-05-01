"use strict";


let guesses = [];

let tries;

const capitals = ['Amsterdam','Parijs','Brussel','Londen','Berlijn','Kopenhagen','Madrid', 'Rome'];


document.addEventListener("DOMContentLoaded", init);

function init() {
    if (!JSON.parse(localStorage.getItem("scoreboard"))){
        localStorage.setItem("scoreboard",JSON.stringify([]));
    };

    loadScoreBoard();

    tries = 0;
    setToMasked();
    if (JSON.parse(localStorage.getItem("items"))){
        generateTileNames(JSON.parse(localStorage.getItem("items")));
    }
    document.querySelector("#menu ul").addEventListener("click", returnList);
    document.querySelector("#board").addEventListener("click", showTile);
}

function returnList(e){
    tries = 0;
    localStorage.setItem("items",JSON.stringify(lists[e.target.id]));
    localStorage.setItem("chosenList",e.target.id);
    setToMasked();
    generateTileNames(JSON.parse(localStorage.getItem("items")));


}

function generateTileNames(listx) {
    let copyList = listx.slice();

    let gen = [];

    let a = document.querySelectorAll("#name");

    for (let i=0; i<a.length; i++){

        if (copyList.length === 0){
            copyList = listx.slice();
        }

        let b = Math.floor(Math.random()*8);
        gen.push(b);
        a[i].innerHTML = copyList.splice(Math.random()*copyList.length, 1);
    }
}

function showTile(e) {



    if (guesses.length === 2){

        return null
    }
    else {
        if (e.target.id === 'name'){
            return null;
        }
    
        else {    
            let a = e.target.id
            e.target.classList.remove("hidden");
            document.querySelector("div"+"#"+a + " " + "div").classList.remove("hidden");
            guesses.push(document.querySelector("div"+"#"+a + " " + "div").innerHTML);
            checkIfPair();
        }
    }


}


function checkIfPair() {
    if (guesses.length === 2) {
        if (guesses[0] == guesses[1]){
            markAsGuessed();            
        }
        else {
            setTimeout(hideTiles,1000);
            tries++;
        }
    }
}   

function markAsGuessed() {
    let a = document.querySelectorAll(".field");

    for (let i=0; i<a.length; i++){
        if (!(a[i].lastElementChild.classList == "hidden")){
            a[i].className = "guessed";
        }
    }
    checkIfWon();
    guesses = [];
}

function hideTiles() {

    let a = document.querySelectorAll(".field");

    for(let i=0; i<a.length; i++){
        if (!(a[i].lastElementChild.classList == "hidden") && !(a[i].className == "guessed")){
            a[i].lastElementChild.classList.add("hidden");
        }
    }
    guesses = [];
}


function checkIfWon() {
    let a = document.querySelectorAll(".field");

    if (a.length === 0){
        document.querySelector("#field6 #name").innerHTML = "Well done!";
        document.querySelector("#field6").className = "black";
        document.querySelector("#field7 #name").innerHTML = tries + " " + "tries";
        document.querySelector("#field7").className = "black";
        document.querySelector("#field10 #name").innerHTML = "Again?";
        document.querySelector("#field10").className = "black";
        document.querySelector("#field11 #name").innerHTML = "Click!";
        document.querySelector("#field11").className = "black";
        document.querySelector("#field11").addEventListener("click", reset);
        writeToScoreBoard();
        }
}

function reset() {
    document.querySelector("#field11").removeEventListener("click", reset);
    init();

}

function setToMasked() {
    let a = document.querySelectorAll(".guessed");
    for (let i=0; i<a.length; i++) {
        a[i].className = "field";
        let id = a[i].id;
        document.querySelector("div#"+ id + " " + "div" ).className = "hidden";
    }

    let b = document.querySelectorAll(".black");
    for (let i=0; i<b.length; i++) {
        b[i].className = "field";
        b[i].lastElementChild.classList == "hidden";
        let id = b[i].id;
        document.querySelector("div#"+ id + " " + "div" ).className = "hidden";
    }
}

function writeToScoreBoard() {
    let listname = localStorage.getItem("chosenList");

    let scoreItem = {
        name: listname,
        score: tries, 
    };
    
    let a = JSON.parse(localStorage.getItem("scoreboard"));

    a.push(scoreItem);

    localStorage.setItem("scoreboard", JSON.stringify(a));

    loadScoreBoard();
}

function loadScoreBoard() {
    let html = "";
    let a = JSON.parse(localStorage.getItem("scoreboard"));

    a.sort(compare);

    let max = a.length;

    if (a.length >= 10) {
        max = 10
    }

    for (let i=0; i<max; i++){
        html += `<li>${a[i].name} ${a[i].score}</li>`
    }

    document.querySelector("#scores").innerHTML = html;
}


function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const itemA = a.score;
    const itemB = b.score;
  
    let comparison = 0;
    if (itemA > itemB) {
      comparison = 1;
    } else if (itemA < itemB) {
      comparison = -1;
    }
    return comparison;
  }
