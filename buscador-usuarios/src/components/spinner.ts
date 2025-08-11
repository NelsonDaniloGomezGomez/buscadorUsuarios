export class Spinner extends HTMLElement {
  constructor() {
    super();
    //encapsulamos estilo y estructura
    const shadow = this.attachShadow({ mode: 'open' });

    //creamos el estilo CSS
    const estilo = document.createElement('style');

    estilo.textContent = `
        .spinner {
          border: 10px solid rgba(0,0,0,0.1);
          border-left-color: #4caf50;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: girar 1s linear infinite;
          margin: 1rem auto;
        }
        @keyframes girar {
          to { transform: rotate(360deg); }
        }`;

    //creamos el contenedor principal para el spinner y agregamos la clase al div
    const contenedor = document.createElement('div');
    contenedor.classList.add('spinner');

    //agregamos el estilo y contenedor al DOM
    shadow.appendChild(estilo);
    shadow.appendChild(contenedor);
  }
}

customElements.define('mi-spinner', Spinner);