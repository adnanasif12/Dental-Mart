# DentalMart Project Setup

## 📁 Project Structure

```
dentalmart/
├── frontend/  (Vite + React)
│   ├── src/
│   │   ├── vendor/          # API vendors for backend communication
│   │   │   ├── api.js       # Products API
│   │   │   ├── auth.js      # Authentication API
│   │   │   ├── cart.js      # Cart API
│   │   │   └── index.js     # Vendor exports
│   │   ├── components/      # React components
│   │   ├── styles/          # CSS files
│   │   ├── data/            # Static data
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/  (Next.js)
│   ├── app/
│   │   ├── api/             # API routes
│   │   │   └── products/
│   │   │       └── route.js
│   │   ├── layout.js
│   │   ├── page.js
│   │   └── globals.css
│   ├── package.json
│   ├── next.config.js
│   └── .gitignore
│
├── package.json             # Root package
└── README.md
```

## 🚀 Running the Project

### Terminal 1 - Frontend (Vite)
```bash
npm run dev
# Runs on http://localhost:5173/
```

### Terminal 2 - Backend (Next.js)
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:3000/
```

## 📡 API Communication

### Using Vendor Classes in Components

```javascript
import { APIVendor, AuthVendor, CartVendor } from '@/vendor';

// Get all products
const products = await APIVendor.getProducts();

// Add to cart
await CartVendor.addToCart(productId, quantity);

// Login
await AuthVendor.login(email, password);
```

## 🔌 Environment Variables

Create `.env.local` in frontend root:
```
REACT_APP_API_URL=http://localhost:3000/api
```

## 📦 Available API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Authentication (Backend Ready)
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Cart (Backend Ready)
- `GET /api/cart` - Get cart
- `POST /api/cart/add` - Add to cart
- `DELETE /api/cart/remove/[id]` - Remove from cart

## ✅ Next Steps

1. Install backend dependencies:
   ```bash
   cd backend && npm install
   ```

2. Start both servers in separate terminals

3. Use vendor classes to call API endpoints from frontend

4. Implement remaining API endpoints in backend as needed
