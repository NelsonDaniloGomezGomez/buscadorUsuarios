export class AppFooter extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `
      footer {
        background-color: #f5f5f5;
        color: #333;
        padding: 1rem 2rem;
        font-size: 0.9rem;
        text-align: center;
        border-top: 1px solid #ddd;
        margin-top: 2rem;
      }
    `;

    const footer = document.createElement('footer');
    footer.textContent = '© 2025 Nelson Gomez - Aplicación GitHub Users';

    this.shadow.appendChild(style);
    this.shadow.appendChild(footer);
  }
}

customElements.define('app-footer', AppFooter);
