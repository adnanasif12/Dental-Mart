import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
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
    
    // Try MongoDB first
    if (process.env.MONGODB_URI) {
      try {
        await dbConnect();
        const product = await Product.findOne({ id: parseInt(id) });

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
      } catch (mongoError) {
        console.log('MongoDB query failed, falling back to file storage:', mongoError.message);
        // Fallback to file storage
        const products = getProducts();
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
      }
    } else {
      // No MongoDB, use file storage
      const products = getProducts();
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
    }
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

// PUT - Update product
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Try MongoDB first
    if (process.env.MONGODB_URI) {
      try {
        await dbConnect();
        
        const product = await Product.findOne({ id: parseInt(id) });

        if (!product) {
          return NextResponse.json(
            {
              success: false,
              message: "Product not found"
            },
            { status: 404, headers: CORS_HEADERS }
          );
        }

        // Update fields
        if (body.name) product.name = body.name;
        if (body.price !== undefined) product.price = parseFloat(body.price);
        if (body.image) product.image = body.image;
        if (body.rating !== undefined) product.rating = parseFloat(body.rating);
        if (body.category) product.category = body.category;
        if (body.description) product.description = body.description;
        if (body.inStock !== undefined) product.inStock = body.inStock;
        if (body.quantity !== undefined) product.quantity = body.quantity;

        await product.save();

        return NextResponse.json(
          {
            success: true,
            data: product,
            message: "Product updated successfully"
          },
          { status: 200, headers: CORS_HEADERS }
        );
      } catch (mongoError) {
        console.log('MongoDB update failed, falling back to file storage:', mongoError.message);
        // Fallback to file storage
        const products = getProducts();
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
        saveProductList(products);

        return NextResponse.json(
          {
            success: true,
            data: updatedProduct,
            message: "Product updated successfully"
          },
          { status: 200, headers: CORS_HEADERS }
        );
      }
    } else {
      // No MongoDB, use file storage
      const products = getProducts();
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
      saveProductList(products);

      return NextResponse.json(
        {
          success: true,
          data: updatedProduct,
          message: "Product updated successfully"
        },
        { status: 200, headers: CORS_HEADERS }
      );
    }
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
    
    // Try MongoDB first
    if (process.env.MONGODB_URI) {
      try {
        await dbConnect();
        
        const product = await Product.findOne({ id: parseInt(id) });

        if (!product) {
          return NextResponse.json(
            {
              success: false,
              message: "Product not found"
            },
            { status: 404, headers: CORS_HEADERS }
          );
        }

        await Product.deleteOne({ _id: product._id });

        return NextResponse.json(
          {
            success: true,
            data: product,
            message: "Product deleted successfully"
          },
          { status: 200, headers: CORS_HEADERS }
        );
      } catch (mongoError) {
        console.log('MongoDB delete failed, falling back to file storage:', mongoError.message);
        // Fallback to file storage
        const products = getProducts();
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
        products.splice(productIndex, 1);
        saveProductList(products);

        return NextResponse.json(
          {
            success: true,
            data: deletedProduct,
            message: "Product deleted successfully"
          },
          { status: 200, headers: CORS_HEADERS }
        );
      }
    } else {
      // No MongoDB, use file storage
      const products = getProducts();
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
      products.splice(productIndex, 1);
      saveProductList(products);

      return NextResponse.json(
        {
          success: true,
          data: deletedProduct,
          message: "Product deleted successfully"
        },
        { status: 200, headers: CORS_HEADERS }
      );
    }
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
