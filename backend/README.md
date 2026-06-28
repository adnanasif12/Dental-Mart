# Backend Setup Instructions

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

The backend will be available at: **http://localhost:3000**

## API Endpoints

### Products
- `GET /api/products` - Fetch all products
- `POST /api/products` - Create new product

## Project Structure

- `/app/api/` - All API route handlers
- `/app/layout.js` - Root layout
- `/app/page.js` - Home page
- `/app/globals.css` - Global styles
- `next.config.js` - Next.js configuration
- `package.json` - Dependencies and scripts

## Environment Setup

This backend is configured to run on port **3000** and works with the Vite frontend running on port **5173**.

CORS should be configured if frontend and backend are on different domains.
