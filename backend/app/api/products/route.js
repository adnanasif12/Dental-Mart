import { NextResponse } from 'next/server';
import { getProducts, saveProductList } from './store';

const DEFAULT_PRODUCT_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" rx="24" fill="%23f3f4f6"/><rect x="40" y="40" width="320" height="320" rx="20" fill="%23ffffff" stroke="%23d1d5db" stroke-width="4"/><path d="M130 280h140" stroke="%234b5563" stroke-width="12" stroke-linecap="round"/><path d="M160 210h80" stroke="%234b5563" stroke-width="12" stroke-linecap="round"/><path d="M180 150h40" stroke="%234b5563" stroke-width="12" stroke-linecap="round"/></svg>';
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(request) {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(request) {
  try {
    // Use file storage (primary method)
    const products = await getProducts();
    
    return NextResponse.json(
      {
        success: true,
        data: products,
        message: "Products fetched successfully"
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching products",
        error: error.message
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    if (!body.name || !body.price) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and price are required"
        },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // Use file storage
    const products = await getProducts();
    const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    const newProduct = {
      id: nextId,
      name: body.name,
      price: parseFloat(body.price),
      image: body.image || DEFAULT_PRODUCT_IMAGE,
      rating: parseFloat(body.rating) || 4.0,
      category: body.category || "tools",
      description: body.description || ""
    };
    
    products.push(newProduct);
    await saveProductList(products);
    
    return NextResponse.json(
      {
        success: true,
        data: newProduct,
        message: "Product created successfully"
      },
      { status: 201, headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      {
        success: false,
        message: "Error creating product",
        error: error.message
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
