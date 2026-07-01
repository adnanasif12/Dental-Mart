import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// For serverless (Vercel), use the bundled products.json as source of truth
// For local development, prefer tmp directory but fallback to bundled
const bundledProductsPath = path.join(__dirname, 'products.json');
const isServerless = !fs.existsSync(path.join(__dirname, '../../..', 'node_modules'));

// In-memory cache to handle serverless cold starts
let productsCache = null;
let cacheLoadedFromFile = false;

function ensureDirExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function loadProductsFromFile() {
  try {
    // Always try bundled products first (source of truth)
    if (fs.existsSync(bundledProductsPath)) {
      const raw = fs.readFileSync(bundledProductsPath, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (error) {
    console.error('Error loading from bundled products:', error.message);
  }
  
  return [];
}

function getDataPath() {
  // For serverless, always use bundled path
  if (isServerless) {
    return bundledProductsPath;
  }

  // For local, try tmp first, then bundled
  const tmpPath = path.join(os.tmpdir(), 'dentalmart-products.json');
  
  if (fs.existsSync(tmpPath)) {
    return tmpPath;
  }

  return bundledProductsPath;
}

const dataPath = getDataPath();

function loadProducts() {
  // Use in-memory cache on serverless for performance
  if (isServerless && cacheLoadedFromFile) {
    return productsCache || [];
  }

  try {
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const products = JSON.parse(raw);
    
    // Cache it
    productsCache = products;
    cacheLoadedFromFile = true;
    
    return products;
  } catch (error) {
    console.error('Error loading products:', error.message);
    return [];
  }
}

function saveProducts(products) {
  try {
    // Update in-memory cache
    productsCache = products;

    // Try to save to file (may fail on serverless, but that's ok)
    ensureDirExists(dataPath);
    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2), 'utf-8');
  } catch (error) {
    // On serverless, file writes may fail - that's expected
    // Data is persisted in memory for the duration of the invocation
    console.warn('Could not persist products to file:', error.message);
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
