(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&t(c)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();class b extends HTMLElement{input;mensajeError;boton;constructor(){super();const e=this.attachShadow({mode:"open"}),r=document.createElement("style");r.textContent=`
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
    `;const t=document.createElement("div");t.classList.add("contenedor"),t.innerHTML=`
      <div class="barraBusqueda">
        <input type="text" placeholder="Ingrese un nombre" />
        <button>Buscar</button>
      </div>
    `,this.input=t.querySelector("input"),this.input.setAttribute("aria-label","Nombre de usuario a buscar"),this.boton=t.querySelector("button"),this.mensajeError=document.createElement("div"),this.mensajeError.classList.add("error"),this.mensajeError.setAttribute("role","alert"),this.mensajeError.setAttribute("aria-live","polite"),this.mensajeError.setAttribute("tabindex","-1"),this.mensajeError.textContent="Por favor ingresa un nombre de usuario",t.appendChild(this.mensajeError),e.appendChild(r),e.appendChild(t)}onInput=()=>{this.mensajeError.style.display="none"};onKeydown=e=>{e.key==="Enter"&&this.ejecutarBusqueda()};onClick=()=>{this.ejecutarBusqueda()};connectedCallback(){this.input.addEventListener("input",this.onInput),this.input.addEventListener("keydown",this.onKeydown),this.boton.addEventListener("click",this.onClick),setTimeout(()=>this.input.focus(),0)}disconnectedCallback(){this.input.removeEventListener("input",this.onInput),this.input.removeEventListener("keydown",this.onKeydown),this.boton.removeEventListener("click",this.onClick)}ejecutarBusqueda(){const e=this.input.value.trim();if(!e){this.limpiarErrores(),this.mensajeError.style.display="block",this.mensajeError.focus();return}this.mensajeError.style.display="none",this.buscarUsuario(e)}buscarUsuario(e){this.dispatchEvent(new CustomEvent("usuario-buscado",{detail:{usuario:e},bubbles:!0,composed:!0}))}limpiarErrores(){this.dispatchEvent(new CustomEvent("limpiar-errores",{bubbles:!0,composed:!0}))}}customElements.define("barra-busqueda",b);class f extends HTMLElement{shadow;constructor(){super(),this.shadow=this.attachShadow({mode:"open"})}setUsuario(e){this.limpiarContenido();const r=document.createElement("style");r.textContent=`
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

    `;const t=document.createElement("div");t.classList.add("contenedorTarjetas"),t.innerHTML=`
      <div class="tarjeta" role="region" aria-labelledby="nombreUsuario">
          <img src="${e.avatar_url}" alt="Avatar de ${e.name||"usuario"}" />
          <h2 id="nombreUsuario">${e.name||"Sin nombre"}</h2>
          <p>${e.bio||"Sin biografía"}</p>
          <p>Repositorios públicos: ${e.public_repos}</p>
          <a href="${e.html_url}" target="_blank" rel="noopener">Ver perfil en GitHub</a>
      </div>
    `,this.shadow.appendChild(r),this.shadow.appendChild(t)}mostrarError(e){this.limpiarContenido();const r=document.createElement("style");r.textContent=`
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
    `;const t=document.createElement("div");t.classList.add("error"),t.setAttribute("role","alert"),t.setAttribute("aria-live","assertive"),t.textContent=e,this.shadow.appendChild(r),this.shadow.appendChild(t)}limpiarContenido(){this.shadow.innerHTML=""}}customElements.define("tarjeta-usuario",f);class g extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"}),r=document.createElement("style");r.textContent=`
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
        }`;const t=document.createElement("div");t.classList.add("spinner"),e.appendChild(r),e.appendChild(t)}}customElements.define("mi-spinner",g);class x extends HTMLElement{shadow;constructor(){super(),this.shadow=this.attachShadow({mode:"open"});const e=document.createElement("style");e.textContent=`
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
    `;const r=document.createElement("header");r.textContent="Buscador de Usuarios GitHub",this.shadow.appendChild(e),this.shadow.appendChild(r)}}customElements.define("app-header",x);class w extends HTMLElement{shadow;constructor(){super(),this.shadow=this.attachShadow({mode:"open"});const e=document.createElement("style");e.textContent=`
      footer {
        background-color: #f5f5f5;
        color: #333;
        padding: 1rem 2rem;
        font-size: 0.9rem;
        text-align: center;
        border-top: 1px solid #ddd;
        margin-top: 2rem;
      }
    `;const r=document.createElement("footer");r.textContent="© 2025 Nelson Gomez - Aplicación GitHub Users",this.shadow.appendChild(e),this.shadow.appendChild(r)}}customElements.define("app-footer",w);class E{baseUrl;constructor(e){this.baseUrl=e}async obtenerUsuarioPorNombre(e){const r=`${this.baseUrl}/users/${e}`,t=await fetch(r);if(!t.ok)throw t.status===404?new Error("Usuario no encontrado"):new Error(`Error al obtener usuario: ${t.status}`);return t.json()}}function p(n){try{const e=new URL(String(n));return e.protocol!=="http:"&&e.protocol!=="https:"?"":e.toString()}catch{return""}}function h(n,e=300){if(n==null)return"";const r=String(n);return r.length>e?r.slice(0,e)+"…":r}const l=document.querySelector("#app"),a=document.createElement("main"),m=document.createElement("barra-busqueda"),d=document.createElement("tarjeta-usuario"),s=document.createElement("mi-spinner"),y=document.createElement("app-header"),v=document.createElement("app-footer"),C=new E("https://api.github.com");a.appendChild(m);a.appendChild(d);l.prepend(y);l.appendChild(a);l.appendChild(v);let u="";m.addEventListener("usuario-buscado",async n=>{const r=n.detail.usuario;if(r===u)return!1;u=r,a.contains(s)||a.appendChild(s);try{const t=await C.obtenerUsuarioPorNombre(r),o={avatar_url:p(t.avatar_url)||"./assets/img/iconoUsuario.png",name:h(t.name,120),bio:h(t.bio,300),public_repos:Number(t.public_repos)||0,html_url:p(t.html_url)||"#"};d.setUsuario(o)}catch{d.mostrarError("Usuario no encontrado")}finally{a.contains(s)&&a.removeChild(s)}});m.addEventListener("limpiar-errores",()=>{u="",d.limpiarContenido()});
