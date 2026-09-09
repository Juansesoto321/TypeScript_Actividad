import { CreateInventoryItemInput, UpdateInventoryItemInput } from './types';

interface ValidationError {
  field: string;
  message: string;
}

export function validateCreateInput(body: unknown): { valid: boolean; errors: ValidationError[] } {
  const errors: ValidationError[] = [];

  if (typeof body !== 'object' || body === null) {
    return { valid: false, errors: [{ field: 'body', message: 'Body must be an object' }] };
  }

  const input = body as Record<string, unknown>;

  // Validate name
  if (typeof input.name !== 'string' || input.name.trim() === '') {
    errors.push({ field: 'name', message: 'Name is required and must be a non-empty string' });
  }

  // Validate sku
  if (typeof input.sku !== 'string' || input.sku.trim() === '') {
    errors.push({ field: 'sku', message: 'SKU is required and must be a non-empty string' });
  }

  // Validate price
  if (typeof input.price !== 'number' || !isFinite(input.price) || input.price <= 0) {
    errors.push({ field: 'price', message: 'Price must be a finite number greater than 0' });
  }

  // Validate stock
  if (typeof input.stock !== 'number' || !Number.isInteger(input.stock) || input.stock < 0) {
    errors.push({ field: 'stock', message: 'Stock must be an integer greater than or equal to 0' });
  }

  // Validate active
  if (typeof input.active !== 'boolean') {
    errors.push({ field: 'active', message: 'Active must be a boolean' });
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateUpdateInput(body: unknown): { valid: boolean; errors: ValidationError[] } {
  const errors: ValidationError[] = [];

  if (typeof body !== 'object' || body === null) {
    return { valid: false, errors: [{ field: 'body', message: 'Body must be an object' }] };
  }

  const input = body as Record<string, unknown>;
  const allowedFields = ['name', 'sku', 'price', 'stock', 'active'];

  // Check for empty body
  const hasValidFields = Object.keys(input).some(key => allowedFields.includes(key));
  if (!hasValidFields) {
    errors.push({ field: 'body', message: 'At least one valid field is required' });
  }

  // Check for unknown fields
  for (const key of Object.keys(input)) {
    if (!allowedFields.includes(key)) {
      errors.push({ field: key, message: `Unknown field: ${key}` });
    }
  }

  // Check for id field
  if ('id' in input) {
    errors.push({ field: 'id', message: 'ID cannot be modified' });
  }

  // Validate name if provided
  if (input.name !== undefined) {
    if (typeof input.name !== 'string' || input.name.trim() === '') {
      errors.push({ field: 'name', message: 'Name must be a non-empty string' });
    }
  }

  // Validate sku if provided
  if (input.sku !== undefined) {
    if (typeof input.sku !== 'string' || input.sku.trim() === '') {
      errors.push({ field: 'sku', message: 'SKU must be a non-empty string' });
    }
  }

  // Validate price if provided
  if (input.price !== undefined) {
    if (typeof input.price !== 'number' || !isFinite(input.price) || input.price <= 0) {
      errors.push({ field: 'price', message: 'Price must be a finite number greater than 0' });
    }
  }

  // Validate stock if provided
  if (input.stock !== undefined) {
    if (typeof input.stock !== 'number' || !Number.isInteger(input.stock) || input.stock < 0) {
      errors.push({ field: 'stock', message: 'Stock must be an integer greater than or equal to 0' });
    }
  }

  // Validate active if provided
  if (input.active !== undefined) {
    if (typeof input.active !== 'boolean') {
      errors.push({ field: 'active', message: 'Active must be a boolean' });
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateId(id: unknown): { valid: boolean; message?: string } {
  if (typeof id !== 'string') {
    return { valid: false, message: 'ID must be a string' };
  }

  const parsedId = parseInt(id, 10);

  if (isNaN(parsedId) || parsedId <= 0 || parsedId.toString() !== id) {
    return { valid: false, message: 'ID must be a positive integer' };
  }

  return { valid: true };
}
