export class BarraBusqueda extends HTMLElement {
  private input: HTMLInputElement;
  
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const estilo = document.createElement("style");

    estilo.textContent = `
      div {
        width: 100%;
        max-width: 40rem;
        padding: 3rem;
        display: flex;
        gap: 0.5rem;
      }
      input {
        width: 100%;
        max-width: 25rem;
        padding: 0.4rem;
        font-size: 1.5rem;
        background-color: #fff;
        border-radius: 5px;
        height: 2rem;
      }
      button {
        padding: 6px 12px;
        border-radius: 5px;
        font-size: 1.5rem;
        cursor: pointer;
        background-color: #569e56ff;
        color: #fff;
      }
      
      @media (max-width: 500px) {
        div {
          width: 100%;
          max-width: 40rem;
          padding: 0.5rem;
          display: flex;
          gap: 0.5rem;
          box-sizing: border-box;
          overflow: hidden; 
        }

        input {
          flex: 1 1 auto;
          min-width: 0;
          max-width: 25rem;
          padding: 0.4rem;
          font-size: 1.5rem;
          height: 2.5rem;
          background-color: #fff;
          border-radius: 5px;
          box-sizing: border-box;
        }

        button {
          flex-shrink: 0;
          padding: 6px 12px;
          border-radius: 5px;
          cursor: pointer;
          background-color: #569e56ff;
          color: #fff;
          min-width: 7.5rem;
          box-sizing: border-box;
          font-size: 1.5rem;
          height: 2.5rem;
        }
      }
    `;

    const contenedor = document.createElement("div");
    contenedor.innerHTML = `<input type="text" placeholder="Usuario a buscar" />
        <button>Buscar</button>`;

    this.input = contenedor.querySelector("input")!;
    const boton = contenedor.querySelector("button")!;

    // Al hacer clic
    boton.addEventListener("click", () => {
      const nombreUsuario = this.input.value.trim();
      if (nombreUsuario) {
        //Ejecuta evento
        this.dispatchEvent(
          new CustomEvent("usuario-buscado", {
            detail: { usuario: nombreUsuario },
            bubbles: true,
            composed: true,
          })
        );
      }
    });

    shadow.appendChild(estilo); 
    shadow.appendChild(contenedor);
  }
}

customElements.define("barra-busqueda", BarraBusqueda);
