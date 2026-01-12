# Setup Frontend – PI-PLUS

Documento técnico con los pasos realizados para la configuración inicial
del frontend del proyecto **PI-PLUS**.

Este archivo complementa al README principal y detalla los comandos
y configuraciones aplicadas durante el desarrollo.

---

## 🧱 Stack base del proyecto

* Vite
* React
* TypeScript
* React Router DOM
* Tailwind CSS v4

---

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

## 🎨 Instalación de Tailwind CSS (v4) en Vite

Tailwind CSS v4 introduce un enfoque **CSS-first**, donde el sistema de temas se define directamente en CSS mediante la directiva `@theme`, en lugar de hacerlo exclusivamente desde el archivo de configuración JavaScript.

### Dependencias necesarias

```bash
npm install -D tailwindcss postcss autoprefixer
```

### Plugin oficial de Tailwind para Vite

Tailwind CSS v4 requiere el plugin específico para Vite:

```bash
npm install -D @tailwindcss/vite
```

---

## ⚙️ Configuración de Tailwind CSS

### `vite.config.ts`

Se añade el plugin de Tailwind a Vite:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});
```

---

### `tailwind.config.ts`

En Tailwind CSS v4, el archivo de configuración se utiliza principalmente para definir el **scope de archivos** que Tailwind debe analizar y opciones globales como el modo oscuro.

```ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {},
  plugins: [],
} satisfies Config;
```

Los **tokens de diseño (colores, tipografías, radios, etc.)** se definen en CSS mediante `@theme`.

---

### `postcss.config.js`

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
```

---

### `src/index.css`

```css
@import "tailwindcss";

/* Tailwind CSS v4 – Definición del sistema de diseño */
@theme {
  --color-primary: #0D47A1;

  --color-background-light: #F7F9FC;
  --color-background-dark: #101922;

  --color-text-light: #333333;
  --color-text-dark: #E0E0E0;

  --color-card-light: #FFFFFF;
  --color-card-dark: #1A2633;

  --color-border-light: #CFDBE7;
  --color-border-dark: #334155;

  --color-placeholder-light: #64748B;
  --color-placeholder-dark: #94A3B8;

  --font-display: Manrope, system-ui, sans-serif;

  --radius: 0.25rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-full: 9999px;
}

body {
  font-family: var(--font-display);
}
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

## 📝 Notas importantes

* No se utiliza el CDN de Tailwind CSS
* Tailwind se integra mediante Vite y PostCSS
* La estructura del proyecto separa rutas, layouts y páginas
* El Login es la página principal de acceso a la plataforma
* El sistema de colores y tokens visuales se gestiona mediante variables CSS (`@theme`) propias de Tailwind CSS v4
