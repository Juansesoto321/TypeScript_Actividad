# 📦 Entrega - Mini Proyecto Evaluable: API REST de Inventario

**Curso:** Express.js con TypeScript | Módulo III  
**Aprendiz:** Juan Soto  
**Fecha de entrega:** 2026-09-09  
**Estado:** ✅ COMPLETADO

---

## 📍 1. URL del Repositorio GitHub

**Repositorio:** https://github.com/Juansesoto321/TypeScript_Actividad.git

**Branch:** main

**Commits:** 6 commits progresivos

---

## ✅ 2. Código Fuente Completo

Todos los archivos están en el repositorio:

```
src/
├── index.ts              (Servidor Express)
├── types.ts              (Interfaces TypeScript)
├── data.ts               (Almacenamiento en memoria)
├── validation.ts         (Validaciones manuales)
└── routes.ts             (Todos los endpoints)
```

**Archivos de configuración:**
- `package.json` - Dependencias y scripts
- `tsconfig.json` - TypeScript strict mode
- `.gitignore` - Exclusiones git
- `.env.example` - Variables de entorno

---

## 📚 3. README Completo

**Ubicación:** `README.md`

**Contiene:**
- ✅ Requisitos del proyecto
- ✅ Instrucciones de instalación
- ✅ Comandos de ejecución
- ✅ Tabla detallada de endpoints
- ✅ Parámetros de cada endpoint
- ✅ Ejemplos de solicitudes/respuestas
- ✅ Reglas de validación
- ✅ Códigos HTTP utilizados
- ✅ Instrucciones para Thunder Client

---

## 📝 4. Historial de Commits Progresivos

```
706c85f docs: add test evidence with Thunder Client results
8f1ebf6 docs: document inventory api endpoints and usage
110488d feat: add all inventory endpoints (GET, POST, PATCH, DELETE, filters)
61475a1 feat: add validation logic
a883959 feat: add inventory model and in-memory data
1ebc3e7 chore: prepare inventory project
```

**Estructura de commits:**
1. **Preparación:** Configuración del proyecto
2. **Modelo:** Tipos e interfaz InventoryItem
3. **Validación:** Lógica de validación manual
4. **Endpoints:** Implementación completa de CRUD + filtros
5. **Documentación:** README detallado
6. **Evidencia:** Documentación de pruebas

---

## 🧪 5. Evidencia de Pruebas Obligatorias

**Ubicación:** `TEST_EVIDENCE.md`

**16/16 Casos de Prueba PASADOS:**

| # | Caso | Método | Endpoint | Status | Resultado |
|---|---|---|---|---|---|
| 1 | Listar inventario | GET | /api/inventory | 200 | ✅ |
| 2 | Consultar por ID | GET | /api/inventory/:id | 200 | ✅ |
| 3 | ID inválido | GET | /api/inventory/abc | 400 | ✅ |
| 4 | ID inexistente | GET | /api/inventory/999 | 404 | ✅ |
| 5 | Crear elemento | POST | /api/inventory | 201 | ✅ |
| 6 | Rechaza price inválido | POST | /api/inventory | 400 | ✅ |
| 7 | Rechaza stock negativo | POST | /api/inventory | 400 | ✅ |
| 8 | Rechaza nombre vacío | POST | /api/inventory | 400 | ✅ |
| 9 | Actualización parcial | PATCH | /api/inventory/1 | 200 | ✅ |
| 10 | Rechaza mod. de ID | PATCH | /api/inventory/1 | 400 | ✅ |
| 11 | Rechaza body vacío | PATCH | /api/inventory/1 | 400 | ✅ |
| 12 | Eliminar elemento | DELETE | /api/inventory/:id | 204 | ✅ |
| 13 | Verificar eliminación | GET | /api/inventory/:id | 404 | ✅ |
| 14 | Filtrar por estado | GET | /api/inventory?active=true | 200 | ✅ |
| 15 | Buscar por nombre | GET | /api/inventory?search=mouse | 200 | ✅ |
| 16 | Combinar filtros | GET | ?active=true&search=mouse | 200 | ✅ |

**Herramienta:** Thunder Client (extensión de VS Code)  
**Capturas:** Adjuntas en evidencia visual

---

## ✅ 6. Compilación Sin Errores

### TypeScript Strict Check
```bash
npm run typecheck
✅ PASÓ - Sin errores
```

### Compilación a JavaScript
```bash
npm run build
✅ PASÓ - Compilación exitosa
```

### Verificación Completa
```bash
npm run check
✅ PASÓ - Typecheck + Build exitosos
```

---

## 📋 7. Checklist de Requisitos

### Funcionalidades
- ✅ GET /api/inventory (listar todos)
- ✅ GET /api/inventory/:id (consultar por ID)
- ✅ POST /api/inventory (crear elemento)
- ✅ PATCH /api/inventory/:id (actualizar parcialmente)
- ✅ DELETE /api/inventory/:id (eliminar)
- ✅ Query: ?active=true|false (filtrar por estado)
- ✅ Query: ?search=texto (buscar por nombre)
- ✅ Combinar filtros en una solicitud

### Validación
- ✅ ID: entero positivo
- ✅ name: obligatorio, string no vacío
- ✅ sku: obligatorio, string no vacío
- ✅ price: número finito > 0
- ✅ stock: entero >= 0
- ✅ active: boolean
- ✅ PATCH: no modificar ID
- ✅ PATCH: no aceptar campos desconocidos

### Códigos HTTP
- ✅ 200 OK (consultas y actualizaciones)
- ✅ 201 Created (creación)
- ✅ 204 No Content (eliminación)
- ✅ 400 Bad Request (validación)
- ✅ 404 Not Found (recurso inexistente)

### Restricciones Cumplidas
- ✅ No BD (PostgreSQL, MySQL, MongoDB)
- ✅ No ORM (Prisma, Sequelize, TypeORM)
- ✅ No librerías de validación (Zod, Joi)
- ✅ No JWT ni autenticación
- ✅ TypeScript strict mode
- ✅ Sin uso de `any`
- ✅ Validación manual
- ✅ CRUD en memoria

### Documentación
- ✅ README completo
- ✅ Commits progresivos
- ✅ TEST_EVIDENCE.md con todas las pruebas
- ✅ Código comentado (cuando necesario)

---

## 🚀 8. Cómo Ejecutar Localmente

```bash
# 1. Clonar repositorio
git clone https://github.com/Juansesoto321/TypeScript_Actividad.git
cd TypeScript_Actividad

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor (modo desarrollo)
npm run dev

# 4. El servidor estará en http://localhost:3000
```

---

## 🧪 9. Probar con Thunder Client

1. Abre VS Code
2. Instala extensión "Thunder Client"
3. Abre Thunder Client
4. Crea nueva solicitud:
   - **Método:** GET
   - **URL:** http://localhost:3000/api/inventory
   - Click en "Send"

---

## 📊 10. Resumen de Implementación

**Lenguaje:** TypeScript (strict mode)  
**Framework:** Express.js  
**Almacenamiento:** En memoria (array)  
**Validación:** Manual sin librerías  
**Pruebas:** 16/16 casos PASADOS  
**Compilación:** ✅ Sin errores  
**Repositorio:** GitHub  

---

## 📁 11. Estructura del Repositorio

```
TypeScript_Actividad/
├── src/
│   ├── index.ts
│   ├── types.ts
│   ├── data.ts
│   ├── validation.ts
│   └── routes.ts
├── dist/                (generado por build)
├── node_modules/        (generado por npm install)
├── package.json
├── tsconfig.json
├── .gitignore
├── .env.example
├── README.md
├── TEST_EVIDENCE.md
└── ENTREGA.md (este archivo)
```

---

## ✨ 12. Características Extras

- ✅ Filtro por estado (active)
- ✅ Búsqueda por nombre (search)
- ✅ Combinación de filtros
- ✅ Búsqueda case-insensitive
- ✅ Generador de IDs del lado servidor
- ✅ Respuestas JSON estructuradas
- ✅ Mensajes de error claros
- ✅ Manejo de errores completo

---

## 🎯 13. Sustentación Técnica

**Puntos clave para explicar:**

1. **req.params vs req.query vs req.body**
   - `req.params`: IDs en la ruta (/api/inventory/:id)
   - `req.query`: Filtros en la URL (?active=true)
   - `req.body`: Datos JSON en la solicitud

2. **Validación manual**
   - Sin Zod ni Joi
   - Funciones específicas para CREATE y UPDATE
   - Validación de tipos con typeof

3. **Códigos HTTP**
   - 201 para creación exitosa
   - 204 sin body en eliminación
   - 400 para validación, 404 para no encontrado

4. **Almacenamiento en memoria**
   - Array de objetos
   - Generador de IDs incremental
   - Datos persisten solo durante ejecución

---

## 📞 Contacto

**Email:** juansesoto321@gmail.com  
**GitHub:** https://github.com/Juansesoto321

---

**Estado Final:** ✅ PROYECTO COMPLETADO Y LISTO PARA ENTREGAR

Fecha: 2026-09-09
