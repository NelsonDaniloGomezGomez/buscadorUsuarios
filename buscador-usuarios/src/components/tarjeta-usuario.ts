import type { Usuario } from "../types/usuario";

export class TarjetaUsuario extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    // creamos el DOM encapsulando el estilo y la estructura 
    this.shadow = this.attachShadow({ mode: "open" });
  }

  setUsuario(datos: Usuario) {
    //limpiamos contenido previo
    this.limpiarContenido();

    const estilo = document.createElement('style');
    estilo.textContent = `
        .contenedorTarjetas {
            width: 100%;
            border-radius: 5px;
            display: flex;
        }
        .tarjeta {
            min-width: 350px;
            width: 100%;
            background-color: #f5f5f5;
            border-radius: 8px;
            padding: 0.5rem;
            margin: 3rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            font-family: Arial, sans-serif;
        }
        img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            display: block;
            margin: 0 auto;
        }
        h2 {
            text-align: center;
            margin: 0.5rem 0 0.2rem 0;
            font-size: 1.5rem;
            color: #333;
        }
        p {
            text-align: center;
            margin: 0.3rem 0;
            font-size: 1rem;
            color: #666;
        }
        a {
            display: block;
            text-align: center;
            margin-top: 1rem;
            color: #0366d6;
            text-decoration: none;
            font-weight: bold;
        }
        a:hover {
            text-decoration: underline;
        }

        @media (max-width: 500px){

          .tarjeta{
              width:100%;
              min-width: 0!important;
              margin: 1rem;
          }
        }
    `;

    //creamos el contenedor, agregamos la clase y insertamos el contenido para mostrar los datos
    const contenedor = document.createElement('div');
    contenedor.classList.add('contenedorTarjetas');
    contenedor.innerHTML = `
      <div class="tarjeta" role="region" aria-labelledby="nombreUsuario">
          <img src="${datos.avatar_url}" alt="Avatar de ${datos.name || 'usuario'}" />
          <h2 id="nombreUsuario">${datos.name || "Sin nombre"}</h2>
          <p>${datos.bio || "Sin biografía"}</p>
          <p>Repositorios públicos: ${datos.public_repos}</p>
          <a href="${datos.html_url}" target="_blank" rel="noopener">Ver perfil en GitHub</a>
      </div>
    `;

    // Añadimos estilo y contenedor al DOM
    this.shadow.appendChild(estilo);
    this.shadow.appendChild(contenedor);
  }

  //métpdo para mostrar error en caso de que no exista el usuario
  mostrarError(mensaje: string) {
    //limpiamos contenido previo
    this.limpiarContenido();

    //agregamos los estilos
    const estilo = document.createElement('style');
    estilo.textContent = `
      .error {
        color: red;
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 1rem;
        border: 1px solid red;
        border-radius: 8px;
        max-width: 400px;
        margin: 1rem auto;
        background-color: #ffe6e6;
      }
    `;

    //creamos el contenido con la clase y agregamos el mensaje
    const divError = document.createElement('div');
    divError.classList.add('error');
    divError.setAttribute("role", "alert");
    divError.setAttribute("aria-live", "assertive");
    divError.textContent = mensaje;

    this.shadow.appendChild(estilo);
    this.shadow.appendChild(divError);
  }

  //método para limpiar el contenido
  limpiarContenido() {
    //limpiamos los estilos y el contenido
    this.shadow.innerHTML = ``;
  }
}

customElements.define("tarjeta-usuario", TarjetaUsuario);
