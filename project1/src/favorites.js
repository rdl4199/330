import * as main from './main.js'
import * as storage from './storage.js'
window.onload = (e) => { 
    document.querySelector("#clear-button").onclick = storage.clearLocalStorage;
    let stocks = storage.getStocks();
    for(let x = 0; x < stocks.length; x = x + 3)
    {
      main.showStock({ name: stocks[x], high: stocks[x + 1], low: stocks[x + 2]});
    }
    console.log("TEST");
  //  document.querySelector("#week-radio").checked = true;
    //loadJsonXHR("IBM", "WEEKLY");
};