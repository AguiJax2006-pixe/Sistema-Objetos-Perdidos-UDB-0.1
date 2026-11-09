# BackToMe – Sistema de Objetos Perdidos UDB

## Descripción del proyecto

**BackToMe** es un sistema web desarrollado para la Universidad Don Bosco (UDB), cuyo propósito es facilitar la publicación, búsqueda y recuperación de objetos perdidos dentro de la comunidad universitaria.

La plataforma permite gestionar objetos extraviados y encontrados, así como facilitar la comunicación entre los estudiantes mediante una interfaz web.

## Objetivo

Desarrollar una aplicación web que facilite el proceso de recuperación de objetos perdidos, ofreciendo una plataforma accesible, organizada y adaptable a diferentes dispositivos.

## Tecnologías utilizadas

### Frontend
- HTML5
- CSS3
- JavaScript
- React
- Vite
- Bootstrap

### Backend
- Node.js
- Express.js

### Base de datos
- MySQL

### Herramientas de desarrollo
- Visual Studio Code
- Git
- GitHub
- XAMPP
- phpMyAdmin

## Implementación de React – Andrea

Como parte de la migración del proyecto al framework React, se desarrolló una estructura inicial para organizar las pantallas y los componentes reutilizables.

### Actividades realizadas

1. Configuración de la estructura inicial de React y Vite.
2. Creación de componentes reutilizables.
3. Desarrollo de una estructura visual compartida.
4. Migración de la pantalla de inicio de sesión.
5. Migración de la pantalla de registro.
6. Adaptación del diseño para diferentes tamaños de pantalla.
7. Implementación de estilos y elementos visuales compartidos.
8. Preparación de la integración con el backend existente.

### Componentes desarrollados

| Componente | Descripción |
|---|---|
| AuthLayout | Estructura compartida de autenticación |
| Brand | Identidad visual de BackToMe |
| StoryPanel | Panel visual informativo |
| FormField | Campos reutilizables de formulario |
| PasswordToggle | Mostrar u ocultar contraseñas |
| PrimaryButton | Botón principal reutilizable |
| Alert | Mensajes de información y errores |
| ThemeToggle | Control del tema visual |

### Páginas desarrolladas

- LoginPage.jsx: pantalla de inicio de sesión.
- RegisterPage.jsx: pantalla de registro.

## Estructura del proyecto React

```text
react-app/
├── public/
│   ├── css/
│   ├── js/
│   ├── imagenes.img/
│   └── dashboard.html
│
├── src/
│   ├── components/
│   │   ├── Alert.jsx
│   │   ├── AuthLayout.jsx
│   │   ├── Brand.jsx
│   │   ├── FormField.jsx
│   │   ├── PasswordToggle.jsx
│   │   ├── PrimaryButton.jsx
│   │   ├── StoryPanel.jsx
│   │   └── ThemeToggle.jsx
│   │
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   │
│   ├── main.jsx
│   ├── acceso.css
│   └── styles.css
│
├── index.html
├── vite.config.js
└── .env.example
```

## Instalación y ejecución

### Requisitos previos

- Node.js y npm.
- MySQL.
- XAMPP.
- Visual Studio Code.

### 1. Clonar el repositorio

```bash
git clone https://github.com/AguiJax2006-pixe/Sistema-Objetos-Perdidos-UDB-0.1.git
```

### 2. Instalar dependencias

Desde la carpeta principal del proyecto:

```bash
npm install
```

### 3. Configurar las variables de entorno

Crear el archivo `.env` en la raíz del proyecto, utilizando `.env.example` como referencia.

Configurar los datos correspondientes a la base de datos y al servicio de correo electrónico.

Dentro de `react-app`, configurar también las variables de entorno necesarias para React, tomando como referencia su archivo `.env.example`.

No compartir los archivos `.env` ni publicar credenciales privadas.

### 4. Iniciar el backend

```bash
npm start
```

El servidor se ejecuta en:

```text
http://localhost:3000
```

### 5. Iniciar React

En una segunda terminal:

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:5173
```

### 6. Compilar para producción

```bash
npm run build
```

## Trabajo colaborativo

El desarrollo del proyecto se organiza mediante ramas de Git para facilitar el trabajo independiente y la integración de los módulos.

### Rama de Andrea

`feature/react-andrea`

Responsable de la estructura visual, componentes reutilizables y migración de las pantallas de inicio de sesión y registro a React.

### Integración

Los cambios desarrollados en las diferentes ramas serán revisados e integrados mediante Pull Requests.

## Estado de la migración

- Estructura inicial de React: desarrollada.
- Componentes reutilizables: desarrollados.
- Inicio de sesión: migrado visualmente.
- Registro: migrado visualmente.
- Compilación de producción: comprobada.
- Integración definitiva con la base de datos y el servicio de correo: pendiente de validación en el entorno integrado.

## Autoras

**Proyecto BackToMe – Universidad Don Bosco**

- Andrea Michelle Jiménez Aguilar
- Kimberly Alexandra Rivera Lopez

## Repositorio

[GitHub – Sistema de Objetos Perdidos UDB](https://github.com/AguiJax2006-pixe/Sistema-Objetos-Perdidos-UDB-0.1)