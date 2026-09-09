import { Router, Request, Response } from 'express';
import { inventory, generateId } from './data';
import { validateCreateInput, validateUpdateInput, validateId } from './validation';
import { InventoryItem, ApiResponse } from './types';

const router = Router();

// ETAPA 3 - GET /api/inventory - Listar todos los elementos
router.get('/api/inventory', (req: Request, res: Response) => {
  const { active, search } = req.query;

  let filtered = [...inventory];

  // Filtrar por active si se proporciona
  if (active !== undefined) {
    const activeValue = active === 'true' ? true : active === 'false' ? false : null;
    if (activeValue !== null) {
      filtered = filtered.filter(item => item.active === activeValue);
    }
  }

  // Filtrar por search si se proporciona
  if (search !== undefined && typeof search === 'string') {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(item => item.name.toLowerCase().includes(searchLower));
  }

  const response: ApiResponse<InventoryItem[]> = {
    success: true,
    data: filtered,
    total: filtered.length
  };

  res.status(200).json(response);
});

// ETAPA 4 - GET /api/inventory/:id - Consultar un elemento por ID
router.get('/api/inventory/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  // Validar que el ID es un número positivo
  const validation = validateId(id);
  if (!validation.valid) {
    return res.status(400).json({
      success: false,
      message: validation.message
    });
  }

  const parsedId = parseInt(id, 10);
  const item = inventory.find(i => i.id === parsedId);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: `Inventory item with ID ${parsedId} not found`
    });
  }

  const response: ApiResponse<InventoryItem> = {
    success: true,
    data: item
  };

  res.status(200).json(response);
});

// ETAPA 5 - POST /api/inventory - Crear un elemento
router.post('/api/inventory', (req: Request, res: Response) => {
  const validation = validateCreateInput(req.body);

  if (!validation.valid) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      data: validation.errors
    });
  }

  const newItem: InventoryItem = {
    id: generateId(),
    name: (req.body.name as string).trim(),
    sku: (req.body.sku as string).trim(),
    price: req.body.price as number,
    stock: req.body.stock as number,
    active: req.body.active as boolean
  };

  inventory.push(newItem);

  const response: ApiResponse<InventoryItem> = {
    success: true,
    data: newItem
  };

  res.status(201).json(response);
});

// ETAPA 6 - PATCH /api/inventory/:id - Actualizar parcialmente
router.patch('/api/inventory/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  // Validar que el ID es un número positivo
  const idValidation = validateId(id);
  if (!idValidation.valid) {
    return res.status(400).json({
      success: false,
      message: idValidation.message
    });
  }

  // Validar el body
  const bodyValidation = validateUpdateInput(req.body);
  if (!bodyValidation.valid) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      data: bodyValidation.errors
    });
  }

  const parsedId = parseInt(id, 10);
  const item = inventory.find(i => i.id === parsedId);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: `Inventory item with ID ${parsedId} not found`
    });
  }

  // Aplicar actualización parcial
  if (req.body.name !== undefined) {
    item.name = (req.body.name as string).trim();
  }
  if (req.body.sku !== undefined) {
    item.sku = (req.body.sku as string).trim();
  }
  if (req.body.price !== undefined) {
    item.price = req.body.price as number;
  }
  if (req.body.stock !== undefined) {
    item.stock = req.body.stock as number;
  }
  if (req.body.active !== undefined) {
    item.active = req.body.active as boolean;
  }

  const response: ApiResponse<InventoryItem> = {
    success: true,
    data: item
  };

  res.status(200).json(response);
});

// ETAPA 7 - DELETE /api/inventory/:id - Eliminar un elemento
router.delete('/api/inventory/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  // Validar que el ID es un número positivo
  const idValidation = validateId(id);
  if (!idValidation.valid) {
    return res.status(400).json({
      success: false,
      message: idValidation.message
    });
  }

  const parsedId = parseInt(id, 10);
  const itemIndex = inventory.findIndex(i => i.id === parsedId);

  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Inventory item with ID ${parsedId} not found`
    });
  }

  inventory.splice(itemIndex, 1);

  res.status(204).send();
});

export default router;
