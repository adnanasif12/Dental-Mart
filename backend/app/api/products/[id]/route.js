import { NextResponse } from 'next/server';
import { getProducts, saveProductList } from '../store';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(request) {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

// GET single product
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const products = await getProducts();
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found"
        },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: product,
        message: "Product fetched successfully"
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching product",
        error: error.message
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

// PUT (update) product
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const products = await getProducts();
    const productIndex = products.findIndex(p => p.id === parseInt(id));

    if (productIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found"
        },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    // Update product
    products[productIndex] = {
      ...products[productIndex],
      name: body.name || products[productIndex].name,
      price: body.price !== undefined ? parseFloat(body.price) : products[productIndex].price,
      image: body.image || products[productIndex].image,
      rating: body.rating !== undefined ? parseFloat(body.rating) : products[productIndex].rating,
      category: body.category || products[productIndex].category,
      description: body.description || products[productIndex].description
    };

    await saveProductList(products);

    return NextResponse.json(
      {
        success: true,
        data: products[productIndex],
        message: "Product updated successfully"
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error updating product",
        error: error.message
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

// DELETE product
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    let products = await getProducts();
    const productIndex = products.findIndex(p => p.id === parseInt(id));

    if (productIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found"
        },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    const deletedProduct = products[productIndex];
    products = products.filter((_, index) => index !== productIndex);
    await saveProductList(products);

    return NextResponse.json(
      {
        success: true,
        data: deletedProduct,
        message: "Product deleted successfully"
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error deleting product",
        error: error.message
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
