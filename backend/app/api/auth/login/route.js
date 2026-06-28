import { NextResponse } from 'next/server';
import { UserStore } from '../../../lib/UserStore.js';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Use shared UserStore to authenticate
    const user = UserStore.authenticateUser(email, password);
    
    if (user) {
      return NextResponse.json(
        {
          success: true,
          message: 'Login successful',
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          },
          token: 'fake-jwt-token-' + Date.now()
        },
        { status: 200, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Invalid email or password' },
      { status: 401, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
