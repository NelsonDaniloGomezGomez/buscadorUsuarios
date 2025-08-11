## Buscador de usuarios de GITHUB:
Aplicación de búsqueda de usuarios de github con las tecnologias que se detallan ahora.

## Tecnologias:
- Web Components
- TypeScript@5.8.3
- Vite@7.1.1

## Características
- Búsqueda dinámica de usuarios desde la API pública de GitHub
- Visualización de usuario por medio de tarjeta
- Manejo de errores con mensajes claros
- Diseño responsivo para móviles y escritorios
- Comunicación de componentes mediante eventos

## Obteneción, instalación y ejecución
1- Clona el repositorio desde github
    - Comando: git clone https://github.com/NelsonDaniloGomezGomez/buscadorUsuarios.git

2- Ingresa a la carpeta del proyecto
    - Comando: cd buscador-usuarios

3- Instala las dependencias
    - Comando: npm install

4- Ejecutar el proyecto
    - Comando: npm run dev

5- Ingresa al navegador
    - URL: http://localhost:4200/

## Como usar la aplicación
- Escriba un nombre dentro de la barra de búsqueda.
- La tarjeta mostrará la información del usuario, si no lo encuentra un mensaje de error
- La aplicación es responsiva funcionando adecuadamente en móvil y escritorio.

## Pruebas
Para ejecutar las pruebas unitarias creadas con jest solo debe escribir en el terminal
    -Comando: npm test

## Mejoras futuras posibles
- Mantener en memoria o en una base de datos un listado de los usuarios consultados para evitar consultas repetidas.

- Agregar otros endpoints de la API de GitHub para consultas masivas, permitiendo filtrar por algun parámetro como ubicación, número de repos o actividad

- Precargar el listado de usuarios y mostrar sugerencias dinámicas conforme se escribe en el input.