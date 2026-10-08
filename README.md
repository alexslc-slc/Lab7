# LAB 7: autenticación con PostgreSQL

El frontend React/Vite y la API Express están integrados en esta carpeta. Sequelize usa PostgreSQL.

## Requisitos

- Node.js 20.19+ o 22.12+
- PostgreSQL instalado y en ejecución
- Una base de datos llamada `jwt_db` (o el nombre configurado en `.env`)

## Configuración

1. Crea la base de datos en PostgreSQL, por ejemplo: `CREATE DATABASE jwt_db;`.
2. Copia `.env.example` como `.env` y configura `DB_PASSWORD` y un `JWT_SECRET` propio.
3. Desde esta carpeta, instala dependencias con `pnpm install`.

El servidor crea las tablas y los roles `user`, `admin` y `moderator` al iniciar, sin borrar los datos existentes.
El formulario permite elegir el tipo de usuario. Para evitar que cualquiera se registre con permisos elevados, configura `MODERATOR_REGISTRATION_CODE` y `ADMIN_REGISTRATION_CODE` en el entorno del servicio; esos tipos requieren su código correspondiente. El rol `user` no requiere código.

## Desarrollo

Ejecuta `pnpm dev`. Vite sirve el frontend en `http://localhost:5173` y redirige las solicitudes `/api` a Express en `http://localhost:3000`.

## Producción

Ejecuta `pnpm build` y después `pnpm start`. Express sirve el frontend compilado y la API desde el mismo puerto.

Rutas de autenticación: `POST /api/auth/signup` y `POST /api/auth/signin`.
