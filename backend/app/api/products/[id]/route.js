import { NextResponse } from 'next/server';

// Reference to the main products list - in production use database
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

// GET single product
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found"
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: product,
        message: "Product fetched successfully"
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching product",
        error: error.message
      },
      { status: 500 }
    );
  }
}

// PUT - Update product
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const productIndex = products.findIndex(p => p.id === parseInt(id));

    if (productIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found"
        },
        { status: 404 }
      );
    }

    const updatedProduct = {
      ...products[productIndex],
      name: body.name || products[productIndex].name,
      price: body.price !== undefined ? parseFloat(body.price) : products[productIndex].price,
      image: body.image || products[productIndex].image,
      rating: body.rating !== undefined ? parseFloat(body.rating) : products[productIndex].rating,
      category: body.category || products[productIndex].category,
      description: body.description || products[productIndex].description
    };

    products[productIndex] = updatedProduct;

    return NextResponse.json(
      {
        success: true,
        data: updatedProduct,
        message: "Product updated successfully"
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error updating product",
        error: error.message
      },
      { status: 500 }
    );
  }
}

// DELETE product
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const productIndex = products.findIndex(p => p.id === parseInt(id));

    if (productIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found"
        },
        { status: 404 }
      );
    }

    const deletedProduct = products[productIndex];
    products.splice(productIndex, 1);

    return NextResponse.json(
      {
        success: true,
        data: deletedProduct,
        message: "Product deleted successfully"
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error deleting product",
        error: error.message
      },
      { status: 500 }
    );
  }
}
