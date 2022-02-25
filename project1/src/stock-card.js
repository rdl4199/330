import * as storage from "./storage.js";
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
</style>
<div id="card"> 
    <h2></h2>
    <p id="high">High: </p>
    <p id="low">Low:</p>
    <button id="favorite" class="button">Favorite</button>
</div>
`;

class StockCard extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode: "open"});

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.h2 = this.shadowRoot.querySelector("h2");
        this.p1 = this.shadowRoot.querySelector("#high");
        this.p2 = this.shadowRoot.querySelector("#low");
        this.button = this.shadowRoot.querySelector("button");
    }
    connectedCallback(){
        //Gives the 
        this.button.onclick = () => {
            const allValues = storage.readLocalStorage();
            console.log("THIS IS REALLY HAPPENING")
            allValues.stocks.push(this.getAttribute('data-name'));
            allValues.stocks.push(this.getAttribute('data-high'));
            allValues.stocks.push(this.getAttribute('data-low'));
            storage.writeLocalStorage(allValues);
        }  
        this.render();
    }

    disconnectedCallback()
    {
       // this.button.onclick = null;
    }
    
    attributeChangedCallback(attributeName, oldVal, newVal){
        console.log(attributeName, oldVal, newVal);
        this.render();
    }

    static get observedAttributes(){
        return["data-name", "data-high","data-low"];
    }

    render(){
        const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "-1";
        const high = this.getAttribute('data-high') ? this.getAttribute('data-high') : "-1";
        const low = this.getAttribute('data-low') ? this.getAttribute('data-low') : "-1";
       // const latest = this.getAttribute('data-latest') ? this.getAttribute('data-latest') : "0";

        this.h2.innerHTML = `${name}`;
        this.p1.innerHTML = `High: ${high}`;
        this.p2.innerHTML = `Low: ${low}`;
       // this.p3.innerHTML = `Latest ${latest}`;
        
    }
};
customElements.define('stock-card', StockCard);