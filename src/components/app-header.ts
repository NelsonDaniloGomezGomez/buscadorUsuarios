export class AppHeader extends HTMLElement {
  private shadow: ShadowRoot;
  
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `
      header {
        background-color: #262729e5;
        color: white;
        padding: 1rem 2rem;
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      }

      @media (max-width: 400px) {
        header {
          font-size: 1.2rem;
        }
      }
    `;

    const header = document.createElement('header');
    header.textContent = 'Buscador de Usuarios GitHub';

    this.shadow.appendChild(style);
    this.shadow.appendChild(header);
  }
}

customElements.define('app-header', AppHeader);