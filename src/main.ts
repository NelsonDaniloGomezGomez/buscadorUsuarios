//importamos estilo global
import './assets/styles/style.css';
//importamos componentes
import './components/barra-busqueda';
import './components/tarjeta-usuario';
import './components/spinner';
import './components/app-header';
import './components/app-footer';
//importamos sevicios
import { UsuariosService } from './services/usuariosService.js';
//importamos funciones para limpiar URLs y limitar texto
import { limpiarUrl, limitarTexto } from './utils/utils';
//importamos tipos
import type { TarjetaUsuario } from './components/tarjeta-usuario'; //para poder acceder a sus metodos
import type { Usuario } from './types/usuario.js';

const app = document.querySelector<HTMLDivElement>('#app')!;
const main = document.createElement('main');
const barraBusqueda = document.createElement('barra-busqueda');
const tarjetaUsuario = document.createElement('tarjeta-usuario') as TarjetaUsuario;
const spinner = document.createElement('mi-spinner');
const header = document.createElement('app-header');
const footer = document.createElement('app-footer');

//servicio con la URL base
const usuarioABuscar = new UsuariosService('https://api.github.com');

//los incorporamos al main
main.appendChild(barraBusqueda);
main.appendChild(tarjetaUsuario);

//agregamos los componentes al DOM
app.prepend(header); 
app.appendChild(main);
app.appendChild(footer);
//variable para evitar busquedas iguales
let ultimoUsuario = '';

//evento que se ejecuta al realizar la busqueda desde barra-busqeuda
barraBusqueda.addEventListener('usuario-buscado', async (e) => {
  const evento = e as CustomEvent<{ usuario: string }>
  //obtenemos el nombre del usuario
  const nombre = evento.detail.usuario;

  if (nombre === ultimoUsuario){
    return false;
  }

  //guardamos el nombre del usuario a buscar
  ultimoUsuario = nombre;

  //si el snipper no esta lo agregamos para mostrar carga
  if (!main.contains(spinner)) {
    main.appendChild(spinner);
  }

  try {
    //hacemos la consulta
    const datosUsuario = await usuarioABuscar.obtenerUsuarioPorNombre(nombre);
    //preparamos los datos, limpiamos URLs y limitamos el texto para mejor presentación
    const limpiarDatos: Usuario = {
        avatar_url: limpiarUrl(datosUsuario.avatar_url) || './assets/img/iconoUsuario.png',
        name: limitarTexto(datosUsuario.name, 120),
        bio: limitarTexto(datosUsuario.bio, 300),
        public_repos: Number(datosUsuario.public_repos) || 0,
        html_url: limpiarUrl(datosUsuario.html_url) || '#',
    }
    //actualizamos la tarjeta con los datos limpios
    tarjetaUsuario.setUsuario(limpiarDatos);

  } catch (error) {
    //si ocurre un error mostramos mensaje
    tarjetaUsuario.mostrarError('Usuario no encontrado');

  } finally {
    //quitamos el spinner al terminar la consulta
    if (main.contains(spinner)) {
      main.removeChild(spinner);
    }

  }
});

//evento para limpiar los errores y el contenido de la tarjeta
barraBusqueda.addEventListener('limpiar-errores', () => {
  //limpiamos el ultimo usuario guardado
  ultimoUsuario = '';
  //limpiamos la tarjeta
  tarjetaUsuario.limpiarContenido();
});
