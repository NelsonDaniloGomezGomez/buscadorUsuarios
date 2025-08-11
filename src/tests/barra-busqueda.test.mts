import { jest } from '@jest/globals';
import { BarraBusqueda } from '../components/barra-busqueda.js';

describe('BarraBusqueda', () => {
  let barraBusqueda: BarraBusqueda;

  beforeEach(() => {
    // limpiamos
    document.body.innerHTML = '';
    barraBusqueda = new BarraBusqueda();
    document.body.appendChild(barraBusqueda);
  });

  test('se renderiza con input y botón', () => {
    //buscamos los elementos
    const input = barraBusqueda.shadowRoot!.querySelector('input');
    const boton = barraBusqueda.shadowRoot!.querySelector('button');

    //verificamos que se generaran en el DOM
    expect(input).not.toBeNull();
    expect(boton).not.toBeNull();
  });

  test('muestra error cuando se busca sin texto', () => {
        //Buscamos los elementos
    const boton = barraBusqueda.shadowRoot!.querySelector('button')!;
    const mensajeError = barraBusqueda.shadowRoot!.querySelector('.error')! as HTMLElement;

    // revisamos que el error este oculto
    expect(['', 'none']).toContain(mensajeError.style.display);

    //simulamos click
    boton.click();

    //después de click verificamos input vacio y deberia estar mostrando el error
    expect(mensajeError.style.display).toBe('block');
  });

  test('oculta error al escribir en input', () => {
    //Buscamos los elementos
    const input = barraBusqueda.shadowRoot!.querySelector('input')!;
    const mensajeError = barraBusqueda.shadowRoot!.querySelector('.error')! as HTMLElement;

    //forzar el mensaje de error a estar visible
    mensajeError.style.display = 'block';

    //ejecutamos evento input
    input.value = 'nelson';
    input.dispatchEvent(new Event('input'));

    //el mensaje de error debe ocultarse
    expect(mensajeError.style.display).toBe('none');
  });

  test('dispara evento usuario-buscado con valor correcto al hacer click', () => {
    //Buscamos los elementos
    const input = barraBusqueda.shadowRoot!.querySelector('input')!;
    const boton = barraBusqueda.shadowRoot!.querySelector('button')!;

    //agregamos valor al input
    input.value = 'nelson';

    //ejecutamos el evento
    const eventoSpy = jest.fn();
    barraBusqueda.addEventListener('usuario-buscado', eventoSpy);

    //simulamos click
    boton.click();

    //verificamos el evento
    expect(eventoSpy).toHaveBeenCalled();

    //capturamos el primer evento
    const evento = eventoSpy.mock.calls[0][0] as CustomEvent;

    //verificamos el detalle
    expect(evento.detail.usuario).toBe('nelson');
  });

  test('dispara evento usuario-buscado con valor correcto al presionar Enter', () => {
    //Buscamos los elementos
    const input = barraBusqueda.shadowRoot!.querySelector('input')!;

    //agregamos valor al input
    input.value = 'nelson';

    //ejecutamos el evento
    const eventoSpy = jest.fn();
    barraBusqueda.addEventListener('usuario-buscado', eventoSpy);

    //Simular enter
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    //verificamos el evento
    expect(eventoSpy).toHaveBeenCalled();

    //capturamos el primer evento
    const evento = eventoSpy.mock.calls[0][0] as CustomEvent;

    //verificamos el detalle
    expect(evento.detail.usuario).toBe('nelson');
  });
});
