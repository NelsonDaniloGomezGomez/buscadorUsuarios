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
        justify-content: center;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .barraBusqueda {
        width: 100%;
        padding: 2rem 2rem 1rem 2rem;
        display: flex;
        gap: 0.75rem;
        box-sizing: border-box;
        border-radius: 12px;
        max-width: 40rem;
      }

      input {
        flex: 1 1 auto;
        padding: 0.6rem 1rem;
        font-size: 1.3rem;
        background-color: #fff;
        border: 2px solid #cbd5e0;
        border-radius: 12px;
        transition: border-color 0.3s ease;
        height: 2.8rem;
        box-sizing: border-box;
      }

      input:focus {
        outline: none;
        border-color: #4e8150ff;
        box-shadow: 0 0 6px #85a386ff;
      }

      button {
        padding: 0 1.5rem;
        border-radius: 12px;
        font-size: 1.3rem;
        cursor: pointer;
        background-color: #4caf50;
        color: #fff;
        border: none;
        height: 2.8rem;
        transition: background-color 0.3s ease;
        font-weight: 600;
        box-shadow: 0 3px 6px rgba(76,175,80,0.4);
      }

      button:hover, button:focus {
        background-color: #388e3c;
        box-shadow: 0 4px 10px rgba(56,142,60,0.6);
        outline: none;
      }

      .error {
        padding: 0.1rem 2rem 2rem 2.9rem;
        color: #e53e3e;
        font-size: 1rem;
        height: 1.2rem;
        margin-left: 0.5rem;
        display: none;
        font-weight: 600;
        width: 100%;
        box-sizing: border-box;
        border-radius: 12px;
        max-width: 40rem;
      }

      @media (max-width: 500px) {
        .barraBusqueda {
          padding: 1rem 1rem 0.5rem 1rem;
          gap: 0.5rem;
        }

        input {
          min-width: 0;
          font-size: 1.1rem;
          height: 2.5rem;
        }

        button {
          font-size: 1.1rem;
          height: 2.5rem;
          min-width: rem;
        }

        .error {
          width: 100%;
          padding: 0 0 0 2rem;
        }
      }
    `;

    //creamos el contenedor principal para el input y botón, tambien agregamos la clase contenedor al div
    const contenedor = document.createElement("div");
    contenedor.classList.add("contenedor");
    contenedor.innerHTML = `
      <div class="barraBusqueda">
        <input type="text" placeholder="Ingrese un nombre" />
        <button>Buscar</button>
      </div>
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

    //agregamos el mensaje de error al contenedor
    contenedor.appendChild(this.mensajeError);    

    //insertamos los estilos, contenedor y mensaje de error al shadow DOM
    shadow.appendChild(estilo);
    shadow.appendChild(contenedor);
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
