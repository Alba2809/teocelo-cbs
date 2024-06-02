# Sistema Web Integral para el Ayuntamiento de Teocelo (Frontend)

Este proyecto es el frontend del "Sistema Web Integral para Facilitar los Procesos que se Realizan en el Ayuntamiento de Teocelo". Desarrollado con React y configurado con Vite, el sistema busca optimizar y simplificar las gestiones administrativas y operativas del ayuntamiento.

## Características

- **Interfaz amigable y moderna**: Desarrollada con componentes React para una experiencia de usuario intuitiva y eficiente.
- **Rendimiento optimizado**: Gracias a Vite, el proyecto cuenta con una configuración de desarrollo rápida y una construcción de producción altamente optimizada.
- **Gestión de usuarios**: Autenticación y autorización de usuarios para asegurar que solo el personal autorizado pueda acceder a las funcionalidades específicas.
- **Modularidad**: Diseño modular que facilita la escalabilidad y el mantenimiento del código.

## Tecnologías Utilizadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Vite**: Herramienta de desarrollo que proporciona una configuración mínima y eficiente para proyectos frontend.
- **React Router**: Para la gestión de rutas y navegación dentro de la aplicación.
- **Axios**: Para realizar solicitudes HTTP al backend.
- **Tailwind CSS**: Para estilos rápidos y responsivos.

## Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local:

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/Alba2809/teocelo-cbs
   cd teocelo-cbs
   ```

2. **Instala las dependencias**:
   
   ```bash
   npm install
   ```

4. **Configura las variables de entorno**:
   Crea un archivo .env en la raíz del proyecto y añade las variables necesarias. Por ejemplo:
   
   ```bash
   VITE_BACKEND_URL=http://localhost:4000
   ```

5. **Inicia el servidor de desarrollo**:
      
   ```bash
   npm run dev
   ```

## Scripts Disponibles
- npm run dev: Inicia el servidor de desarrollo.
- npm run build: Construye la aplicación para producción.
