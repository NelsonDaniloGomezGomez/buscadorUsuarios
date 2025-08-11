import { jest } from '@jest/globals';
import { UsuariosService } from '../services/usuariosService';

describe('UsuariosService', () => {
    //declaramos nuestra URL base
  const baseUrl = 'https://api.github.com';
  let service: UsuariosService;

  beforeEach(() => {
    service = new UsuariosService(baseUrl);
    // Limpiamos cualquier mock previo de fetch antes de cada una de las pruebas
    (global as any).fetch = jest.fn();
  });

  it('devuelve los datos del usuario cuando la respuesta es correcta', async () => {
    //simulamos los datos que traeria la api 
    const usuarioMock = { login: 'octocat', id: 1 };

    //simulamos una respuesta exitosa
    (global as any).fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => usuarioMock
    });

    //ejecutamos el método para obtener el usuario
    const result = await service.obtenerUsuarioPorNombre('octocat');

    //verificamos que llamamos con la URL correcta
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/users/octocat`);

    //verificamos que el resultado sea igual a los simulados
    expect(result).toEqual(usuarioMock);
  });

  it('lanza error "Usuario no encontrado" cuando status es 404', async () => {
    //simulamos un usuario no encontrado
    (global as any).fetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    });

    //Esperamos que se lance el error esperado cuando no existe un usuario
    await expect(service.obtenerUsuarioPorNombre('inexistente'))
      .rejects.toThrow('Usuario no encontrado');
  });

  it('lanza error genérico para otros códigos de estado', async () => {
    //simulamos un 500
    (global as any).fetch.mockResolvedValueOnce({
      ok: false,
      status: 500
    });

    //esperamos el mensaje de error adecuado para errores 500
    await expect(service.obtenerUsuarioPorNombre('octocat'))
      .rejects.toThrow('Error al obtener usuario: 500');
  });
});
