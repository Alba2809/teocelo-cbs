## Instalación

1. Clonar repositorio
2. Instalar dependencias del api y client: 'npm install'

## Uso

1. Iniciar los servidores, para el api y client: 'npm run dev'
2. Al iniciar el servidor del backend, si este verifica que no hay usuarios registrados entonces creará algunos de prueba. En caso de desear crearlos sin importar si hay o no usuarios ya registrados, ir al archivo api > src > libs > initialSetup.js , comentar la línea 31 y guardar los cambios. Una vez que el servidor se haya terminado de cargar, volver a descomentar dicha línea para que no vuelva a crearlos.
