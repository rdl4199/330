"use strict";

let [babble1, babble2, babble3] = "";


function loadXmlXHR(){
    const url = "data/babble-data.xml";
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => {
        console.log(`In onload - HTTP Status Code = ${e.target.status}`);
        const xml = e.target.responseXML;
        if(!xml){
            document.querySelector("#output").innerHTML = "xml is null!";
            return;
        }
        babble1 = xml.querySelector("namelist[cid='words1']").textContent.split(",");
        babble2 = xml.querySelector("namelist[cid='words2']").textContent.split(",");
        babble3 = xml.querySelector("namelist[cid='words3']").textContent.split(",");

    };
    xhr.onerror = e => console.log(`In onerror -HTTP Status Coe = ${e.target.status}`);
    xhr.open("GET",url);
    xhr.send();
}
loadXmlXHR();

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