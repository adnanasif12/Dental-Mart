import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const bundlePath = path.join(__dirname, 'products.json');
const tmpPath = path.join(os.tmpdir(), 'dentalmart-products.json');

function ensureDirExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getDataPath() {
  if (fs.existsSync(tmpPath)) {
    return tmpPath;
  }

  if (fs.existsSync(bundlePath)) {
    try {
      ensureDirExists(tmpPath);
      fs.copyFileSync(bundlePath, tmpPath);
      return tmpPath;
    } catch (error) {
      return bundlePath;
    }
  }

  try {
    ensureDirExists(tmpPath);
    fs.writeFileSync(tmpPath, '[]', 'utf-8');
    return tmpPath;
  } catch (error) {
    return bundlePath;
  }
}

const dataPath = getDataPath();

function loadProducts() {
  try {
    const raw = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    return [];
  }
}

function saveProducts(products) {
  try {
    ensureDirExists(dataPath);
    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2), 'utf-8');
  } catch (error) {
    // ignore write errors in read-only environments
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
