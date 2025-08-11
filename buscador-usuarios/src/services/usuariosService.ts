export class UsuariosService {
    private baseUrl: string;

    //se recibe la url
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    //metodo para obtener los datos del usuario por su nombre
    async obtenerUsuarioPorNombre(nombre: string){
        //construimos la URL
        const url = `${this.baseUrl}/users/${nombre}`;

        //ejecutamos la peticion
        const res = await fetch(url);

        //verificamos la respuesta
        if (!res.ok) {
            //si el usuario no existe lanzamos error
            if (res.status === 404) throw new Error('Usuario no encontrado');

            //cualquier otro error lanzamos mensaje generico con su codigo de status
            throw new Error(`Error al obtener usuario: ${res.status}`);
        }

        //si la respuesta fue exitosa, retornamos la respuesta en formato json
        return res.json();
    }
}