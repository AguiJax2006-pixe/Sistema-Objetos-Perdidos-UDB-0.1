# Migración de acceso a React — BackToMe

## Estructura incorporada

La migración se encuentra dentro de `react-app/` para mantener separadas las nuevas pantallas React del resto de páginas HTML que siguen utilizando el equipo.

- `react-app/index.html`: documento raíz de React.
- `react-app/src/main.jsx`: punto de entrada y rutas.
- `react-app/src/pages/`: páginas `LoginPage` y `RegisterPage`.
- `react-app/src/components/`: `AuthLayout`, `StoryPanel`, `Brand`, `ThemeToggle`, `FormField`, `PasswordToggle`, `Alert` y `PrimaryButton`.
- `react-app/src/styles.css`: importa los estilos visuales existentes y agrega ajustes de accesibilidad y adaptación.
- `react-app/public/`: logo y páginas/recursos heredados necesarios para que el dashboard y los módulos actuales sigan accesibles después del inicio de sesión.

## Cómo ejecutar

1. Instalar dependencias desde la carpeta raíz del proyecto:
   `npm install`
2. Iniciar el backend en una terminal:
   `npm start`
3. Iniciar React en otra terminal:
   `npm run dev`
4. Abrir la dirección que indique Vite (por defecto `http://localhost:5173/login`).

El backend debe estar activo en `http://localhost:3000`. Si cambia esa dirección, crear `react-app/.env` a partir del ejemplo y definir `VITE_API_AUTH_URL`, por ejemplo:
`VITE_API_AUTH_URL=http://localhost:3000/api/auth`

## Integración conservada

- Inicio de sesión: `POST /api/auth/login`, enviando `correo`, `carnet` y `password`.
- Registro: `POST /api/auth/register`, enviando `nombre`, `apellido`, `carnet`, `carrera`, `correo` y `password`.
- La sesión se guarda en `localStorage` bajo `sesionActual`, con `apiToken` y `origenAutenticacion: "api"`, igual que el cliente anterior.
- El registro conserva la verificación de correo gestionada por el servidor.
- Se conserva la clave `btmTema` para recordar el tema claro/oscuro.

## Componentes reutilizables

| Componente | Responsabilidad |
|---|---|
| `AuthLayout` | Estructura común de acceso, panel lateral y contenido |
| `StoryPanel` | Presentación y pasos informativos |
| `Brand` | Logo y nombre de BackToMe |
| `ThemeToggle` | Cambio y persistencia del tema |
| `FormField` | Campo etiquetado y controlado |
| `PasswordToggle` | Mostrar/ocultar contraseña |
| `Alert` | Mensajes de error y confirmación |
| `PrimaryButton` | Botón principal con estado de carga |

## Evidencias sugeridas para la entrega

Capturar desde el navegador:
1. `http://localhost:5173/login` en escritorio.
2. `http://localhost:5173/registro` en escritorio.
3. Ambas pantallas en vista móvil (herramientas de desarrollador o dispositivo móvil).
4. Una captura del tema oscuro.
5. Una captura de la estructura de carpetas `react-app/src`.

## Alcance

Las pantallas de inicio de sesión y registro ahora están implementadas con componentes React y consumen los endpoints existentes. Las páginas funcionales de los módulos internos continúan siendo HTML/JavaScript en esta entrega; se mantienen copiadas a `react-app/public` para conservar la navegación posterior al inicio de sesión. No se modificó la lógica del servidor ni el esquema de MySQL.

## Fuentes para documentar React (formato APA 7)

- Meta Open Source. (s. f.). *React: The library for web and native user interfaces*. https://react.dev/
- Vite. (s. f.). *Vite: Next generation frontend tooling*. https://vite.dev/
- React Router. (s. f.). *React Router documentation*. https://reactrouter.com/

Consulta las páginas oficiales y registra la fecha de recuperación si tu docente la solicita. Estas fuentes respaldan la explicación del framework, el entorno de desarrollo y el enrutamiento.
