import { NextResponse } from 'next/server';

// In-memory database (in production, use MongoDB/PostgreSQL)
let products = [
  {
    id: 1,
    name: "Dental Drill",
    price: 25000,
    image: "https://via.placeholder.com/200?text=Dental+Drill",
    rating: 4.5,
    category: "tools",
    description: "Professional dental drill for precise operations"
  },
  {
    id: 2,
    name: "Tooth Whitening Kit",
    price: 5000,
    image: "https://via.placeholder.com/200?text=Whitening+Kit",
    rating: 4.8,
    category: "cosmetic",
    description: "Professional tooth whitening system"
  },
  {
    id: 3,
    name: "Dental Mirror",
    price: 500,
    image: "https://via.placeholder.com/200?text=Dental+Mirror",
    rating: 4.3,
    category: "tools",
    description: "Stainless steel dental mirror"
  },
];

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
      id: Math.max(...products.map(p => p.id), 0) + 1,
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
