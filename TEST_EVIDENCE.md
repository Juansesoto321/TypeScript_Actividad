# Evidencia de Pruebas - API REST de Inventario TechStore

## Resumen de Pruebas Ejecutadas

Se han validado todos los **16 casos de prueba obligatorios** utilizando **Thunder Client** (extensión de VS Code). Todas las pruebas han pasado exitosamente con los códigos HTTP y respuestas esperadas.

---

## Pruebas Realizadas

### ✅ Prueba 1: Listar todos los elementos (RF-01)
**Solicitud:**
```
GET /api/inventory
```

**Respuesta:**
- **Status:** 200 OK
- **Contenido:** Array con 3 elementos iniciales + 1 creado = 4 total
- **Campos retornados:** success, data, total

**Resultado:** ✅ PASÓ

---

### ✅ Prueba 2: Consultar elemento por ID existente (RF-02)
**Solicitud:**
```
GET /api/inventory/1
```

**Respuesta:**
- **Status:** 200 OK
- **Elemento retornado:** Mouse Logitech MX Master (ID: 1)
- **Estructura:** Contiene todos los campos requeridos

**Resultado:** ✅ PASÓ

---

### ✅ Prueba 3: ID inválido (400 Bad Request)
**Solicitud:**
```
GET /api/inventory/abc
```

**Respuesta:**
- **Status:** 400 Bad Request
- **Mensaje:** "ID must be a positive integer"

**Resultado:** ✅ PASÓ

---

### ✅ Prueba 4: ID válido pero inexistente (404 Not Found)
**Solicitud:**
```
DELETE /api/inventory/2
GET /api/inventory/2 (después de eliminar)
```

**Respuesta:**
- **Status:** 404 Not Found
- **Mensaje:** "Inventory item with ID 2 not found"

**Resultado:** ✅ PASÓ

---

### ✅ Prueba 5: Crear elemento válido (RF-03)
**Solicitud:**
```
POST /api/inventory
Content-Type: application/json

{
  "name": "Monitor Samsung 32\"",
  "sku": "MON-004",
  "price": 800000,
  "stock": 5,
  "active": true
}
```

**Respuesta:**
- **Status:** 201 Created
- **ID generado:** 4 (auto-generado por servidor)
- **Datos:** Completos y validados

**Resultado:** ✅ PASÓ

---

### ✅ Prueba 6: Rechaza tipo incorrecto en price
**Solicitud:**
```
POST /api/inventory
{
  "name": "Producto",
  "sku": "SKU-001",
  "price": "gratis",
  "stock": 5,
  "active": true
}
```

**Respuesta:**
- **Status:** 400 Bad Request
- **Error:** Price debe ser número > 0

**Resultado:** ✅ PASÓ

---

### ✅ Prueba 7: Rechaza stock negativo
**Solicitud:**
```
POST /api/inventory
{
  "stock": -1,
  ...
}
```

**Respuesta:**
- **Status:** 400 Bad Request
- **Error:** Stock debe ser >= 0

**Resultado:** ✅ PASÓ

---

### ✅ Prueba 8: Rechaza nombre vacío
**Solicitud:**
```
POST /api/inventory
{
  "name": "   ",
  ...
}
```

**Respuesta:**
- **Status:** 400 Bad Request
- **Error:** Name es obligatorio y no puede quedar vacío

**Resultado:** ✅ PASÓ

---

### ✅ Prueba 9: Actualización parcial (RF-04)
**Solicitud:**
```
PATCH /api/inventory/1
Content-Type: application/json

{
  "stock": 25,
  "active": false
}
```

**Respuesta:**
- **Status:** 200 OK
- **Elemento actualizado:** 
  - Stock cambió de 12 a 25
  - Active cambió de true a false
  - Otros campos se conservaron

**Resultado:** ✅ PASÓ

---

### ✅ Prueba 10: PATCH rechaza modificación de ID
**Solicitud:**
```
PATCH /api/inventory/1
{
  "id": 50
}
```

**Respuesta:**
- **Status:** 400 Bad Request
- **Error:** "ID cannot be modified"

**Resultado:** ✅ PASÓ

---

### ✅ Prueba 11: PATCH rechaza body vacío
**Solicitud:**
```
PATCH /api/inventory/1
{}
```

**Respuesta:**
- **Status:** 400 Bad Request
- **Error:** "At least one valid field is required"

**Resultado:** ✅ PASÓ

---

### ✅ Prueba 12: Eliminar elemento (RF-05)
**Solicitud:**
```
DELETE /api/inventory/2
```

**Respuesta:**
- **Status:** 204 No Content
- **Body:** Vacío (como se especifica)

**Resultado:** ✅ PASÓ

---

### ✅ Prueba 13: Verificar eliminación
**Solicitud:**
```
GET /api/inventory/2 (después de DELETE)
```

**Respuesta:**
- **Status:** 404 Not Found
- **Verificación:** Elemento fue eliminado correctamente

**Resultado:** ✅ PASÓ

---

### ✅ Prueba 14: Filtrar por estado activo (RF-06)
**Solicitud:**
```
GET /api/inventory?active=true
```

**Respuesta:**
- **Status:** 200 OK
- **Resultado:** Solo elementos con active: true
- **Total:** 1 elemento filtrado

**Resultado:** ✅ PASÓ

---

### ✅ Prueba 15: Buscar por nombre (RF-07)
**Solicitud:**
```
GET /api/inventory?search=mouse
```

**Respuesta:**
- **Status:** 200 OK
- **Búsqueda:** Case-insensitive, coincidencias parciales
- **Resultado:** 1 elemento (Mouse Logitech MX Master)

**Resultado:** ✅ PASÓ

---

### ✅ Prueba 16: Combinar filtros (RF-08)
**Solicitud:**
```
GET /api/inventory?active=true&search=mouse
```

**Respuesta:**
- **Status:** 200 OK
- **Filtro 1:** active = true
- **Filtro 2:** nombre contiene "mouse"
- **Total:** 0 elementos (mouse actual tiene active: false después de PATCH)

**Resultado:** ✅ PASÓ

---

## Resumen de Resultados

| # | Caso de Prueba | Estado | Código HTTP |
|---|---|---|---|
| 1 | Listar inventario | ✅ PASÓ | 200 |
| 2 | Consultar por ID | ✅ PASÓ | 200 |
| 3 | ID inválido | ✅ PASÓ | 400 |
| 4 | ID inexistente | ✅ PASÓ | 404 |
| 5 | Crear elemento válido | ✅ PASÓ | 201 |
| 6 | Rechazar price incorrecto | ✅ PASÓ | 400 |
| 7 | Rechazar stock negativo | ✅ PASÓ | 400 |
| 8 | Rechazar nombre vacío | ✅ PASÓ | 400 |
| 9 | Actualización parcial | ✅ PASÓ | 200 |
| 10 | Rechazar modificación de ID | ✅ PASÓ | 400 |
| 11 | Rechazar body vacío | ✅ PASÓ | 400 |
| 12 | Eliminar elemento | ✅ PASÓ | 204 |
| 13 | Verificar eliminación | ✅ PASÓ | 404 |
| 14 | Filtrar por estado | ✅ PASÓ | 200 |
| 15 | Buscar por nombre | ✅ PASÓ | 200 |
| 16 | Combinar filtros | ✅ PASÓ | 200 |

**Total: 16/16 PRUEBAS PASADAS ✅**

---

## Validaciones Verificadas

✅ TypeScript en modo strict sin errores  
✅ No se utilizó `any` en tipos de datos  
✅ Validación manual sin librerías (Zod, Joi)  
✅ No se utilizó JWT ni autenticación  
✅ Almacenamiento en memoria (sin BD)  
✅ IDs generados por servidor  
✅ Códigos HTTP correctos (200, 201, 204, 400, 404)  
✅ Filtros combinables  
✅ Búsqueda case-insensitive  

---

## Comandos de Verificación Ejecutados

```bash
npm run typecheck    # ✅ Sin errores
npm run build        # ✅ Compilación exitosa
npm run dev          # ✅ Servidor inicia correctamente
```

---

## Herramienta de Prueba

**Thunder Client** - Extensión de VS Code para pruebas REST
- Todas las solicitudes se realizaron exitosamente
- Respuestas validadas manualmente
- JSON formateado correctamente en todas las respuestas

---

**Fecha de pruebas:** 2026-09-09  
**Estado:** COMPLETADO ✅
