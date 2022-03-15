import './styles.js'
import './chart-gen.js'
import './stock-card.js'
import './nav-gen.js'
import './footer-gen.js'

//Load in IBM by default and tag week radio
window.onload = (e) => {
    
    let category = "Home";
    if(window.location.href.match('app.html'))
    {
        category = "App";
        document.querySelector("#search-button").onclick = searchButtonClicked;
    }
    if(window.location.href.match('Community.html'))
    {
        category = "Community";
    }
    if(window.location.href.match('home.html'))
    {
        category = "Home";
    }
    if(window.location.href.match('favorites.html'))
    {
        category = "Favorites";
    }
    if(window.location.href.match('documentation.html'))
    {
        category = "Documentation";
    }
    showNav({category: category});
    showFoot({category: category});
    let month = document.querySelector("#monthly");
    let week = document.querySelector("#weekly");
    let day = document.querySelector("#daily");
    let intra = document.querySelector("#intraday");
    document.querySelector("#weekly").class = "is-active";
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
};

//global variable for whatever use
let displayTerm = "";
let offset = 0;
let currentURL = "";
let json = "";
// 3
function searchButtonClicked() {
    //Save the current 
    let term = document.querySelector("#stock-search").value;
    displayTerm = term;
    document.querySelector("#search-button").className = "button is-link is-loading"
    term = term.trim();

    //IF there isn't a search term let the person know
    if (term.length < 1) {
        return;
    }

    //console.log(url);
    loadData(term);
}
//Stock card for favorites/Community
const showStock = swcObj => {
    const swCard = document.createElement("stock-card");
    swCard.dataset.name = swcObj.name ?? "no name found";
    swCard.dataset.high = swcObj.high ?? "-1";
    swCard.dataset.low = swcObj.low ?? "-1";
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
//
const showChart = (data, metadata, interval) => {
    let timestamp = [];
    let values = [];
    for (let d of Object.keys(data)) {
        timestamp.push(d);
    }
    for (let x = 0; x < timestamp.length; x++) {
        values[x] = data[timestamp[x]]["1. open"];
    }
    timestamp.reverse();
    values.reverse();
    let rangeLow = 0;
    let rangeHigh = 0;
    let average = 0;
    let currentData;
    if (interval == "MONTHLY") {
        for (let x = 0; x < 12; x++) {
            average += parseInt(values[x]);
            if (rangeHigh < parseInt(values[x])) {
                rangeHigh = parseInt(values[x]);
            }
            if (rangeLow > parseInt(values[x])) {
                rangeLow = parseInt(value[x]);
            }
        }
        average /= 12;
    }
    if (interval == "WEEKLY") {
        for (let x = 0; x < 52; x++) {
            average = parseInt(values[x]);
            if (rangeHigh < parseInt(values[x])) {
                rangeHigh = parseInt(values[x]);
            }
            if (rangeLow > parseInt(values[x])) {
                rangeLow = parseInt(value[x]);
            }
        }
        average /= 52;

    }
    if (interval == "DAILY") {
        for (let x = 0; x < 365; x++) {
            average = parseInt(values[x]);
            if (rangeHigh < parseInt(values[x])) {
                rangeHigh = parseInt(values[x]);
            }
            if (rangeLow > parseInt(values[x])) {
                rangeLow = parseInt(value[x]);
            }
        }
        average /= 365
    }
    if (interval == "INTRADAY") {
        for (let x = 0; x < 365; x++) {
            average = parseInt(values[x]);
            if (rangeHigh < parseInt(values[x])) {
                rangeHigh = parseInt(values[x]);
            }
            if (rangeLow > parseInt(values[x])) {
                rangeLow = parseInt(value[x]);
            }
        }
        average /= 365
    }

    showChartHelper({name : metadata['2. Symbol'], value: data[timestamp[0]]['1. open'], pclose: data[timestamp[1]]['4. close'], open: data[timestamp[0]]['1. open'], 
    volume: data[timestamp[0]]['5. volume'], lastrange: `${data[timestamp[1]]['2. high']} - ${data[timestamp[1]]['3. low']}`, yearrange: `${rangeHigh} - ${rangeLow}`,
    average: average, values: values, timestamp: timestamp });
    
}
//Uses the object to append the object to the end of the file
const showChartHelper = chObj =>{
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
                return;
            }
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