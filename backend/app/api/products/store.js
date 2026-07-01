import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Always use the bundled products.json as the persistent storage
const productsFilePath = path.join(__dirname, 'products.json');

// In-memory cache for performance
let productsCache = null;
let cacheLoaded = false;

function ensureDirExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function loadProductsFromFile() {
  try {
    if (fs.existsSync(productsFilePath)) {
      const raw = fs.readFileSync(productsFilePath, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (error) {
    console.error('Error loading products from file:', error.message);
  }
  
  return [];
}

function loadProducts() {
  // Return cached data if already loaded
  if (cacheLoaded && productsCache) {
    return productsCache;
  }

  try {
    const raw = fs.readFileSync(productsFilePath, 'utf-8');
    productsCache = JSON.parse(raw);
    cacheLoaded = true;
    return productsCache;
  } catch (error) {
    console.error('Error loading products:', error.message);
    // Return empty array if file doesn't exist or is invalid
    return [];
  }
}

function saveProducts(products) {
  try {
    // Ensure directory exists
    ensureDirExists(productsFilePath);
    
    // Write to file
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');
    
    // Update cache
    productsCache = products;
    cacheLoaded = true;
    
    console.log('Products saved successfully');
  } catch (error) {
    console.error('Error saving products:', error.message);
    // Still update cache even if file write fails
    productsCache = products;
    cacheLoaded = true;
  }
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
