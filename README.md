# PI-Plus Frontend

Proyecto frontend del **Trabajo Final de Grado FP DAW**.
Aplicación web desarrollada con **React + TypeScript + Vite**, orientada a la gestión de almacén y distribución de datáfonos.

---

## 📁 Estructura del proyecto

El proyecto sigue una estructura modular que facilita el mantenimiento, la escalabilidad y el trabajo en equipo.

```
frontend/
├─ public/
├─ src/
│  ├─ assets/
│  ├─ components/
│  ├─ pages/
│  ├─ routes/
│  ├─ layouts/
│  ├─ services/
│  ├─ hooks/
│  ├─ types/
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css
├─ index.html
├─ package.json
└─ vite.config.ts
```

---

## 📄 Descripción de carpetas y archivos

### `main.tsx`

Punto de entrada de la aplicación.
Se encarga de montar la aplicación React y envolverla con el sistema de enrutado.

**No se definen rutas aquí**, solo se inicializa la app.

---

### `App.tsx`

Archivo principal de la aplicación.

* Define el **mapa de rutas**
* Decide qué página se muestra según la URL
* No contiene lógica de negocio ni diseño complejo

---

### `pages/`

Cada archivo representa una **página completa** de la aplicación y está asociada a una ruta.

Ejemplos:

```
pages/
├─ Home.tsx        → /
├─ Login.tsx       → /login
├─ Equipos.tsx     → /equipos
├─ EquipoDetalle.tsx → /equipos/:id
├─ Expediciones.tsx
└─ NotFound.tsx
```

---

### `components/`

Componentes reutilizables que se usan dentro de las páginas.

Ejemplos:

```
components/
├─ Navbar.tsx
├─ Footer.tsx
├─ Button.tsx
├─ Modal.tsx
└─ EquipoCard.tsx
```

Estos componentes **no representan rutas**, solo partes visuales o funcionales.

---

### `layouts/`

Define estructuras comunes para varias páginas.

Ejemplos:

```
layouts/
├─ MainLayout.tsx   → Navbar + contenido principal
└─ AuthLayout.tsx   → Layout para login (sin navbar)
```

Permiten reutilizar diseño y mantener coherencia visual.

---

### `routes/`

Contiene la organización de las rutas de la aplicación.

Ejemplo:

```
routes/
├─ AppRoutes.tsx
├─ AuthRoutes.tsx
└─ PrivateRoutes.tsx
```

Facilita la separación entre rutas públicas, privadas y de autenticación.

---

### `services/`

Encargada de la comunicación con el backend (API REST).

Ejemplos:

```
services/
├─ auth.service.ts
├─ equipos.service.ts
└─ expediciones.service.ts
```

---

### `hooks/`

Hooks personalizados para encapsular lógica reutilizable.

Ejemplos:

```
hooks/
├─ useAuth.ts
└─ useEquipos.ts
```

---

### `types/`

Definición de tipos e interfaces TypeScript para mantener tipado fuerte.

Ejemplos:

```
types/
├─ Usuario.ts
├─ Equipo.ts
└─ Expedicion.ts
```

---

## 🚀 Instalación y ejecución

Instalar dependencias:

```bash
npm install
```

Ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

La aplicación se abrirá por defecto en:

```
http://localhost:5173
```

---

## 🛠 Tecnologías utilizadas

* React
* TypeScript
* Vite
* React Router
* ESLint

---

## 👩‍💻 Autores

* **Ian Tauzy**
* **Alba Panato Alegre**

Proyecto desarrollado como parte del **Proyecto Intermodular del FP Superior en Desarrollo de Aplicaciones Web (DAW)**.
