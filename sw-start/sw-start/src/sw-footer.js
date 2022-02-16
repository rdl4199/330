const template = document.createElement("template");
template.innerHTML = `
<style>
footer{
    color: white;
    background-color: black;
    padding: .5rem;
    margin-top: .5rem;
  }
</style>
<footer>
    <h2>Ace Coder 2021</h2>
</header>
`;

class SWFooter extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode: "open"});

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.h2 = this.shadowRoot.querySelector("h2");
    }


    connectedCallback(){
        this.onclick = () => {
            this.currentQuote = this.randomQuote();
            this.render();
        }
        this.render();
    }

    disconnectedCallback()
    {

    }
    
    attributeChangedCallback(attributeName, oldVal, newVal){
        console.log(attributeName, oldVal, newVal);
        this.render();
    }

    static get observedAttributes(){
        return["data-title","data-year"];
    }

    randomQuote(){
        return this.quotes[Math.floor(Math.random() * this.quotes.length)];
    }

    render(){
        const title = this.dataset.title ? this.dataset.title : "Ace Coder";
        const year = this.dataset.year ? this.dataset.year : "2021";
        this.h2.innerHTML = `${title} ${year}`;
    }
}

customElements.define('sw-footer', SWFooter);