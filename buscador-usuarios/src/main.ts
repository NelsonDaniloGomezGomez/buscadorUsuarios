import './assets/styles/style.css';
import './components/barra-busqueda';
import './components/tarjeta-usuario';
import { UsuariosService } from './services/usuariosService.js';

const app = document.querySelector<HTMLDivElement>('#app')!;
const barraBusqueda = document.createElement('barra-busqueda');
const usuarioABuscar = new UsuariosService('https://api.github.com');

app.appendChild(barraBusqueda);

barraBusqueda.addEventListener('usuario-buscado', async (e) => {
  const evento = e as CustomEvent<{ usuario: string }>
  const nombre = evento.detail.usuario;

  try {
    const datosUsuario = await usuarioABuscar.obtenerUsuarioPorNombre(nombre);
    console.log(datosUsuario)
  } catch (error) {
    console.log('Usuario no encontrado o error en la API')
  }
});