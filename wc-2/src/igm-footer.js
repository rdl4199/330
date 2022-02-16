const template = document.createElement("template");
template.innerHTML = `
<style>
:host{
    display:block;
    background-color: #ddd;

}
span{
    color: #F76902;
    font-variant: small-caps:
    font-weight: bolder;
    font-family: sans-serif;
}
hr{
  border: 3px solid red;
}
</style>
<span></span>
<hr>
`;

class IGMFooter extends HTMLElement{
    constructor(){
      super();
      //1 - attach a shadow DOM tree to this instance - this cretes `.shadowRoot` for us
      this.attachShadow({mode: "open"});

      //2 - Clone `template` and append it
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      // put this at the end of the constructor
    
      // This line of code will create an property named `span` for us, so that we don't have to keep calling this.shadowRoot.querySelector("span");
      
      if(!this.dataset.year) this.dataset.year = 1989;
      if(!this.dataset.text) this.dataset.text = "Bill & Ted";
      if(!this.dataset.count) this.dataset.count = 0;
      this.span = this.shadowRoot.querySelector("span");
    }

    static get observedAttributes(){
      return ["data-year", "data-text", "data-count"];
    }

    attributeChangedCallback(attributeName, oldVal, newVal){
      console.log(attributeName, oldVal, newVal);
      this.render();
    }

    connectedCallback(){
      this.span.onclick = () => {
        let count = +this.dataset.count + 1;
        this.dataset.count = count;
        let year = +this.dataset.year + 1;
        this.dataset.year = year;
        
        console.log(this.dataset.count);

      };
      this.shadowRoot.querySelector("hr").onclick = () => {
        this.remove();
       }
       
      this.render();
    }

    disconnectedCallback(){
      this.span.onclick = null;
    }

    render(){
      const year = this.getAttribute('data-year') ? this.getAttribute('data-year') : "1995";
      const text = this.getAttribute('data-text') ? this.getAttribute('data-text') : "Nobody";
      const count = this.getAttribute('data-count') ? this.getAttribute('data-count') : "5";

      this.shadowRoot.querySelector("span").innerHTML = `&copy; Copyright ${year}, ${text}, COUNT: ${count}`;
    }
  } 
	
  customElements.define('igm-footer', IGMFooter);