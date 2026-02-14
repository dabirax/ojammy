import type { Product, Sale} from "./types";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Mouse",
    costPrice: 15,
    sellingPrice: 29.99,
    quantity: 45,
    lowStockThreshold: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "USB-C Hub",
    costPrice: 22,
    sellingPrice: 49.99,
    quantity: 3,
    lowStockThreshold: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Mechanical Keyboard",
    costPrice: 35,
    sellingPrice: 79.99,
    quantity: 18,
    lowStockThreshold: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Monitor Stand",
    costPrice: 20,
    sellingPrice: 44.99,
    quantity: 2,
    lowStockThreshold: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Webcam HD",
    costPrice: 28,
    sellingPrice: 59.99,
    quantity: 12,
    lowStockThreshold: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Desk Lamp LED",
    costPrice: 10,
    sellingPrice: 24.99,
    quantity: 30,
    lowStockThreshold: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Laptop Sleeve",
    costPrice: 8,
    sellingPrice: 19.99,
    quantity: 0,
    lowStockThreshold: 5,
    createdAt: new Date().toISOString(),
  },
];

export const mockSales: Sale[] = [
  {
    id: "1",
    items: [
      {
        productId: "1",
        productName: "Wireless Mouse",
        quantity: 2,
        priceAtSale: 29.99,
      },
    ],
    totalAmount: 59.98,
    totalProfit: 29.98,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    items: [
      {
        productId: "3",
        productName: "Mechanical Keyboard",
        quantity: 1,
        priceAtSale: 79.99,
      },
    ],
    totalAmount: 79.99,
    totalProfit: 44.99,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    items: [
      {
        productId: "5",
        productName: "Webcam HD",
        quantity: 3,
        priceAtSale: 59.99,
      },
      {
        productId: "6",
        productName: "Desk Lamp LED",
        quantity: 1,
        priceAtSale: 24.99,
      },
    ],
    totalAmount: 204.96,
    totalProfit: 110.96,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    items: [
      {
        productId: "1",
        productName: "Wireless Mouse",
        quantity: 1,
        priceAtSale: 29.99,
      },
    ],
    totalAmount: 29.99,
    totalProfit: 14.99,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    items: [
      {
        productId: "6",
        productName: "Desk Lamp LED",
        quantity: 5,
        priceAtSale: 24.99,
      },
    ],
    totalAmount: 124.95,
    totalProfit: 74.95,
    createdAt: new Date().toISOString(),
  },
];
