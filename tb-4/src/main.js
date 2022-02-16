"use strict";

let [babble1, babble2, babble3] = "";


function loadTextXHR() {
    const url = "./data/babble-data.csv";
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => {
        console.log(`In onload - HTTP Status Code = ${e.target.status}`);
        const text = e.target.responseText;
        console.log(`Success - the file length is ${text.length}`);
        const lines = text.split("\n");
        babble1 = lines[0].split(",");
        babble2 = lines[1].split(",");
        babble3 = lines[2].split(",");

    };
    xhr.onerror = e => console.log(`In onerror -HTTP Status Coe = ${e.target.status}`);
    xhr.open("GET", url);
    xhr.send();
}
loadTextXHR();

const button1 = document.querySelector("#mybutton");
const button5 = document.querySelector("#mybutton2");
button1.onclick = function () {
    generatetechno(1);
}
button5.onclick = function () {
    generatetechno(5);
}


function randomelement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function generatetechno(num) {
    let str = ""
    for (let x = 0; x < num; x++) {
        str += `${randomelement(babble1)} ${randomelement(babble2)} ${randomelement(babble3)}! <br>`;
    }
    document.querySelector("#output").innerHTML = str;
}