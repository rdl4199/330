import * as storage from "./storage.js";
import * as favorites from "./favorites.js"
import * as firebase from "./firebase.js"
import * as chart from "./chart-gen.js"
const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<style>
    #name, #value, #range, #volume{
        display : inline;
        text-align: left;
    }
    hr{
        background: black;
    }
</style>
<div id="line" class="columns"> 
    <div id="name" class="column is-1"></div>
    <div id="value" class="column is-1"></div>
    <div id="range" class="column is-3"></div>
    <div id="volume" class="column is-2"></div>
    <div id="likes" class="column is-4"></div>
    <div class="column is-2">/<a class="is-link">Unfavorite</a></div>
    <hr>
</div>
<hr>
`;
class StockLine extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.name = this.shadowRoot.querySelector("#name");
        this.value = this.shadowRoot.querySelector("#value");
        this.range = this.shadowRoot.querySelector("#range");
        this.volume = this.shadowRoot.querySelector("#volume");
        this.likes = this.shadowRoot.querySelector("#likes");
        this.button = this.shadowRoot.querySelector("a");
    }
    connectedCallback() {
        //Gives the 
        // this.button.onclick = () => {
        //     favorites.initFavorites();
        // }
        this.render();
    }

    disconnectedCallback() {
        this.button.onclick = null;
        // this.button.onclick = null;
    }

    attributeChangedCallback(attributeName, oldVal, newVal) {
        console.log(attributeName, oldVal, newVal);
        this.render();
    }

    static get observedAttributes() {
        return ["data-name", "data-value", "data-range", "data-volume", "data-likes"];
    }

    render() {
        const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "-1";
        const value = this.getAttribute('data-value') ? this.getAttribute('data-value') : "-1";
        const range = this.getAttribute('data-range') ? this.getAttribute('data-range') : "-1";
        const volume = this.getAttribute('data-volume') ? this.getAttribute('data-volume') : "-1";
        const likes = this.getAttribute('data-likes') ? this.getAttribute('data-likes') : "-1";
        // const latest = this.getAttribute('data-latest') ? this.getAttribute('data-latest') : "0";
        if (localStorage.getItem("rdl4199-favorites") != null) {
            if (localStorage.getItem("rdl4199-favorites").split(",").includes(`${name}`)) {
                this.button.innerHTML = "Unfavorite";
                this.button.onclick = () => {
                    if (window.location.href.match('community.html')) {
                        unfavorite(this);
                        firebase.writeFavNameData(name, value, range, volume, -1);
                        firebase.init();
                        this.render();

                    }
                    else if (window.location.href.match('favorites.html')) {
                        unfavorite(this);
                        firebase.writeFavNameData(name, value, range, volume, -1);
                        favorites.initFavorites();
                        this.render();
                    }
                }
            }
            else if(!(localStorage.getItem("rdl4199-favorites").split(",").includes(`${name}`))){
                this.button.innerHTML = "Favorite";
                this.button.onclick = () => {
                    chart.favorite(name, value, range, volume);
                    firebase.init();
                    this.render();
                }
            }
        }
        this.name.innerHTML = `${name}`;
        this.value.innerHTML = `$${parseInt(value).toFixed(2)}`;
        this.range.innerHTML = `Last range: ${range}`;
        this.volume.innerHTML = `Volume: ${volume}`;
        if (likes == "-1") {
            this.likes.innerHTML = "";
        }
        else {
            this.likes.innerHTML = `Likes: ${likes}`;
        }
        // this.p3.innerHTML = `Latest ${latest}`;

    }
};
function unfavorite(obj) {
    obj.remove();
    const name = obj.getAttribute('data-name') ? obj.getAttribute('data-name') : "-1";
    let storage = localStorage.getItem("rdl4199-favorites").split(",");
    let index = storage.indexOf(name);
    storage.splice(index, 4);
    localStorage.setItem("rdl4199-favorites", storage, true);
}
customElements.define('stock-line', StockLine);