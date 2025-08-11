//import { jest } from '@jest/globals';
import { TarjetaUsuario } from '../components/tarjeta-usuario.js';

//definimos el elemento
if (!customElements.get("tarjeta-usuario")) {
  customElements.define("tarjeta-usuario", TarjetaUsuario);
}

describe('TarjetaUsuario', () => {
  let tarjeta: TarjetaUsuario;

  //simulamos los datos del usuario
  const usuarioFalso = {
    avatar_url: 'https://github.com/images/foto-perfil.png',
    name: 'Nelson Gómez',
    bio: 'Desarrollador Front',
    public_repos: 12,
    html_url: 'https://github.com/NelsonDaniloGomezGomez'
  };

  beforeEach(() => {
    //insertamos el componente al DOM
    document.body.innerHTML = `<tarjeta-usuario></tarjeta-usuario>`;
    tarjeta = document.querySelector('tarjeta-usuario')!;
  });

  it('muestra los datos del usuario correctamente', () => {
    //asignamos al usuario simulado
    tarjeta.setUsuario(usuarioFalso);

    //accedemos para validar el contenido
    const shadow = tarjeta.shadowRoot!;
    const img = shadow.querySelector('img')!;
    const nombre = shadow.querySelector('h2')!;
    const bio = shadow.querySelectorAll('p')[0];
    const repos = shadow.querySelectorAll('p')[1];
    const enlace = shadow.querySelector('a')!;

    //validamos que nuestos datos del usuario simulado se muestren correctamente
    expect(img.src).toBe(usuarioFalso.avatar_url);
    expect(img.alt).toBe(`Avatar de ${usuarioFalso.name}`);
    expect(nombre.textContent).toBe(usuarioFalso.name);
    expect(bio.textContent).toBe(usuarioFalso.bio);
    expect(repos.textContent).toContain(String(usuarioFalso.public_repos));
    expect(enlace.href).toBe(usuarioFalso.html_url);
  });

  it('muestra "Sin nombre" y "Sin biografía" si no hay datos', () => {
    //simulamos la prueba con datos vacios
    tarjeta.setUsuario({
      avatar_url: '',
      name: '',
      bio: '',
      public_repos: 0,
      html_url: ''
    });

    const shadow = tarjeta.shadowRoot!;
    const nombre = shadow.querySelector('h2')!;
    const bio = shadow.querySelectorAll('p')[0];

    //validamos que vengan los datos por defecto
    expect(nombre.textContent).toBe('Sin nombre');
    expect(bio.textContent).toBe('Sin biografía');
  });

  it('muestra el mensaje de error cuando se llama a mostrarError()', () => {
    const mensaje = 'Usuario no encontrado';
    //llamamos al metodo mostrarError(simulamos el error)
    tarjeta.mostrarError(mensaje);

    const shadow = tarjeta.shadowRoot!;
    const divError = shadow.querySelector('.error')!;

    //verificamos que el div con el error exista y contenga el mensaje esperado
    expect(divError).toBeTruthy();
    expect(divError.textContent).toBe(mensaje);

    //verificamos que el div tenga la clase error
    expect(divError.classList.contains('error')).toBe(true);
  });
});
