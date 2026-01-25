# PI-PLUS Frontend

Proyecto frontend del **Proyecto Intermodular – FP DAW**.  
Aplicación web desarrollada con **React + TypeScript + Vite**, orientada a la **gestión de almacén y control de datáfonos**.

El frontend sigue un flujo claro y predecible de responsabilidades:

**URL → Rutas → Layouts → Páginas → Componentes**

Este enfoque facilita el mantenimiento, la escalabilidad y el trabajo en equipo.

---

## 🧭 Flujo de la aplicación

1. **URL**  
   El usuario accede a una ruta concreta (`/login`, `/dashboard`, `/stock-ubicacion`, etc.).

2. **Routes (`AppRoutes`)**  
   Se decide qué página cargar y qué layout aplicar.

3. **Layouts**  
   Definen la estructura visual común (sidebar, header, footer).

4. **Pages**  
   Representan vistas completas asociadas a una URL.

5. **Components**  
   Piezas reutilizables que construyen cada página.

---

## 📁 Estructura del proyecto

frontend/
├─ public/
├─ src/
│  ├─ assets/
│  │  └─ react.svg
│  ├─ components/
│  │  ├─ dashboard/
│  │  │  ├─ GridBoard.tsx
│  │  │  ├─ GridCard.tsx
│  │  │  └─ RecentActivity.tsx
│  │  ├─ SNSearch/
│  │  │  ├─ SNSearchForm.tsx
│  │  │  ├─ SNSearchHeader.tsx
│  │  │  └─ SNSearchResult.tsx
│  │  ├─ stockUbication/
│  │  │  ├─ forms/
│  │  │  │  ├─ AddBoxButton.tsx
│  │  │  │  └─ AddPalletButton.tsx
│  │  │  ├─ Aisle.tsx
│  │  │  ├─ Shelf.tsx
│  │  │  └─ Slot.tsx
│  │  ├─ Header.tsx
│  │  ├─ Footer.tsx
│  │  └─ Sidebar.tsx
│  ├─ hooks/
│  ├─ layouts/
│  │  ├─ AppLayout.tsx
│  │  └─ AuthLayout.tsx
│  ├─ mocks/
│  │  ├─ apiDatafonos.ts
│  │  ├─ apiDetallesAlmacen.ts
│  │  └─ apiDetallesPale.ts
│  ├─ pages/
│  │  ├─ Dashboard.tsx
│  │  ├─ Login.tsx
│  │  ├─ SNSearchPage.tsx
│  │  └─ StockUbicationPage.tsx
│  ├─ routes/
│  │  └─ AppRoutes.tsx
│  ├─ services/
│  ├─ styles/
│  ├─ types/
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css
├─ index.html
├─ package.json
└─ vite.config.ts

---

## 📄 Descripción de carpetas y archivos

### `main.tsx`
Punto de entrada de la aplicación.  
Inicializa React, React Router y los estilos globales (Bootstrap).

---

### `App.tsx`
Componente raíz de la aplicación.  
Carga el sistema de rutas principal.

---

### `routes/AppRoutes.tsx`
Define las rutas de la aplicación y decide qué layout y página se renderizan según la URL.

---

### `layouts/`
Define las **capas visuales** de la aplicación.

- `AppLayout.tsx` → Zona privada (sidebar + header + contenido)
- `AuthLayout.tsx` → Zona pública (login)

---

### `pages/`
Cada archivo representa una **vista completa** asociada a una URL.

- `Dashboard.tsx`
- `Login.tsx`
- `SNSearchPage.tsx`
- `StockUbicationPage.tsx`

---

### `components/`
Componentes reutilizables que construyen las páginas.

#### Dashboard
Componentes visuales del dashboard principal.

#### SNSearch
Componentes para la búsqueda de datáfonos por número de serie.

#### StockUbication
Componentes que representan el mapa del almacén:
- Pasillos (Aisle)
- Estanterías (Shelf)
- Huecos (Slot)
- Formularios de cajas y palés

---

### `mocks/`
Simulación de respuestas de la API backend durante el desarrollo.

---

### `services/`
Contendrá la lógica de comunicación real con el backend (pendiente).

---

### `hooks/`
Hooks personalizados para encapsular lógica reutilizable (pendiente).

---

### `types/`
Interfaces y tipos TypeScript compartidos (pendiente).

---

## 🛠 Tecnologías utilizadas

- React
- TypeScript
- Vite
- React Router DOM
- Bootstrap
- Google Material Symbols
- CSS personalizado

---

## 👩‍💻 Autores

- **Ian Tauzy**
- **Alba Panato Alegre**

Proyecto desarrollado como parte del **Proyecto Intermodular del FP Superior en Desarrollo de Aplicaciones Web (DAW) - IES Doctor Balmis**.