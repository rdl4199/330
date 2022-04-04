import './styles.js'
import './chart-gen.js'
import './stock-card.js'
import './nav-gen.js'
import './fav-gen.js'
import './footer-gen.js'
import * as firebase from "./firebase.js"
import * as favorites from "./favorites.js"

//Load in IBM by default and tag week radio
window.onload = (e) => {

    let category = "Home";
    if (window.location.href.match('app.html')) {
        category = "App";
        document.querySelector("#search-button").onclick = searchButtonClicked;
        document.querySelector("#stock-search").value = localStorage.getItem("CurrentText");
        const currentTime = localStorage.getItem("CurrentTime");
        loadData(localStorage.getItem("CurrentText"));
        let month = document.querySelector("#monthly");
        let week = document.querySelector("#weekly");
        let day = document.querySelector("#daily");
        let intra = document.querySelector("#intraday");
        month.className = "";
        week.className = "";
        day.className = "";
        intra.className = "";
        if(currentTime == "Month")
        {
            month.className = "is-active";
        }
        else if(currentTime == "Week")
        {
            week.className = "is-active";
        }
        else if(currentTime == "Day")
        {
            day.className = "is-active";
        }
        else if(currentTime == "Intra")
        {
            intra.className = "is-active";
        }
        else 
        {
            month.className = "is-active";
        }
        month.onclick = () => {
            month.className = "is-active";
            week.className = "";
            day.className = "";
            intra.className = "";

        }
        week.onclick = () => {
            month.className = "";
            week.className = "is-active";
            day.className = "";
            intra.className = "";
        }
        day.onclick = () => {
            month.className = "";
            week.className = "";
            day.className = "is-active";
            intra.className = "";
        }
        intra.onclick = () => {
            month.className = "";
            week.className = "";
            day.className = "";
            intra.className = "is-active";
        }
    }
    if (window.location.href.match('community.html')) {
        category = "Community";
        firebase.init();
    }
    if (window.location.href.match('home.html')) {
        category = "Home";
    }
    if (window.location.href.match('favorites.html')) {
        favorites.initFavorites();
        category = "Favorites";

    }
    if (window.location.href.match('documentation.html')) {
        category = "Documentation";
    }
    showNav({ category: category });
    showFoot({ category: category });

};

//global variable for whatever use
let displayTerm = "";
let offset = 0;
let currentURL = "";
let json = "";
// 3
function searchButtonClicked() {
    //Save the current 
    let term = document.querySelector("#stock-search").value.toUpperCase();
    displayTerm = term;
    document.querySelector("#search-button").className = "button is-link is-loading"
    term = term.trim();
    localStorage.setItem("CurrentText", term);
    if (document.querySelector("#monthly").className == "is-active") {
        localStorage.setItem("CurrentTime", "Month");
    }
    else if (document.querySelector("#weekly").className == "is-active") {
        localStorage.setItem("CurrentTime", "Week");
    }
    else if (document.querySelector("#daily").className == "is-active") {
        localStorage.setItem("CurrentTime", "Day");
    }
    else if (document.querySelector("#intraday").className == "is-active") {
        localStorage.setItem("CurrentTime", "Intra");
    }
    //IF there isn't a search term let the person know
    if (term.length < 1) {
        return;
    }

    //console.log(url);
    loadData(term);
}
//Stock card for favorites/Community
const showStock = swcObj => {
    const swCard = document.createElement("stock-line");
    swCard.dataset.name = swcObj.name ?? "no name found";
    swCard.dataset.value = swcObj.value ?? "-1";
    swCard.dataset.range = swcObj.range ?? "-1";
    swCard.dataset.volume = swcObj.volume ?? "-1";
    swCard.dataset.likes = swcObj.likes ?? "-1";
    document.querySelector(".stock-cards").appendChild(swCard);
};
const showNav = navObj => {
    const swCard = document.createElement("nav-comp");
    swCard.dataset.category = navObj.category ?? "Home";
    document.querySelector("#bulma-nav").appendChild(swCard);
};
const showFoot = footObj => {
    const swCard = document.createElement("foot-comp");
    swCard.dataset.category = footObj.category ?? "Home";
    document.querySelector("#bulma-foot").appendChild(swCard);
};

const showChart = (data, metadata, interval) => {
    let timestamp = [];
    let visualtimeStamp;
    let values = [];
    for (let d of Object.keys(data)) {
        timestamp.push(d);
    }
    for (let x = 0; x < timestamp.length; x++) {
        values[x] = data[timestamp[x]]["1. open"];
    }
    visualtimeStamp = timestamp.slice().reverse();
    values.reverse();
    let rangeLow = 999999999;
    let rangeHigh = 0;
    let average = 0;

    //Running Calculations to give the proper data depending on the data
    if (interval == "MONTHLY") {
        for (let x = 0; x < 12; x++) {
            average += parseFloat(data[timestamp[x]]["5. volume"]);
            if (rangeHigh < parseFloat(values[x])) {
                rangeHigh = parseFloat(values[x]);
            }
            if (rangeLow > parseFloat(values[x])) {
                rangeLow = parseFloat(values[x]);
            }
        }
        average /= 12;
    }
    if (interval == "WEEKLY") {
        for (let x = 0; x < 52; x++) {
            average = parseFloat(data[timestamp[x]]["5. volume"]);
            if (rangeHigh < parseFloat(values[x])) {
                rangeHigh = parseFloat(values[x]);
            }
            if (rangeLow > parseFloat(values[x])) {
                rangeLow = parseFloat(values[x]);
            }
        }
        average /= 52;
    }
    if (interval == "DAILY") {
        for (let x = 0; x < 365; x++) {
            average = parseFloat(data[timestamp[x]]["5. volume"]);
            if (rangeHigh < parseFloat(values[x])) {
                rangeHigh = parseFloat(values[x]);
            }
            if (rangeLow > parseFloat(values[x])) {
                rangeLow = parseFloat(values[x]);
            }
        }
        average /= 365
    }
    if (interval == "INTRADAY") {
        for (let x = 0; x < 365; x++) {
            average = parseFloat(data[timestamp[x]]["5. volume"]);
            if (rangeHigh < parseFloat(values[x])) {
                rangeHigh = parseFloat(values[x]);
            }
            if (rangeLow > parseFloat(values[x])) {
                rangeLow = parseFloat(values[x]);
            }
        }
        average /= 365
    }

    showChartHelper({
        name: metadata['2. Symbol'], value: parseFloat(data[timestamp[0]]['1. open']).toFixed(2), pclose: parseFloat(data[timestamp[1]]['4. close']).toFixed(2), open: parseFloat(data[timestamp[0]]['1. open']).toFixed(2),
        volume: parseFloat(data[timestamp[0]]['5. volume']).toFixed(2), lastrange: `${parseFloat(data[timestamp[1]]['2. high']).toFixed(2)} - ${parseFloat(data[timestamp[1]]['3. low']).toFixed(2)}`, 
        yearrange: `${parseFloat(rangeHigh).toFixed(2)} - ${parseFloat(rangeLow).toFixed(2)}`, average: parseFloat(average).toFixed(2), values: values, timestamp: visualtimeStamp
    });

}
//Uses the object to append the object to the end of the file
const showChartHelper = chObj => {
    const chtCard = document.createElement("chart-card");
    chtCard.dataset.name = chObj.name ?? "Null";
    chtCard.dataset.value = chObj.value ?? "-1";
    chtCard.dataset.pclose = chObj.pclose ?? "-1";
    chtCard.dataset.open = chObj.open ?? "-1";
    chtCard.dataset.volume = chObj.volume ?? "-1";
    chtCard.dataset.lastrange = chObj.lastrange ?? "-1";
    chtCard.dataset.yearrange = chObj.yearrange ?? "-1";
    chtCard.dataset.average = chObj.average ?? "-1";
    chtCard.dataset.values = chObj.values ?? "-1";
    chtCard.dataset.timestamp = chObj.timestamp ?? "-1";
    document.querySelector("#stock-image").appendChild(chtCard);
}
function loadData(term, fav = 0) {
    console.log("Data Recieved")
    if (fav == 1) {
        loadJsonFetch(term, "WEEKLY", fav);
    }
    else {
        if (document.querySelector("#monthly").className == "is-active") {
            loadJsonFetch(term, "MONTHLY");
        }
        else if (document.querySelector("#weekly").className == "is-active") {
            loadJsonFetch(term, "WEEKLY");
        }
        else if (document.querySelector("#daily").className == "is-active") {
            loadJsonFetch(term, "DAILY");
        }
        else if (document.querySelector("#intraday").className == "is-active") {
            loadJsonFetch(term, "INTRADAY");
        }
    }

}
async function loadJsonFetch(symbol, type, fav = 0) {
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

    fetch(url)
        .then(response => {
            if (response.ok) {
                document.querySelector("#search-button").className = "button is-link"
                return response.json();
            }
            return response.text().then(text => {
                document.querySelector("#search-button").className = "button is-link"
                throw text;
            });
        })
        .then(json => {
            //For the cards submit the latest date
            //For chart generation it should fill out without knowledge of date
            //Chart is taken out of prototype bc it doesnt fit needs
            if (!(typeof json['Error Message'] !== undefined) || Object.keys(json).length == 1) {
                document.querySelector("#error").innerHTML = "Invalid Stock Symbol";
                document.querySelector("#search-button").className = "button is-link"
                return;
            }
            document.querySelector("#error").innerHTML = "";
            console.log("Data Recieved")
            if (fav == 1) {
                showChart(json["Weekly Time Series"], json['Meta Data'], "WEEKLY");
            }
            else {
                if (type == "MONTHLY") {
                    showChart(json["Monthly Time Series"], json['Meta Data'], "MONTHLY");
                }
                else if (type == "WEEKLY") {
                    showChart(json["Weekly Time Series"], json['Meta Data'], "WEEKLY");
                }
                else if (type == "DAILY") {
                    showChart(json["Time Series (Daily)"], json['Meta Data'], "DAILY");
                }
                else if (type == "INTRADAY") {
                    showChart(json["Time Series (15min)"], json['Meta Data'], "INTRADAY");
                }
            }
        });


}
export { showStock, loadJsonFetch, loadData }