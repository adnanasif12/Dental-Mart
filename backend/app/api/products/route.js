import { NextResponse } from 'next/server';
import { getProducts, saveProductList } from './store';

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
    const products = getProducts();
    const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    const newProduct = {
      id: nextId,
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
    if (process.env.MONGODB_URI) {
      try {
        await dbConnect();
        
        // Get next ID
        const lastProduct = await Product.findOne().sort({ id: -1 });
        const nextId = lastProduct ? lastProduct.id + 1 : 1;
        
        const newProduct = new Product({
          id: nextId,
          name: body.name,
          price: parseFloat(body.price),
          image: body.image || "https://via.placeholder.com/200?text=Product",
          rating: parseFloat(body.rating) || 4.0,
          category: body.category || "tools",
          description: body.description || "",
          inStock: body.inStock !== false,
          quantity: body.quantity || 0
        });
        
        await newProduct.save();
        
        return NextResponse.json(
          {
            success: true,
            data: newProduct,
            message: "Product created successfully"
          },
          { status: 201, headers: CORS_HEADERS }
        );
      } catch (mongoError) {
        console.log('MongoDB save failed, falling back to file storage:', mongoError.message);
        // Fallback to file storage
        const products = getProducts();
        const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        
        const newProduct = {
          id: nextId,
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
      }
    } else {
      // No MongoDB, use file storage
      const products = getProducts();
      const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      
      const newProduct = {
        id: nextId,
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
    }
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
