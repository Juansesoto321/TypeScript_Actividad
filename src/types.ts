export interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  active: boolean;
}

export interface CreateInventoryItemInput {
  name: string;
  sku: string;
  price: number;
  stock: number;
  active: boolean;
}

export interface UpdateInventoryItemInput {
  name?: string;
  sku?: string;
  price?: number;
  stock?: number;
  active?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  total?: number;
  message?: string;
}
