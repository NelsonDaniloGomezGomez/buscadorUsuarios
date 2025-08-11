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
  border-radius: 10px;
  display: flex;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
}

.tarjeta {
  max-width: 550px;
  width: 100%;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  border-radius: 15px;
  padding: 1.5rem;
  margin: 2rem;
  box-shadow: 0 10px 20px rgba(0,0,0,0.12);
  color: #222;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: default;
}

.tarjeta:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 30px rgba(0,0,0,0.15);
}

img {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  display: block;
  margin: 0 auto 1rem auto;
  border: 3px solid #4caf50;
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

h2 {
  text-align: center;
  margin: 0.5rem 0 0.4rem 0;
  font-size: 1.7rem;
  color: #2f4f4f;
  font-weight: 700;
  letter-spacing: 0.03em;
}

p {
  text-align: center;
  margin: 0.3rem 0;
  font-size: 1.1rem;
  color: #555;
  line-height: 1.4;
}

a {
  display: block;
  text-align: center;
  margin-top: 1.3rem;
  color: #4caf50;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

a:hover {
  color: #388e3c;
  text-decoration: underline;
}

@media (max-width: 500px) {
  .tarjeta {
    margin: 1rem 0.5rem;
    max-width: 100%;
    padding: 1rem;
  }

  img {
    width: 90px;
    height: 90px;
    border-width: 2px;
  }

  h2 {
    font-size: 1.4rem;
  }

  p, a {
    font-size: 1rem;
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
