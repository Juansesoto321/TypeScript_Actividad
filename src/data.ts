import { InventoryItem } from './types';

let nextId = 4;

export const inventory: InventoryItem[] = [
  {
    id: 1,
    name: "Mouse Logitech MX Master",
    sku: "MOU-001",
    price: 420000,
    stock: 12,
    active: true
  },
  {
    id: 2,
    name: "Teclado Mecánico RGB",
    sku: "KEY-002",
    price: 350000,
    stock: 8,
    active: true
  },
  {
    id: 3,
    name: "Monitor 4K 27 pulgadas",
    sku: "MON-003",
    price: 1500000,
    stock: 3,
    active: false
  }
];

export function generateId(): number {
  return nextId++;
}
