import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dbConnect from '@/lib/mongodb';
import Product from '@/app/models/Product';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File storage as fallback
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
    console.log('Attempting to load products from:', productsFilePath);
    console.log('File exists:', fs.existsSync(productsFilePath));
    
    if (fs.existsSync(productsFilePath)) {
      const raw = fs.readFileSync(productsFilePath, 'utf-8');
      console.log('Successfully loaded products from file');
      return JSON.parse(raw);
    } else {
      console.warn('Products file does not exist at:', productsFilePath);
      // Try alternative paths
      const altPath1 = path.join(process.cwd(), 'backend/app/api/products/products.json');
      const altPath2 = path.join(process.cwd(), 'app/api/products/products.json');
      
      console.log('Trying alternative path 1:', altPath1, 'exists:', fs.existsSync(altPath1));
      if (fs.existsSync(altPath1)) {
        const raw = fs.readFileSync(altPath1, 'utf-8');
        return JSON.parse(raw);
      }
      
      console.log('Trying alternative path 2:', altPath2, 'exists:', fs.existsSync(altPath2));
      if (fs.existsSync(altPath2)) {
        const raw = fs.readFileSync(altPath2, 'utf-8');
        return JSON.parse(raw);
      }
    }
  } catch (error) {
    console.error('Error loading products from file:', error.message, error.stack);
  }
  
  return [];
}

async function loadProducts() {
  console.log('=== loadProducts called ===');
  console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
  
  // Try MongoDB first if available
  if (process.env.MONGODB_URI) {
    try {
      console.log('Connecting to MongoDB...');
      await dbConnect();
      console.log('Connected to MongoDB');
      
      let products = await Product.find({}).sort({ id: 1 }).lean();
      console.log('Found products in MongoDB:', products?.length || 0);
      
      // If MongoDB has less than 5 products, seed it from file (force reseed)
      if (!products || products.length < 5) {
        console.log(`MongoDB has only ${products?.length || 0} products. Merging with file storage...`);
        const fileProducts = loadProductsFromFile();
        console.log('Loaded from file:', fileProducts?.length || 0, 'products');
        
        if (fileProducts && fileProducts.length > 0) {
          // Get existing product IDs to avoid duplicates
          const existingIds = new Set(products?.map(p => p.id) || []);
          
          // Filter file products - only insert those not already in MongoDB
          const newProducts = fileProducts.filter(fp => !existingIds.has(fp.id));
          console.log('New products to insert:', newProducts.length, 'Existing:', existingIds.size);
          
          if (newProducts.length > 0) {
            await Product.insertMany(newProducts);
            console.log('Inserted', newProducts.length, 'new products into MongoDB');
          }
          
          // Reload all products after potential insertion
          products = await Product.find({}).sort({ id: 1 }).lean();
          console.log('Total products after merge:', products.length);
        }
      }
      
      if (products && products.length > 0) {
        console.log('Returning', products.length, 'products from MongoDB');
        productsCache = products;
        cacheLoaded = true;
        return products;
      }
    } catch (error) {
      console.error('MongoDB operation failed:', error.message, error.stack);
    }
  }

  console.log('Falling back to file storage...');
  // Fallback to file storage
  if (cacheLoaded && productsCache) {
    console.log('Returning', productsCache.length, 'products from cache');
    return productsCache;
  }

  try {
    const raw = fs.readFileSync(productsFilePath, 'utf-8');
    productsCache = JSON.parse(raw);
    cacheLoaded = true;
    console.log('Loaded', productsCache.length, 'products from file fallback');
    return productsCache;
  } catch (error) {
    console.error('Error loading products from file fallback:', error.message);
    return [];
  }
}

function saveProductsToFile(products) {
  try {
    ensureDirExists(productsFilePath);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');
    console.log('Products saved to file successfully');
  } catch (error) {
    console.error('Error saving products to file:', error.message);
  }
}

async function saveProducts(products) {
  // Update cache
  productsCache = products;
  cacheLoaded = true;

  // Try MongoDB first if available
  if (process.env.MONGODB_URI) {
    try {
      await dbConnect();
      
      // Delete all existing products and insert new ones
      await Product.deleteMany({});
      await Product.insertMany(products);
      
      console.log('Products saved to MongoDB successfully');
      return;
    } catch (error) {
      console.log('MongoDB save failed, falling back to file storage:', error.message);
    }
  }

  // Fallback to file storage
  saveProductsToFile(products);
}

export async function getProducts() {
  return await loadProducts();
}

export async function saveProductList(products) {
  await saveProducts(products);
}

export function getNextProductId(products) {
  return products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
}
