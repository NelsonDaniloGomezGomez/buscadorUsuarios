export class BarraBusqueda extends HTMLElement {
  private input!: HTMLInputElement;
  private mensajeError!: HTMLElement;
  private boton!: HTMLButtonElement;

  constructor() {
    super();
    // creamos el DOM encapsulando el estilo y la estructura 
    const shadow = this.attachShadow({ mode: "open" });

    //creamos el estilo CSS del componente
    const estilo = document.createElement("style");

    estilo.textContent = `
      .contenedor {
        width: 100%;
        max-width: 40rem;
        padding: 3rem 3rem 1rem 3rem;
        display: flex;
        gap: 0.5rem;
        box-sizing: border-box;
        overflow: hidden; 
      }

      input {
        width: 100%;
        padding: 0.4rem;
        font-size: 1.5rem;
        background-color: #fff;
        border-radius: 15px;
        height: 2rem;
      }

      button {
        padding: 6px 12px;
        border-radius: 15px;
        font-size: 1.5rem;
        cursor: pointer;
        background-color: #569e56ff;
        color: #fff;
      }

      button:hover {
        background-color: #2a852aff;
      }

      .error {
        padding: 0rem 3rem 3rem 3rem;
        color: red;
        font-size: 1rem;
        height: 1.2rem;
        margin-left: 0.5rem;
        display: none;
      }
      
      @media (max-width: 500px) {
        .contenedor {
          width: 100%;
          padding: 0.5rem;
          display: flex;
        }

        input {
          flex: 1 1 auto;
          min-width: 0;
          font-size: 1.2rem;
          height: 2.5rem;
          box-sizing: border-box;
        }

        button {
          flex-shrink: 0;
          min-width: 7.5rem;
          box-sizing: border-box;
          font-size: 1.2rem;
          height: 2.5rem;
        }

        .error {
        width: 100%;
        padding: 0rem 0rem 0rem .5rem;
        }

      }
    `;

    //creamos el contenedor principal para el input y botón, tambien agregamos la clase contenedor al div
    const contenedor = document.createElement("div");
    contenedor.classList.add("contenedor");
    contenedor.innerHTML = `
      <input type="text" placeholder="Ingrese un nombre" />
      <button>Buscar</button>
    `;

    //mantenemos las referencias del input y botón
    this.input = contenedor.querySelector("input")!;
    this.input.setAttribute("aria-label", "Nombre de usuario a buscar");

    this.boton = contenedor.querySelector("button")!;


    //creamos el div que contendra el error, agregamos la clase error.
    this.mensajeError = document.createElement("div");
    this.mensajeError.classList.add("error");
    this.mensajeError.setAttribute("role", "alert");
    this.mensajeError.setAttribute("aria-live", "polite");
    this.mensajeError.setAttribute("tabindex", "-1");
    this.mensajeError.textContent = "Por favor ingresa un nombre de usuario";

    //insertamos los estilos, contenedor y mensaje de error al shadow DOM
    shadow.appendChild(estilo);
    shadow.appendChild(contenedor);
    shadow.appendChild(this.mensajeError);
  }

  //handlers
  //se ejecuta al momento de escribir en el input
  private onInput = () => {
    this.mensajeError.style.display = "none";
  };

  //se ejecuta al esribir y se acciona la funcion ejecutarBusqueda si se da enter
  private onKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter") this.ejecutarBusqueda();
  };

  //se ejecuta si se hace click en el botón buscar
  private onClick = () => {
    this.ejecutarBusqueda();
  };

  //fin handlers

  //método de llamado cuando el componente se agrega al DOM
  connectedCallback() {
    //se agregan listeners para el input, keydown y click
    this.input.addEventListener("input", this.onInput);
    this.input.addEventListener("keydown", this.onKeydown);
    this.boton.addEventListener("click", this.onClick);

    // colocamos el focus en el input
    setTimeout(() => this.input.focus(), 0);
  }

  //método de llamado cuendo el componente se elimina del DOM
  disconnectedCallback() {
    //quitamos los listeners
    this.input.removeEventListener("input", this.onInput);
    this.input.removeEventListener("keydown", this.onKeydown);
    this.boton.removeEventListener("click", this.onClick);
  }

  //metodo para validar que el input contenga un valor para realizar la busqueda
  //de no tener un valor limpiamos cualquier error previo y mostramos mensaje de error de input vacio
  ejecutarBusqueda() {
    const nombreUsuario = this.input.value.trim();
    if (!nombreUsuario) {
      this.limpiarErrores();
      this.mensajeError.style.display = "block";
      this.mensajeError.focus();
      return;
    }

    this.mensajeError.style.display = "none";
    this.buscarUsuario(nombreUsuario);
  }

  //metodo para ejecutar el evento con el nombre del usuario a buscar
  buscarUsuario(nombreUsuario: string) {
    this.dispatchEvent(
      new CustomEvent("usuario-buscado", {
        detail: { usuario: nombreUsuario },
        bubbles: true,
        composed: true,
      })
    );
  }

  //metodo para limpiar error en componente externo(tarjeta-usuario)
  limpiarErrores() {
    this.dispatchEvent(
      new CustomEvent("limpiar-errores", {
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("barra-busqueda", BarraBusqueda);
