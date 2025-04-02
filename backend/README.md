
# Backend - Prueba Técnica LicitaLab

Este es el Backend de la Prueba Técnica. Está diseñado con NestJS y cuenta con 3 endpoints principales.

## Características principales

- **NestJS 11**
- **PostgreSQL**
- **Swagger**

## Estructura del proyecto

```
backend/
├── docker-compose.yaml
├── eslint.config.mjs
├── nest-cli.json
├── package.json
├── package-lock.json
├── prisma
│   └── schema.prisma
├── README.md
├── src
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
│   ├── opportunities
│   │   ├── dto
│   │   ├── entities
│   │   ├── opportunities.controller.ts
│   │   ├── opportunities.module.ts
│   │   ├── opportunities.service.spec.ts
│   │   └── opportunities.service.ts
│   └── prisma.service.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json
```

## Requisitos previos

- Node.js (v20 o superior recomendado)
- npm (v10 o superior)

## Instalación

**1. Clona el repositorio**
```bash
git clone https://github.com/matias-rojas-dev/prueba-tecnica-licitalab
```
**2. Accede a la carpeta backend:**
```bash
cd backend
```
**3. Instala las dependencias:**
```bash
npm install
```

**4. Base de Datos**

Para los primeros dos casos, la estructura del string de conexión a la DB que debe estar dentro de un archivo `.env` debe ser el siguiente:
```bash
DATABASE_URL = postgresql://[USER_NAME]:[PASSWORD]@[HOST]:[PUERTO]/[DB_NAME]?schema=public
```
- **`USER_NAME`**: Usuario de la DB.  
- **`PASSWORD`**: Contraseña asignada.  
- **`HOST`**: Host (usar `localhost` si falla).  
- **`PUERTO`**: Puerto predeterminado de PostgreSQL.  
- **`DB_NAME`**: Nombre de la base de datos creada.  

**4.1. Docker:** En caso de tener Docker instalado, debes ejecutar el siguiente comando: 
```bash
docker-compose up
```
Esto levantará y configurará la Base de Datos que está definida en el docker-compose.yaml, creando contenedores y redes necesarias para que funcionen. Si es la primera vez, también descargará la imagen de PostgreSQL. Si es que quieres que la DB corra en otro puerto, con otro nombre o credenciales, debes cambiarlos en el archivo `docker-compose.yaml` antes de ejercutar el comando.

**4.2. Local DB:** Debes crear la Base de Datos y añadir la tabla de "Opportunities", y luego reemplazar los valores en el string de conexión anteriormente mencionado.

**IMPORTANTE: Tanto para el caso 4.1 como para el 4.2 la Base de Datos tiene que estar poblada, así que debes ejecutar la consulta `INSERT INTO "Opportunities"` que fue enviada en las instrucciones en la Base de Datos que se creó.**

**4.3. Conexión a DB en Supabase:** Se ha creado una DB en Supabase en caso de no poder realizar ninguna de las 3 anteriores. Para ello, se enviará por correo el string de conexión en un archivo `.env`.

**5. Crea el cliente de Prisma basado en el esquema (schema.prisma):**
```bash
npx prisma migrate dev --name init
```

**6. Ejecutar la aplicación:** 

Para levantar el servidor, debes ejecutar el siguiente comando:
```code
npm run start:dev
```
Mensaje de salida:
```code
[Nest] 69368  - 04/01/2025, 9:07:59 PM     LOG [NestFactory] Starting Nest application...
[Nest] 69368  - 04/01/2025, 9:07:59 PM     LOG [InstanceLoader] AppModule dependencies initialized +8ms
[Nest] 69368  - 04/01/2025, 9:07:59 PM     LOG [InstanceLoader] OpportunitiesModule dependencies initialized +0ms
[Nest] 69368  - 04/01/2025, 9:07:59 PM     LOG [RoutesResolver] OpportunitiesController {/opportunities}: +4ms
[Nest] 69368  - 04/01/2025, 9:07:59 PM     LOG [RouterExplorer] Mapped {/opportunities, GET} route +1ms
[Nest] 69368  - 04/01/2025, 9:07:59 PM     LOG [RouterExplorer] Mapped {/opportunities/followed, GET} route +1ms
[Nest] 69368  - 04/01/2025, 9:07:59 PM     LOG [RouterExplorer] Mapped {/opportunities/:id, PATCH} route +1ms
[Nest] 69368  - 04/01/2025, 9:08:02 PM     LOG [NestApplication] Nest application successfully started +2491ms
```

## Documentación
La aplicación tiene una documentación hecha en Swagger, la cual está en la siguiete ruta:
```code
http://localhost:3000/api
```

## Test
En caso que desees ejecutar el test que tiene la aplicación debes ejecutar el siguiente comando:
```code
npm run test
```
