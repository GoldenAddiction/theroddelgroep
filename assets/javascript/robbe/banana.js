"use strict";

document.addEventListener("DOMContentLoaded", init);



function init() {

    if (!localStorage.getItem("minions")) {
        localStorage.setItem("minions", JSON.stringify(0));
        document.querySelector("#totalMinions").innerHTML = 0;
    }
    else {
        let span = document.querySelector("#totalMinions");
        span.innerText = JSON.parse(localStorage.getItem("minions"));
    }

    if (!localStorage.getItem("banana")) {
        localStorage.setItem("banana", JSON.stringify(0));
        document.querySelector("#totalBananas").innerHTML = 0;
    }
    else {
        let span = document.querySelector("#totalBananas");
        span.innerText = JSON.parse(localStorage.getItem("bananas"));
    }

    setInterval(function () {changeBanana()},10000);
    document.querySelector("#target").addEventListener('click', minFuncts);



}

function minFuncts() {
    addMinion();

}

function addMinion() {
    let totalMinions = JSON.parse(localStorage.getItem("minions"));
    let span = document.querySelector("#totalMinions");
    totalMinions = totalMinions + 1;
    localStorage.setItem("minions", JSON.stringify(totalMinions));
    span.innerText = totalMinions;
}

function addBanana(){
    startBananaSound();
    let totalBananas = JSON.parse(localStorage.getItem("bananas"));
    let span = document.querySelector("#totalBananas");
    totalBananas = totalBananas + 1;
    localStorage.setItem("bananas", JSON.stringify(totalBananas));
    span.innerText = totalBananas;

    let ban = document.querySelectorAll(".banana");

    ban.forEach(function (image) {

        if (!image.classList.contains("hidden")) {
            image.classList.add("hidden");
        }

    });
}

function changeBanana(){

    let rnd = getRndInteger(1,5);
    let ban = document.querySelectorAll(".banana");

    ban.forEach(function (image) {

        if (!image.classList.contains("hidden")) {
            image.classList.add("hidden");
        }

    });

    document.querySelector(`#b${rnd}`).classList.remove("hidden");
    document.querySelector(`#b${rnd}`).addEventListener('click',addBanana)

}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function startBananaSound() {
    let source = "../assets/javascript/robbe/sound.mp3";
    let volume = 100;
    let loop = 500;

    let snd = new Sound(source, volume, loop);
    snd.start();

}


function Sound(source, volume, loop)
{
    this.source = source;
    this.volume = volume;
    this.loop = loop;
    let son;
    this.son = son;
    this.finish = false;
    this.stop = function()
    {
        document.body.removeChild(this.son);
    };
    this.start = function()
    {
        if (this.finish) return false;
        this.son = document.createElement("embed");
        this.son.setAttribute("src", this.source);
        this.son.setAttribute("hidden", "true");
        this.son.setAttribute("volume", this.volume);
        this.son.setAttribute("autostart", "true");
        this.son.setAttribute("loop", this.loop);
        document.body.appendChild(this.son);
    };
    this.remove = function()
    {
        document.body.removeChild(this.son);
        this.finish = true;
    };
    this.init = function(volume, loop)
    {
        this.finish = false;
        this.volume = volume;
        this.loop = loop;
    }
}
