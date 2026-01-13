# PI-Plus Frontend

Proyecto frontend del **Trabajo Final de Grado FP DAW**.
Aplicación web desarrollada con **React + TypeScript + Vite**, orientada a la gestión de almacén y distribución de datáfonos.

El frontend está organizado siguiendo un flujo claro de responsabilidades:

**URL → Rutas → Layouts → Páginas → Componentes**

- Las **rutas** gestionan las URLs de la aplicación.
- Los **layouts** definen la estructura común (header, sidebar, footer).
- Las **páginas** representan cada vista principal.
- Los **componentes** son piezas reutilizables que construyen la interfaz.

Esta estructura facilita el mantenimiento, la reutilización de código y el trabajo en equipo.

---

## 📁 Estructura del proyecto

El proyecto sigue una estructura modular que facilita el mantenimiento, la escalabilidad y el trabajo en equipo.

```
frontend/
├─ public/
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ dashboard/
│  │  │  ├─ GridBoard.tsx
│  │  │  ├─ GridCard.tsx
│  │  │  └─ RecentActivity.tsx
│  │  ├─ Sidebar.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Button.tsx
│  │  └─ Modal.tsx
│  ├─ pages/
│  ├─ routes/
│  ├─ layouts/
│  │  ├─ AppLayout.tsx
│  │  └─ AuthLayout.tsx
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

### `routes/`

Contiene la definición de las rutas de la aplicación.

Aquí se relacionan las URLs con las páginas y los layouts correspondientes.

Ejemplo:

```
routes/
├─ AppRoutes.tsx      → Rutas principales de la aplicación
```

---

### `layouts/`

Define las estructuras base que envuelven a las páginas.

Los layouts se aplican desde las rutas y permiten reutilizar estructura visual.

Ejemplo:

```
layouts/
├─ AppLayout.tsx   → Sidebar + header + footer
└─ AuthLayout.tsx  → Layout para login y vistas públicas
```

---

### `pages/`

Cada archivo representa una página completa asociada a una ruta concreta.


```
pages/
├─ Dashboard.tsx    → Vista principal tras login
├─ Login.tsx       → /login 
```

---

### `components/`

Componentes reutilizables que construyen las páginas.
No representan rutas por sí mismos.


```
components/
├─ dashboard/
│  ├─ GridBoard.tsx       → Agrupa los GridCard del dashboard
│  ├─ GridCard.tsx        → Representa cada tarjeta GridCard individual
│  └─ RecentActivity.tsx  → Muestra la actividad reciente
├─ Sidebar.tsx
├─ Header.tsx
├─ Footer.tsx
```

---

### `services/`

Contiene la lógica de comunicación con el backend.
No forma parte directa del flujo visual de la aplicación.

--> ( NO HA SIDO AUN CREADO )

---

### `hooks/`

Hooks personalizados que encapsulan lógica reutilizable.
Se utilizan dentro de páginas y componentes.

--> ( NO HA SIDO AUN CREADO )

---

### `types/`

Definición de tipos e interfaces TypeScript para mantener tipado fuerte.

--> ( NO HA SIDO AUN CREADO )

---

## 🛠 Tecnologías utilizadas

* React
* TypeScript
* Vite
* React Router DOM
* Bootstrap
* Bootstrap Icons (Material Symbols – Google)
* CSS personalizado

---



## 👩‍💻 Autores

* **Ian Tauzy**
* **Alba Panato Alegre**

Proyecto desarrollado como parte del **Proyecto Intermodular del FP Superior en Desarrollo de Aplicaciones Web (DAW)**.
