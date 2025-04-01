
# Frontend - Prueba Técnica LicitaLab

Este proyecto es un frontend desarrollado con React, TS y Redux, diseñado para ofrecer una experiencia de usuario rápida y eficiente.

## Características principales

- **React 19 con Vite** 
- **TypeScript** para tipado estático
- **Material UI** para los componentes.

## Estructura del proyecto

```
frontend/
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── public
│   └── vite.svg
├── README.md
├── src
│   ├── api
│   │   └── index.ts
│   ├── app
│   │   ├── features
│   │   └── store.ts
│   ├── App.css
│   ├── AppRouting.tsx
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── Calendar.tsx
│   │   ├── Filters.tsx
│   │   ├── Loading.tsx
│   │   ├── OpportunitiesTable.tsx
│   │   ├── PaginationTable.tsx
│   │   ├── SideNav.tsx
│   │   └── index.ts
│   ├── index.css
│   ├── index.tsx
│   ├── interfaces
│   │   └── opportunity.interface.ts
│   ├── pages
│   │   ├── FollowedOpportunitiesPage.tsx
│   │   ├── OpportunitiesPage.tsx
│   │   └── index.ts
│   ├── utils
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Requisitos previos

- Node.js (v20 o superior recomendado)
- npm (v10 o superior)

## Instalación

1. Clona el repositorio
```bash
git clone https://github.com/matias-rojas-dev/prueba-tecnica-licitalab
```
2. Accede a la carpeta frontend:
```bash
cd frontend
```
3. Instala las dependencias:
```bash
npm install
```
4. Debes crear un archivo .env y añadir la url del Backend:
```code
VITE_BACKEND_URL = http://localhost:3000
```
Si tu servidor está en otro puerto debes cambiar el del ejemplo por el que corresponde. Además, no olvides que debes tener arriba tu servicio antes de levantar el frontend.

4. Levanta la aplicación:
```bash
npm run dev
```
5. La aplicación correrá en el puerto 5173