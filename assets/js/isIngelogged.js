"use Strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    if (!localStorage.getItem("ingelogdBluvn")) {
        location.href ="../index.html";
    }
}
