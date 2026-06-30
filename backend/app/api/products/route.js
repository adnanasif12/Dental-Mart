import { NextResponse } from 'next/server';
import { products, getNextProductId } from './store';

export async function GET(request) {
  try {
    return NextResponse.json(
      {
        success: true,
        data: products,
        message: "Products fetched successfully"
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching products",
        error: error.message
      },
      { status: 500 }
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

    const newProduct = {
      id: getNextProductId(),
      name: body.name,
      price: parseFloat(body.price),
      image: body.image || "https://via.placeholder.com/200?text=Product",
      rating: parseFloat(body.rating) || 4.0,
      category: body.category || "tools",
      description: body.description || ""
    };
    
    products.push(newProduct);
    
    return NextResponse.json(
      {
        success: true,
        data: newProduct,
        message: "Product created successfully"
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error creating product",
        error: error.message
      },
      { status: 500 }
    );
  }
}
