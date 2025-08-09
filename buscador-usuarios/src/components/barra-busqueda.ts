export class BarraBusqueda extends HTMLElement {
  private input: HTMLInputElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

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

    shadow.appendChild(contenedor);
  }
}

customElements.define("barra-busqueda", BarraBusqueda);
