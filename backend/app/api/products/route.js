import { NextResponse } from 'next/server';
import { getProducts, saveProductList, getNextProductId } from './store';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(request) {
  try {
    const products = getProducts();
    return NextResponse.json(
      {
        success: true,
        data: products,
        message: "Products fetched successfully"
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error) {
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
        { status: 400 }
      );
    }

    const products = getProducts();
    const newProduct = {
      id: getNextProductId(products),
      name: body.name,
      price: parseFloat(body.price),
      image: body.image || "https://via.placeholder.com/200?text=Product",
      rating: parseFloat(body.rating) || 4.0,
      category: body.category || "tools",
      description: body.description || ""
    };
    
    products.push(newProduct);
    saveProductList(products);
    
    return NextResponse.json(
      {
        success: true,
        data: newProduct,
        message: "Product created successfully"
      },
      { status: 201, headers: CORS_HEADERS }
    );
  } catch (error) {
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
