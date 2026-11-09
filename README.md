# BackToMe — objetos perdidos y encontrados UDB

BackToMe es una aplicación web para que la comunidad de la Universidad Don Bosco publique, busque y gestione reportes de objetos perdidos y encontrados.

## Aporte individual y trabajo del equipo

### Mi aporte individual: integración de Cloudinary

Integré Cloudinary para almacenar las fotografías adjuntas a los reportes de objetos. Al publicar un objeto, el servidor valida la imagen y la envía a Cloudinary mediante su API de carga. La base de datos guarda la URL segura que devuelve el servicio, y la aplicación utiliza esa URL para mostrar la foto.

La solicitud a Cloudinary se realiza desde el servidor. La clave secreta no se expone en React ni en el navegador. Si Cloudinary no está configurado, el servidor conserva el mecanismo local anterior para guardar la foto en la base de datos.

### Framework del proyecto: React

El equipo eligió React 19 para las pantallas de inicio de sesión y registro, junto con Vite y React Router. Estas pantallas usan componentes reutilizables para campos, botones, alertas, diseño de acceso, cambio de tema y visibilidad de contraseña, y consumen la API del servidor para registrar e iniciar sesión. Después de un inicio correcto, se abre el dashboard existente.

La migración a React cubre las pantallas de acceso de esta entrega. El dashboard y los módulos de objetos, solicitudes y mensajes conservan su implementación previa en HTML, CSS y JavaScript.

## Funciones principales

- Registro con nombre, apellido, carnet, carrera, correo y contraseña.
- Verificación del correo electrónico antes de iniciar sesión.
- Inicio de sesión y manejo de sesiones mediante la API del servidor.
- Publicación y búsqueda de objetos perdidos y encontrados, con foto, categoría, descripción, ubicación y fecha.
- Gestión de publicaciones propias.
- Envío y respuesta a solicitudes, y conversación entre participantes.
- Interfaz adaptable, con tema claro y oscuro.

## Tecnologías

- **Frontend de acceso:** React, React Router y Vite.
- **Módulos existentes:** HTML, CSS y JavaScript.
- **Servidor:** Node.js y Express.
- **Base de datos:** MySQL/MariaDB, conectada con `mysql2`.
- **Fotos:** API de carga de imágenes de Cloudinary.
- **Correo:** Nodemailer para verificación de cuentas.

## Carpetas y archivos

- `react-app/`: aplicación React, rutas, páginas y componentes reutilizables.
- `server.js`: servidor Express, endpoints, conexión a base de datos y carga segura de imágenes a Cloudinary.
- `js/` y `css/`: comportamiento y estilos de los módulos existentes.
- `database/`: migraciones SQL para los campos del registro, sesiones y fotos.
- `documentacion/`: documento de investigación sobre las librerías JavaScript.
- `imagenes.img/`: recursos gráficos del proyecto.
- `.env.example`: plantilla de configuración sin credenciales reales.

## Configuración local

Se necesita Node.js 18 o posterior, npm y una base MySQL/MariaDB con el esquema inicial del proyecto.

1. Copia `.env.example` como `.env` y completa localmente las credenciales de la base de datos, el correo y Cloudinary. No subas `.env` a GitHub.
2. Instala las dependencias desde la carpeta raíz:

   ```bash
   npm install
   ```

3. Si la base todavía no tiene los campos y la tabla de sesiones requeridos, pide a una cuenta con permisos administrativos que ejecute, en la base `backtome`, `database/auth-migration.sql` y `database/contenido-migration.sql`. No vuelvas a ejecutar cambios ya aplicados.
4. Inicia el backend en una terminal:

   ```bash
   npm start
   ```

5. Inicia React en otra terminal:

   ```bash
   npm run dev
   ```

6. Abre `http://localhost:5173/login`.

## Variables de entorno

`.env.example` indica las variables necesarias:

- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` y `DB_NAME` para MySQL/MariaDB.
- `SMTP_USER` y `SMTP_APP_PASSWORD` para enviar el correo de verificación.
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` y `CLOUDINARY_API_SECRET` para guardar las fotos en Cloudinary.
- `PORT` y `APP_BASE_URL` para la dirección local del servidor.

Las credenciales reales se configuran únicamente en el `.env` local, que está excluido mediante `.gitignore`.
