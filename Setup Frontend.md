# Setup Frontend – PI-PLUS

Documento técnico con los pasos realizados para la configuración inicial
del frontend del proyecto **PI-PLUS**.

Este archivo complementa al README principal y detalla los comandos
y configuraciones aplicadas durante el desarrollo.


## 📦 Instalación inicial del proyecto

Instalar las dependencias base del proyecto:

```bash
npm install
```

---

## 🧭 Instalación de React Router

Se utiliza React Router para la gestión de rutas de la aplicación.

```bash
npm install react-router-dom
```

---

## 🎨 Instalación de Bootstrap

Bootstrap se utiliza como framework de estilos principal del proyecto.

Instalación mediante npm:

```bash
npm install bootstrap
```

Importación de Bootstrap en el punto de entrada del proyecto (`main.tsx`):

```ts
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
```

---

## 🎨 Iconos – Google Material Symbols

El proyecto utiliza **Google Material Symbols** como sistema de iconos.

Se cargan desde Google Fonts en el archivo `index.html`.

Uso básico:

```tsx
<span className="material-symbols-outlined">dashboard</span>
```

No se utilizan librerías adicionales ni componentes React para los iconos.

### 🎨 Como se utilizan (Google Material Symbols)

Para usar un icono, se debe incluir un `<span>` con la clase:

```tsx
<span className="material-symbols-outlined">icon_name</span>
```

Donde `icon_name` es el nombre del icono proporcionado por Google (por ejemplo: `dashboard`, `inventory_2`, `flare`, etc.).

Los iconos se cargan globalmente desde `index.html` mediante Google Fonts.

```html
    <link
      href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
      rel="stylesheet"
    />

    <link
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
      rel="stylesheet"
    />
```

---

## ▶️ Ejecución del proyecto

Para arrancar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación se ejecuta por defecto en:

```
http://localhost:5173
```

---

