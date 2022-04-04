import * as storage from "./storage.js";
import * as burger from "./styles.js";
const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<script type="module" src="src/main.js"></script>
<div id="card"> 
<nav class="navbar has-shadow is-white">
<!-- log/ brand-->
<div class="navbar-brand">
    <a id="Home" class="navbar-item" href="home.html">
        Home
    </a>
    <a class="navbar-burger" id="burger">
        <span></span>
        <span></span>
        <span></span>
    </a>
</div>
<div class="navbar-menu" id="main-menu">
    <div class="navbar-end">
        <a id="App" class="navbar-item" href="app.html">
            App
        </a>
        <a id="Favorite" class="navbar-item" href="favorites.html">
            Favorites
        </a>
        <a id="Documentation" class="navbar-item" href="documentation.html">
            Documentation
        </a>
        <a id="Community" class="navbar-item" href="community.html">
            Community
        </a>
    </div>
</div>
</nav>
</div>
`;

class NavComp extends HTMLElement{
    constructor(){  
        super();

        this.attachShadow({mode: "open"});

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.a1 = this.shadowRoot.querySelector("#Home");
        this.a2 = this.shadowRoot.querySelector("#App");
        this.a3 = this.shadowRoot.querySelector("#Favorite");
        this.a4 = this.shadowRoot.querySelector("#Documentation");
        this.a5 = this.shadowRoot.querySelector("#Community")
        this.burger = this.shadowRoot.querySelector("#burger");
    }
    connectedCallback(){
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
        return["data-category"];
    }

    render(){
        const category = this.getAttribute('data-category') ? this.getAttribute('data-category') : "-1";
       // const latest = this.getAttribute('data-latest') ? this.getAttribute('data-latest') : "0";
        
        const navBurger = this.shadowRoot.querySelector('.navbar-burger');
        const menu = this.shadowRoot.querySelector('#main-menu');
        
        navBurger.onclick = ()=>{
            menu.classList.toggle('is-active');
        }
            
        if(category == "Home")
        {
            this.a1.className = "navbar-item has-text-weight-bold is-link"
            this.a2.className = "navbar-item "
            this.a3.className = "navbar-item"
            this.a4.className = "navbar-item"
            this.a5.className = "navbar-item"
        }
        if(category == "App")
        {
            this.a1.className = "navbar-item"
            this.a2.className = "navbar-item has-text-weight-bold is-link"
            this.a3.className = "navbar-item"
            this.a4.className = "navbar-item"
            this.a5.className = "navbar-item"
        }
        if(category == "Documentation")
        {
            this.a1.className = "navbar-item"
            this.a2.className = "navbar-item "
            this.a3.className = "navbar-item"
            this.a4.className = "navbar-item has-text-weight-bold is-link"
            this.a5.className = "navbar-item"
        }
        if(category == "Favorites")
        {
            this.a1.className = "navbar-item"
            this.a2.className = "navbar-item"
            this.a3.className = "navbar-item has-text-weight-bold is-link"
            this.a4.className = "navbar-item"
            this.a5.className = "navbar-item"
        }
        if(category == "Community")
        {
            this.a1.className = "navbar-item"
            this.a2.className = "navbar-item"
            this.a3.className = "navbar-item"
            this.a4.className = "navbar-item"
            this.a5.className = "navbar-item has-text-weight-bold is-link"
        }
        
    }
};
customElements.define('nav-comp', NavComp);