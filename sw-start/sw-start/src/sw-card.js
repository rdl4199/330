const template = document.createElement("template");
template.innerHTML = `
<style>
    div{
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
        font-family: SfDistantGalaxy, sans-serif;
        letter-spacing: .67px;
        line-height: 1.2;
        margin-top: 0;
    }
  
    img{
        width: 100px;
    }
    button{
        border-radius: 1px;
        padding: 2px;
        position: absolute;
        top:1px;
        right:1px;
        opacity: 0.2;
    }
    button:hover{
        opacity: 1;
    }
</style>
<div> 
    <h2></h2>
    <button>X</button>
    <img alt="mugshot">
    <p id="swcHeight">Height: </p>
    <p id="swcMass">Mass:</p>
    <p id="affiliations">Affiliations:</p>
    <p id="gender">Gender:</p>
</div>
`;

class SWCard extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode: "open"});

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.h2 = this.shadowRoot.querySelector("h2");
        this.img = this.shadowRoot.querySelector("img");
        this.p1 = this.shadowRoot.querySelector("#swcHeight");
        this.p2 = this.shadowRoot.querySelector("#swcMass");
        this.p3 = this.shadowRoot.querySelector("#affiliations");
        this.p4 = this.shadowRoot.querySelector("#gender");
        this.button = this.shadowRoot.querySelector("button");
    }
    connectedCallback(){
        this.button.onclick = () => this.remove();
        this.render();
    }

    disconnectedCallback()
    {
        this.button.onclick = null;
    }
    
    attributeChangedCallback(attributeName, oldVal, newVal){
        console.log(attributeName, oldVal, newVal);
        this.render();
    }

    static get observedAttributes(){
        return["data-name", "data-height","data-mass","data-image","data-affiliations","data-gender"];

    }
    render(){
        const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "<i>...character name...</i>";
        const height = this.getAttribute('data-height') ? this.getAttribute('data-height') : "0";
        const mass = this.getAttribute('data-mass') ? this.getAttribute('data-mass') : "0";
        const affiliations = this.getAttribute('data-affiliations') ? this.getAttribute('data-affiliations') : "none";
        const imageUrl = this.getAttribute('data-image') ? this.getAttribute('data-image') : "image/catimage-no-image.png";
        const gender = this.getAttribute('data-gender') ? this.getAttribute('data-gender') : "none";

        //Affiliation with split and map
        const affiliation1array = `<ol>${(affiliations.split(",")).map(x => `<li>${x}</li>`)}</ol>`;
        //Trying to remove , but only does it once?
        const affiliation2array = affiliation1array.replace(",", '')

        this.h2.innerHTML = `${name}`;
        this.p1.innerHTML = `Height: ${height}`;
        this.p2.innerHTML = `Mass: ${mass}`;
        this.p3.innerHTML = `Affiliations: ${affiliation2array}`;
        this.p4.innerHTML = `Gender: ${gender}`;
        this.img.src = imageUrl;

    }
};
customElements.define('sw-card', SWCard);