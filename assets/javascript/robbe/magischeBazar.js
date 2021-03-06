/*!
 * Emoji Cursor.js
 * - 90's cursors collection
 * -- https://github.com/tholman/90s-cursor-effects
 * -- http://codepen.io/tholman/full/rxJpdQ
 */

document.addEventListener("DOMContentLoaded", init);

function init(){
    setInterval(function(){changeStradalePicture()}, 10000);
}

let possibleEmoji = ["💩", "🤣", "👊🏼"];


(function emojiCursor() {


    var width = window.innerWidth;
    var height = window.innerHeight;
    var cursor = {x: width / 2, y: width / 2};
    var particles = [];

    function init() {
        bindEvents();
        loop();
    }

    // Bind events that are needed
    function bindEvents() {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchstart', onTouchMove);

        window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize(e) {
        width = window.innerWidth;
        height = window.innerHeight;
    }

    function onTouchMove(e) {
        if (e.touches.length > 0) {
            for (var i = 0; i < e.touches.length; i++) {
                addParticle(e.touches[i].clientX, e.touches[i].clientY, possibleEmoji[Math.floor(Math.random() * possibleEmoji.length)]);
            }
        }
    }

    function onMouseMove(e) {
        cursor.x = e.clientX;
        cursor.y = e.clientY;

        addParticle(cursor.x, cursor.y, possibleEmoji[Math.floor(Math.random() * possibleEmoji.length)]);
    }

    function addParticle(x, y, character) {
        var particle = new Particle();
        particle.init(x, y, character);
        particles.push(particle);
    }

    function updateParticles() {

        // Updated
        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
        }

        // Remove dead particles
        for (var i = particles.length - 1; i >= 0; i--) {
            if (particles[i].lifeSpan < 0) {
                particles[i].die();
                particles.splice(i, 1);
            }
        }

    }

    function loop() {
        requestAnimationFrame(loop);
        updateParticles();
    }

    /**
     * Particles
     */

    function Particle() {

        this.lifeSpan = 120; //ms
        this.initialStyles = {
            "position": "fixed",
            "top": "0",
            "display": "block",
            "pointerEvents": "none",
            "z-index": "10000000",
            "fontSize": "24px",
            "will-change": "transform"
        };

        // Init, and set properties
        this.init = function (x, y, character) {

            this.velocity = {
                x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
                y: 1
            };

            this.position = {x: x - 10, y: y - 20};

            this.element = document.createElement('span');
            this.element.innerHTML = character;
            applyProperties(this.element, this.initialStyles);
            this.update();

            document.body.appendChild(this.element);
        };

        this.update = function () {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.lifeSpan--;

            this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + (this.lifeSpan / 120) + ")";
        }

        this.die = function () {
            this.element.parentNode.removeChild(this.element);
        }
    }

    /**
     * Utils
     */

    // Applies css `properties` to an element.
    function applyProperties(target, properties) {
        for (var key in properties) {
            target.style[key] = properties[key];
        }
    }

    init();
})();


let element = document.querySelector(".doorStart");
element.addEventListener("click", toggleDoor);

function toggleDoor() {

    startSoundDoor();

    window.setTimeout(function () {
        openDoor();
        document.querySelector("#content").classList.remove("hidden");
        document.querySelector("#content").classList.add("fadeIn");

    }, 3000);

    window.setTimeout(function () {
        document.querySelector("#frontDoor").classList.add("hidden");
        document.querySelector("#backDoor").classList.add("hidden");

    }, 7500);

}


function openDoor() {
    element.classList.toggle("doorOpen");
}

function startSoundDoor() {


    let source = "../assets/javascript/robbe/krrrrr.mp3";
    let volume = 100;
    let loop = 1;

    let snd = new Sound(source, volume, loop);
    snd.start();

}







function updateClock(startStamp,startDateTime) {
    let newDate = new Date();
    let newStamp = newDate.getTime();
    var diff = Math.round((newStamp - startStamp) / 1000);
    console.log(newStamp);
    console.log("start:" + startDateTime);

    var d = Math.floor(diff / (24 * 60 * 60));
    /* though I hope she won't be working for consecutive days :) */
    diff = diff - (d * 24 * 60 * 60);
    var h = Math.floor(diff / (60 * 60));
    diff = diff - (h * 60 * 60);
    var m = Math.floor(diff / (60));
    diff = diff - (m * 60);


    document.getElementById("time-elapsed").innerHTML = d + " dagen, " + h + " uren en " + m + " minuten ";
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function changeStradalePicture(){

    let rnd = getRndInteger(1,5);
    let img = document.querySelectorAll(".slideShow");

    img.forEach(function (image) {

        if (!image.classList.contains("hidden")) {
            image.classList.add("hidden");
        }

    });

    console.log("VERANDERD");

    document.querySelector(`#car${rnd}`).classList.remove("hidden");


}

