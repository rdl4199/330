import * as storage from "./storage.js";
const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<script type="module" src="src/main.js"></script>
<div id="card"> 
<nav class="breadcrumb" aria-label="breadcrumbs">
  <ul>
    <li><a id="Home" href="home.html">Home</a></li>
    <li><a id="App" href="app.html">App</a></li>
    <li><a id="Favorite" href="favorites.html">Favorites</a></li>
    <li><a id="Documentation" href="documentation.html">Documentation</a></li>
    <li><a id="Community" href="community.html">Community</a></li>
  </ul>
</nav>
</div>
`;

class FootComp extends HTMLElement{
    constructor(){  
        super();

        this.attachShadow({mode: "open"});

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.a1 = this.shadowRoot.querySelector("#Home");
        this.a2 = this.shadowRoot.querySelector("#App");
        this.a3 = this.shadowRoot.querySelector("#Favorite");
        this.a4 = this.shadowRoot.querySelector("#Documentation");
        this.a5 = this.shadowRoot.querySelector("#Community");
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

        if(category == "Home")
        {
            this.a1.className = "has-text-weight-bold"
            this.a2.className = ""
            this.a3.className = ""
            this.a4.className = ""
            this.a5.className = ""
        }
        if(category == "App")
        {
            this.a1.className = ""
            this.a2.className = "navbar-item has-text-weight-bold"
            this.a3.className = ""
            this.a4.className = ""
            this.a5.className = ""
        }
        if(category == "Documentation")
        {
            this.a1.className = ""
            this.a2.className = ""
            this.a3.className = ""
            this.a4.className = "navbar-item has-text-weight-bold"
            this.a5.className = ""
        }
        if(category == "Favorites")
        {
            this.a1.className = ""
            this.a2.className = ""
            this.a3.className = "navbar-item has-text-weight-bold"
            this.a4.className = ""
            this.a5.className = ""
        }
        if(category == "Community")
        {
            this.a1.className = ""
            this.a2.className = ""
            this.a3.className = ""
            this.a4.className = ""
            this.a5.className = "navbar-item has-text-weight-bold"
        }
        
    }
};
customElements.define('foot-comp', FootComp);