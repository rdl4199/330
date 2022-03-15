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
        display : inline;
        text-align: left;
    }
  
    name, value{
        display : inline;
        text-align: left;
    }
</style>
<div id="line" class="columns"> 
    <div id="name" class="column is-2"></div>
    <div id="value" class="column is-2"></div>
    <div id="range" class="column is-2"></div>
    <div id="volume" class="column is-2"></div>
    <div id="likes" class="column is-4"></div>
    <div id="column is-2"><button id="unfavorite" class="button">Unfavorite</button></div>
    <hr>
</div>
`;

class StockLine extends HTMLElement{
    constructor(){  
        super();

        this.attachShadow({mode: "open"});

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.name = this.shadowRoot.querySelector("#name");
        this.value = this.shadowRoot.querySelector("#value");
        this.range = this.shadowRoot.querySelector("#range");
        this.volume = this.shadowRoot.querySelector("#volume");
        this.likes = this.shadowRoot.querySelector("#likes");
        this.button = this.shadowRoot.querySelector("button");
    }
    connectedCallback(){
        //Gives the 
        this.button.onclick = () => {
            this.parentNode.remove();
            let storage = localStorage.getItem("rdl4199-favorites").split(",");
            let index = favorites.indexOf(id);
            storage.splice(index,1);
            localStorage.setItem("rdl4199-favorites",storage, true);
        }  
        this.render();
    }

    disconnectedCallback()
    {
        this.button.onclick = null;
       // this.button.onclick = null;
    }
    
    attributeChangedCallback(attributeName, oldVal, newVal){
        console.log(attributeName, oldVal, newVal);
        this.render();
    }

    static get observedAttributes(){
        return["data-name", "data-value","data-range", "data-volume", "data-likes"];
    }

    render(){
        const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "-1";
        const value = this.getAttribute('data-value') ? this.getAttribute('data-value') : "-1";
        const range = this.getAttribute('data-range') ? this.getAttribute('data-range') : "-1";
        const volume = this.getAttribute('data-volume') ? this.getAttribute('data-volume') : "-1";
        const likes = this.getAttribute('data-likes') ? this.getAttribute('data-likes') : "-1";
       // const latest = this.getAttribute('data-latest') ? this.getAttribute('data-latest') : "0";

        this.name.innerHTML = `${name}`;
        this.value.innerHTML = `$${value}`;
        this.range.innerHTML = `Last range: ${range}`;
        this.volume.innerHTML = `Volume: ${volume}`
        this.likes.innerHTML = `Likes: ${likes}`
       // this.p3.innerHTML = `Latest ${latest}`;
        
    }
};
customElements.define('stock-line', StockLine);