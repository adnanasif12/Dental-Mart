import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/app/models/Product';

const ADMIN_KEY = 'admin123'; // Simple auth key

export async function POST(request) {
  try {
    // Get auth key from header
    const authKey = request.headers.get('x-admin-key');
    
    if (authKey !== ADMIN_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Connect to MongoDB
    await dbConnect();

    // Delete all products
    const result = await Product.deleteMany({});
    
    console.log(`Deleted ${result.deletedCount} products from MongoDB`);

    return NextResponse.json(
      {
        success: true,
        message: `Cleared ${result.deletedCount} products from MongoDB. Start fresh now!`,
        deletedCount: result.deletedCount
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error resetting products:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error resetting products',
        error: error.message
      },
      { status: 500 }
    );
  }
}
