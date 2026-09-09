# API REST de Inventario - TechStore

API REST desarrollada con **Express.js** y **TypeScript** para la gestión de inventario de la tienda TechStore. Los datos se almacenan en memoria.

## Requisitos

- Node.js 16+
- npm 7+

## Instalación

1. Clonar o descargar el repositorio
2. Instalar dependencias:

```bash
npm install
```

## Ejecución

### Desarrollo (con hot reload)
```bash
npm run dev
```

### Compilar TypeScript
```bash
npm run build
```

### Verificar tipos
```bash
npm run typecheck
```

### Ejecutar versión compilada
```bash
npm run start
```

### Verificación completa (typecheck + build)
```bash
npm run check
```

La API estará disponible en: **http://localhost:3000**

## Endpoints

### 1. Listar todos los elementos
```http
GET /api/inventory
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Mouse Logitech MX Master",
      "sku": "MOU-001",
      "price": 420000,
      "stock": 12,
      "active": true
    }
  ],
  "total": 1
}
```

### 2. Consultar un elemento por ID
```http
GET /api/inventory/:id
```

**Parámetros:**
- `id` (path): ID numérico del elemento

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Mouse Logitech MX Master",
    "sku": "MOU-001",
    "price": 420000,
    "stock": 12,
    "active": true
  }
}
```

**Errores:**
- `400`: ID inválido (no es un número positivo)
- `404`: Elemento no encontrado

### 3. Crear un elemento
```http
POST /api/inventory
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Mouse Logitech MX Master",
  "sku": "MOU-001",
  "price": 420000,
  "stock": 12,
  "active": true
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "data": {
    "id": 4,
    "name": "Mouse Logitech MX Master",
    "sku": "MOU-001",
    "price": 420000,
    "stock": 12,
    "active": true
  }
}
```

**Errores:**
- `400`: Validación fallida (campos faltantes o inválidos)

### 4. Actualizar un elemento (parcial)
```http
PATCH /api/inventory/:id
Content-Type: application/json
```

**Parámetros:**
- `id` (path): ID numérico del elemento

**Body (enviar solo los campos a actualizar):**
```json
{
  "stock": 20,
  "active": false
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Mouse Logitech MX Master",
    "sku": "MOU-001",
    "price": 420000,
    "stock": 20,
    "active": false
  }
}
```

**Errores:**
- `400`: ID inválido, body vacío o campos inválidos
- `404`: Elemento no encontrado

**Restricciones:**
- No se puede modificar el `id`
- No se aceptan campos desconocidos
- Body no puede estar vacío

### 5. Eliminar un elemento
```http
DELETE /api/inventory/:id
```

**Parámetros:**
- `id` (path): ID numérico del elemento

**Respuesta exitosa (204):** Sin contenido

**Errores:**
- `400`: ID inválido
- `404`: Elemento no encontrado

## Filtros y búsqueda

### Filtrar por estado (activo/inactivo)
```http
GET /api/inventory?active=true
GET /api/inventory?active=false
```

### Buscar por nombre
```http
GET /api/inventory?search=mouse
```

La búsqueda es case-insensitive (sin diferenciar mayúsculas/minúsculas) y busca coincidencias parciales.

### Combinar filtros
```http
GET /api/inventory?active=true&search=mouse
```

## Reglas de validación

| Campo | Regla |
|-------|-------|
| `id` | Entero positivo (solo en rutas con `:id`) |
| `name` | Obligatorio, string no vacío tras trim() |
| `sku` | Obligatorio, string no vacío tras trim() |
| `price` | Número finito mayor que 0 |
| `stock` | Entero mayor o igual que 0 |
| `active` | Boolean (verdadero/falso) |

## Códigos HTTP utilizados

| Código | Significado |
|--------|-------------|
| 200 | OK - Consultas y actualizaciones exitosas |
| 201 | Created - Elemento creado exitosamente |
| 204 | No Content - Eliminación exitosa |
| 400 | Bad Request - Datos o ID inválidos |
| 404 | Not Found - Recurso no encontrado |

## Estructura del proyecto

```
src/
├── index.ts          # Servidor Express
├── types.ts          # Interfaces TypeScript
├── data.ts           # Almacenamiento en memoria e ID generator
├── validation.ts     # Funciones de validación
└── routes.ts         # Rutas y handlers
```

## Ejemplo de prueba con Thunder Client

1. Abre la extensión Thunder Client en VS Code
2. Crea una nueva solicitud con el método GET
3. URL: `http://localhost:3000/api/inventory`
4. Presiona Send para ver todos los elementos

Para crear un elemento:
1. Método: POST
2. URL: `http://localhost:3000/api/inventory`
3. Headers: `Content-Type: application/json`
4. Body:
```json
{
  "name": "Mi nuevo producto",
  "sku": "NEW-001",
  "price": 50000,
  "stock": 5,
  "active": true
}
```

## Notas importantes

- Los datos se almacenan únicamente en memoria. Al reiniciar el servidor, los cambios se pierden.
- No se utiliza base de datos.
- TypeScript está configurado en modo `strict`.
- No se utiliza `any` en los tipos de datos recibidos.

## Autor

Mini-proyecto evaluable - Módulo III - Curso Express.js con TypeScript
