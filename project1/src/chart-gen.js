import * as firebase from "./firebase.js";
const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<style>
    #card{
        height: 340px;
        width: 170px;
        border: 1px solid gray;
        padding: .5rem;
        background-color: #f4f4f4;
        overflow: scroll;
        font-size: .7rem;
        position: relative;
    }
  
    h2{
        font-size: 1.1rem;
        letter-spacing: .67px;
        line-height: 1.2;
        margin-top: 0;
    }
  
    img{
        width: 100px;
    }
    p{
        font-size: 10px;
    }
</style>
<div class="columns">


<div id="stock" class="column is-8">
            
</div>
<div class="column is-4">
    <div class="columns">
        <div class="column">
            <h2 id="name"></h2>
            <h1 id="value"><h1>
            <div class="columns">
            <div class ="column">
                <p id="pclose"></p>
                <hr>
                <p id="open"></p>
                <hr>
                <p id="volume"><p>
            </div>
            <div class="column">
                <p id="last-range"></p>
                <hr>
                <p id="year-range"></p>
                <hr>
                <p id="avg-volume"><p>
            </div>
        </div>
        </div>
        
    </div>
    <button class="button is-link">Favorite Stock</button>
</div>
</div>
`;
class ChartCard extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        // this.stock = this.shadowRoot.querySelector("#stock-image")
        this.name = this.shadowRoot.querySelector("#name");
        this.value = this.shadowRoot.querySelector("#value");
        this.pclose = this.shadowRoot.querySelector("#pclose");
        this.open = this.shadowRoot.querySelector("#open");
        this.volume = this.shadowRoot.querySelector("#volume");
        this.lastrange = this.shadowRoot.querySelector("#last-range");
        this.yearrange = this.shadowRoot.querySelector("#year-range");
        this.average = this.shadowRoot.querySelector("#avg-volume");
        this.stock = this.shadowRoot.querySelector("#stock")
        this.button = this.shadowRoot.querySelector("button");
    }
    connectedCallback() {
        this.render();
        const name = this.getAttribute("data-name");
        const value = this.getAttribute("data-value");
        const lastrange = this.getAttribute("data-range");
        const average = this.getAttribute("data-average");

        let stockObject = {name: name, value: value, lastrange: lastrange, average: average};
        //Disable button immediately if it in local storage
        if (localStorage.getItem("rdl4199-favorites") != null) {
            if (localStorage.getItem("rdl4199-favorites").split(",").includes(`${name}`)) {
                this.button.disabled = true;
            }
        }
//         var testObject = { 'one': 1, 'two': 2, 'three': 3 };

// // Put the object into storage
// localStorage.setItem('testObject', JSON.stringify(testObject));

// // Retrieve the object from storage
// var retrievedObject = localStorage.getItem('testObject');

// console.log('retrievedObject: ', JSON.parse(retrievedObject));
        this.button.onclick = function () {
            //Write the favorited stock to firebase and localstorage for the user then disable the button
          firebase.writeFavNameData(name, value, lastrange, average);
          if (localStorage.getItem("rdl4199-favorites") == null)
          {
            localStorage.setItem("rdl4199-favorites", `${name + "," + value}`);
          }
          else if(!localStorage.getItem("rdl4199-favorites").split(",").includes(`${name}`)) {
            localStorage.setItem("rdl4199-favorites", `${localStorage.getItem("rdl4199-favorites") + name + ","}`);
        }
            //Either way the button should be disabled after this
            this.disabled = true;
        }

    }

    disconnectedCallback() {
        this.button.onclick = null;
    }

    attributeChangedCallback(attributeName, oldVal, newVal) {
        console.log(attributeName, oldVal, newVal);
        this.render();
    }

    static get observedAttributes() {
        return ["data-name", "data-value", "data-pclose", "data-open", "data-volume", "data-lastrange",
            "data-yearrange", "data-average", "data-values", "data-timestamp"];
    }

    render() {
        const name = this.getAttribute("data-name");
        const value = this.getAttribute("data-value");
        const pclose = this.getAttribute("data-pclose");
        const open = this.getAttribute("data-open");
        const volume = this.getAttribute("data-volume");
        const lastrange = this.getAttribute("data-lastrange");
        const yearrange = this.getAttribute("data-yearrange");
        const average = this.getAttribute("data-average");
        let values = this.getAttribute("data-values");
        if (values != null) {
            values = values.split(',');
        }
        let timestamp = this.getAttribute("data-timestamp");
        if (timestamp != null) {
            timestamp = timestamp.split(',');
        }
        // const latest = this.getAttribute('data-latest') ? this.getAttribute('data-latest') : "0";
        if (timestamp != null) {
            this.name.innerHTML = `${name}`
            this.value.innerHTML = `$${value}`
            this.pclose.innerHTML = `Last Close: ${pclose}`
            this.open.innerHTML = `Open: ${open}`
            this.volume.innerHTML = `Latest Volume: ${volume}`
            this.lastrange.innerHTML = `Last Range: ${lastrange}`
            this.yearrange.innerHTML = `52 Week Range: ${yearrange}`
            this.average.innerHTML = `Average Volume: ${average}`
            const stock = this.shadowRoot.querySelector("#stock");
            const chartSelect = this.shadowRoot.querySelector("#chart");
            if (chartSelect != null) {
                chartSelect.remove();
            }
            //document.querySelector("#chart").remove();
            let canvas = document.createElement('canvas');
            if (document.querySelector("#chart") != null) {
                document.querySelector("#chart").remove();
            }
            canvas.id = "chart";
            canvas.width = "400";
            canvas.height = "200";
            stock.appendChild(canvas);
            let chart = this.shadowRoot.querySelector('#chart');
            let ctx = chart.getContext('2d');
            let color;
            if (parseInt(values[0]) < parseInt(values[(values.length - 1)])) {
                color = "green";
            }
            if (parseInt(values[0]) >= parseInt(values[(values.length - 1)])) {
                color = "red";
            }
            //let ctx = document.querySelectosr("#chart").getContext('2d');

            //ctx.clearRect(0,0, ctx.width, ctx.height);
            let myChart;
            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: timestamp,
                    datasets: [{
                        label: 'Stock Value',
                        data: values,
                        backgroundColor: `${color}`,
                        borderColor: `${color}`,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

    }
};
customElements.define('chart-card', ChartCard);
