
"use strict";

document.addEventListener("DOMContentLoaded", init);




function init() {

    let startDateTime = new Date(2017, 5, 3, 17, 56); // YYYY (M-1) D H m s ms (start time and date from DB)
    let startStamp = startDateTime.getTime();
    setInterval(updateClock(startDateTime,startStamp), 60000);

}




function startSoundLeMonke(){


    let source = "../assets/javascript/robbe/stinky.mp3";
    let volume = 100;
    let loop = 1;

    let snd =  new Sound(source,volume,loop);
    snd.start();

}

function startSoundAlarm(){
    let source = "../assets/javascript/robbe/danger-alarm-sound-effect.mp3";
    let volume = 100;
    let loop = 2;

    let snd =  new Sound(source,volume,loop);
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



    // Get the modal
    var modal = document.getElementById("myModal");

// Get the button that opens the modal
    var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
        startSoundAlarm();
    };

// When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

