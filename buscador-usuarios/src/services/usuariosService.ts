export class UsuariosService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async obtenerUsuarioPorNombre(nombre: string){
        const url = `${this.baseUrl}/users/${nombre}`;
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Error al obtener usuario: ${res.status}`);
        }

        return res.json();
    }
}