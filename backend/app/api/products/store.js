import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'backend', 'app', 'api', 'products', 'products.json');

function loadProducts() {
  try {
    const raw = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    return [];
  }
}

function saveProducts(products) {
  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2), 'utf-8');
}

export function getProducts() {
  return loadProducts();
}

export function saveProductList(products) {
  saveProducts(products);
}

export function getNextProductId(products) {
  return products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
}
