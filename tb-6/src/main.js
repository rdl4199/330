"use strict";


//document.querySelector("#my-button").onclick = loadTextXHR;

let [babble1, babble2, babble3] = "";


function loadXmlXHR(){
    const url = "data/babble-data.json";
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => {
        console.log(`In onload - HTTP Status Code = ${e.target.status}`);
        const json = JSON.parse(e.target.responseText);

            const keys = Object.keys(json);
            let html = "";
            //for(let k of keys){
            //    const obj = json[k];
            //    html += `<h3>${obj.title = obj.title ? obj.title : "No title Found" }</h3>`;
            //    html += `<ol>${obj["namelist"].map(w => `<li>${w}</li>`).join("")}</ol>`;
            //}
            babble1 = json[keys[0]];
            babble1 = babble1["wordlist"];
            babble2 = json[keys[1]];
            babble2 = babble2["wordlist"];
            babble3 = json[keys[2]];
            babble3 = babble3["wordlist"];

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