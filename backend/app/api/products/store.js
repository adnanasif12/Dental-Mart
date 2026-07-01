import dbConnect from '@/lib/mongodb';
import Product from '@/app/models/Product';

// In-memory cache for performance
let productsCache = null;
let cacheLoaded = false;

async function loadProducts() {
  console.log('=== loadProducts called ===');
  console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
  
  // MongoDB is the only source of truth
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not configured!');
    return [];
  }

  try {
    console.log('Connecting to MongoDB...');
    await dbConnect();
    console.log('Connected to MongoDB successfully');
    
    // Load products from MongoDB
    let products = await Product.find({}).sort({ id: 1 }).lean();
    console.log('Found', products?.length || 0, 'products in MongoDB');
    
    // Update cache
    if (products && products.length > 0) {
      productsCache = products;
      cacheLoaded = true;
      console.log('Cache updated with', products.length, 'products');
      return products;
    }
    
    console.log('No products in MongoDB, returning empty array');
    return [];
  } catch (error) {
    console.error('Error loading products from MongoDB:', error.message, error.stack);
    return [];
  }
}

async function saveProducts(products) {
  console.log('=== saveProducts called ===');
  
  // Update cache
  productsCache = products;
  cacheLoaded = true;

  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not configured! Cannot save products');
    return false;
  }

  try {
    console.log('Connecting to MongoDB...');
    await dbConnect();
    
    console.log('Deleting old products...');
    await Product.deleteMany({});
    
    console.log('Inserting', products.length, 'products...');
    await Product.insertMany(products);
    
    console.log('Products saved to MongoDB successfully');
    return true;
  } catch (error) {
    console.error('Error saving products to MongoDB:', error.message, error.stack);
    return false;
  }
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
