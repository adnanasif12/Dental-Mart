import { NextResponse } from 'next/server';
import { getProducts, saveProductList } from '../../products/store';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsPath = path.join(__dirname, '../../products/products.json');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET(request) {
  try {
    // Get current products from memory
    const products = getProducts();
    
    // Check if file exists and read it
    let fileExists = false;
    let fileContent = null;
    
    if (fs.existsSync(productsPath)) {
      fileExists = true;
      try {
        fileContent = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
      } catch (e) {
        fileContent = { error: e.message };
      }
    }
    
    return NextResponse.json(
      {
        productsPath,
        fileExists,
        productCount: products.length,
        products: products.slice(0, 3), // First 3 for preview
        fileContentCount: fileContent?.length || 0,
        fileContent: fileContent?.slice(0, 2) || []
      },
      { headers: CORS_HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
