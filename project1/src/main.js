import './styles.js'
import './stock-card.js'
//Chartmaker object to be used to generate charts
import * as chartMaker from './chart-gen.js';

//Load in IBM by default and tag week radio
window.onload = (e) => {
    document.querySelector("#search-button").onclick = searchButtonClicked
    document.querySelector("#week-radio").checked = true;
    //loadJsonXHR("IBM", "WEEKLY");
};

//global variable for whatever use
let displayTerm = "";
let offset = 0;
let currentURL = "";
let json = "";
// 3
function searchButtonClicked() {
    let term = document.querySelector("#stock-search").value;
    displayTerm = term;

    term = term.trim();

    //IF there isn't a search term let the person know
    if (term.length < 1) {
        return;
    }

    //console.log(url);
    loadData(term);
}
const showStock = swcObj => {
    const swCard = document.createElement("stock-card");
    swCard.dataset.name = swcObj.name ?? "no name found";
    swCard.dataset.high = swcObj.high ?? "-1";
    swCard.dataset.low = swcObj.low ?? "-1";
    document.querySelector(".stock-cards").appendChild(swCard);
};
function loadData(term, fav = 0) {
    console.log("Data Recieved")
    if (fav == 1) {
        loadJsonXHR(term, "WEEKLY", fav);
    }
    else {
        if (document.querySelector("#month-radio").checked) {
            loadJsonXHR(term, "MONTHLY");
        }
        else if (document.querySelector("#week-radio").checked) {
            loadJsonXHR(term, "WEEKLY");
        }
        else if (document.querySelector("#day-radio").checked) {
            loadJsonXHR(term, "DAILY");
        }
        else if (document.querySelector("#intraday-radio").checked) {
            loadJsonXHR(term, "INTRADAY");
        }
    }

}
function loadJsonXHR(symbol, type, fav = 0) {
    let url;
    let json = "";
    let high;
    let low;
    if (type == "INTRADAY") {
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_${type}&symbol=${symbol}&interval=15min&outputsize=full&apikey=B183J50JYZ0L7NSF`;
    }
    else {
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_${type}&symbol=${symbol}&outputsize=full&apikey=B183J50JYZ0L7NSF`;
    }


    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => {
        console.log(`In onload - HTTP Status Code = ${e.target.status}`);

        //For the cards submit the latest date
        //For chart generation it should fill out without knowledge of date
        //Chart is taken out of prototype bc it doesnt fit needs
        json = JSON.parse(e.target.responseText);
        if(!(typeof json['Error Message'] !== undefined))
        {
            return;
        }
        console.log("Data Recieved")
        if (fav == 1) {
            showStock({name: symbol,high: json["Weekly Time Series"]["2022-02-18"]["2. high"], low: json["Weekly Time Series"]["2022-02-18"]["3. low"] });
        }
        else {
            if (document.querySelector("#month-radio").checked) {
                showStock({ name: symbol, high: json['Monthly Time Series']["2022-02-22"]['2. high'], low: json['Monthly Time Series']["2022-02-22"]['3. low'] });
                //chartMaker.makechart(json["Monthly Time Series"], "Monthly");
            }
            else if (document.querySelector("#week-radio").checked) {
                //console.log("Test");
                showStock({ name: symbol, high: json["Weekly Time Series"]["2022-02-18"]["2. high"], low: json["Weekly Time Series"]["2022-02-18"]["3. low"] });
                //chartMaker.makechart(json["Weekly Time Series"], "Weekly");
            }
            else if (document.querySelector("#day-radio").checked) {
                showStock({ name: symbol, high: json['Time Series (Daily)']['2022-02-18']['2. high'], low: json['Time Series (Daily)']['2022-02-18']['3. low'] });
                //chartMaker.makechart(json["Time Series (Daily)"], "Daily");
            }
            else if (document.querySelector("#intraday-radio").checked) {
                //chartMaker.makechart(json["Time Series (15min)"], "Intraday (15 min)");
                showStock({ name: symbol, high: json['Time Series (15min)']['2022-02-18 06:30:00']['2. high'], low: json['Time Series (15min)']['2022-02-18 06:30:00']['3. low'] });
            }
        }
    }
    xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
    xhr.open("GET", url);
    xhr.send();

}
//function 
//Creates the next and previous buttons
function createPagination(results) {
    document.getElementsByClassName("previous")[0].innerHTML = "";
    document.getElementsByClassName("next")[0].innerHTML = "";
    let previous = document.createElement('button');
    let next = document.createElement('button');
    previous.innerHTML = "previous";
    next.innerHTML = "next";
    document.getElementsByClassName("previous")[0].appendChild(previous);
    document.getElementsByClassName("next")[0].appendChild(next);
    document.getElementsByClassName("previous")[0].onclick = prevClick;
    document.getElementsByClassName("next")[0].onclick = nextClick;
}
//Goes to the previous page of offset 10
//Loads all the data in
export { showStock, loadJsonXHR, loadData }