import { defineConfig } from 'vite';

//configuración para usar el puerto 4200.
//strictPort asegura que la aplicación solo se inicie en ese puerto.
//si no está disponible, la aplicación fallará al arrancar.
//si se quita strictPort, Vite buscará y usará automáticamente un puerto disponible.
export default defineConfig({
  base: '/buscadorUsuarios/',
  server: {
    port: 4200,
    strictPort: true,
  },
});