// Original JavaScript code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header.


document.addEventListener("DOMContentLoaded", init);

function init(){

    new Mazing();
}

function Position(x, y) {
    this.x = x;
    this.y = y;
}

Position.prototype.toString = function() {
    return this.x + ":" + this.y;
};

function Mazing() {
    // bind to HTML elements
    this.mazeContainer = document.getElementById("maze");
    this.mazeOutputDiv = document.getElementById("maze_output");

    this.maze = [];
    this.heroPos = {};
    this.heroHasKey = false;
    this.childMode = false;

    for(i=0; i < this.mazeContainer.children.length; i++) {
        for(j=0; j < this.mazeContainer.children[i].children.length; j++) {
            var el =  this.mazeContainer.children[i].children[j];
            this.maze[new Position(i, j)] = el;
            if(el.classList.contains("entrance")) {
                // place hero at entrance
                this.heroPos = new Position(i, j);
                this.maze[this.heroPos].classList.add("hero");
            }
        }
    }




    // activate control keys
    this.keyPressHandler = this.mazeKeyPressHandler.bind(this);
    document.addEventListener("keydown", this.keyPressHandler, false);
}



Mazing.prototype.heroTakeTreasure = function() {
    this.maze[this.heroPos].classList.remove("nubbin");
    this.heroScore += 10;

};

Mazing.prototype.heroTakeKey = function() {
    this.maze[this.heroPos].classList.remove("key");
    this.heroHasKey = true;
    this.heroScore += 20;

};

Mazing.prototype.gameOver = function(text) {
    // de-activate control keys
    document.removeEventListener("keydown", this.keyPressHandler, false);

    this.mazeContainer.classList.add("finished");
};

Mazing.prototype.heroWins = function() {

    this.maze[this.heroPos].classList.remove("door");
    this.heroScore += 50;
    this.gameOver("you finished !!!");
};

Mazing.prototype.tryMoveHero = function(pos) {
    var nextStep = this.maze[pos].className;

    // before moving
    if(nextStep.match(/sentinel/)) {
        this.heroScore = Math.max(this.heroScore);
        return;
    }
    if(nextStep.match(/wall/)) {
        return;
    }
    if(nextStep.match(/exit/)) {
        if(this.heroHasKey) {
            this.heroWins();
        } else {

            return;
        }
    }

    // move hero one step
    this.maze[this.heroPos].classList.remove("hero");
    this.maze[pos].classList.add("hero");
    this.heroPos = pos;

    // after moving
    if(nextStep.match(/nubbin/)) {
        this.heroTakeTreasure();
        return;
    }
    if(nextStep.match(/key/)) {
        this.heroTakeKey();
        return;
    }
    if(nextStep.match(/exit/)) {
        return;
    }
    if(this.heroScore >= 1) {
        if(!this.childMode) {
            this.heroScore--;
        }
        else {

        }
    }
};

Mazing.prototype.mazeKeyPressHandler = function(e) {
    var tryPos = new Position(this.heroPos.x, this.heroPos.y);
    switch(e.keyCode)
    {
        case 37: // left
            this.mazeContainer.classList.remove("face-right");
            tryPos.y--;
            break;

        case 38: // up
            tryPos.x--;
            break;

        case 39: // right
            this.mazeContainer.classList.add("face-right");
            tryPos.y++;
            break;

        case 40: // down
            tryPos.x++;
            break;

        default:
            return;

    }
    this.tryMoveHero(tryPos);
    e.preventDefault();
};

Mazing.prototype.setChildMode = function() {
    this.childMode = true;
    this.heroScore = 0;

};