import * as main from './main.js'
import * as storage from './storage.js'

function initFavorites()
{
    document.querySelector("#clear-button").onclick = () =>
    {
      localStorage.setItem("rdl4199-favorites", "");
      initFavorites();
    }
    document.querySelector(".stock-cards").innerHTML = "";
    let stocks = "";
    if (localStorage.getItem("rdl4199-favorites") != null)
    {
      stocks = localStorage.getItem("rdl4199-favorites").split(",");
    }
    for(let x = 0; x < (stocks.length - 1); x = x + 4)
    {
      main.showStock({ name: stocks[x], value: stocks[x + 1], range: stocks[x + 2], volume: stocks[x + 3]});
    }
    console.log("TEST");
  //  document.querySelector("#week-radio").checked = true;
    //loadJsonXHR("IBM", "WEEKLY");
}
export {initFavorites};