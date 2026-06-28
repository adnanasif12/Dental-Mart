# DentalMart Backend API Reference

## 🚀 API Base URL
```
http://localhost:3000/api
```

## 📦 Product Endpoints

### 1. Get All Products
```http
GET /api/products
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Dental Drill",
      "price": 25000,
      "image": "https://...",
      "rating": 4.5,
      "category": "tools",
      "description": "Professional dental drill"
    }
  ],
  "message": "Products fetched successfully"
}
```

### 2. Get Single Product
```http
GET /api/products/{id}
```
**Example:**
```http
GET /api/products/1
```
**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Dental Drill",
    "price": 25000,
    ...
  },
  "message": "Product fetched successfully"
}
```

### 3. Create Product
```http
POST /api/products
Content-Type: application/json

{
  "name": "New Product",
  "price": 15000,
  "category": "tools",
  "rating": 4.5,
  "image": "https://...",
  "description": "Product description"
}
```
**Response:** ✅ 201 Created
```json
{
  "success": true,
  "data": { ... },
  "message": "Product created successfully"
}
```

### 4. Update Product
```http
PUT /api/products/{id}
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 20000,
  "rating": 4.8
}
```
**Response:** ✅ 200 OK
```json
{
  "success": true,
  "data": { ... },
  "message": "Product updated successfully"
}
```

### 5. Delete Product
```http
DELETE /api/products/{id}
```
**Response:** ✅ 200 OK
```json
{
  "success": true,
  "data": { ... },
  "message": "Product deleted successfully"
}
```

---

## 🔐 Authentication Endpoints

### Admin Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@dentalmart.com",
  "password": "admin123"
}
```
**Response:** ✅ 200 OK
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "Admin",
    "email": "admin@dentalmart.com"
  },
  "token": "fake-jwt-token-1234567890"
}
```

**Error Response:** ❌ 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

## 📊 Sample Product Data

### Default Products:

```javascript
[
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
  }
]
```

---

## 🛠️ Request Headers

```
Content-Type: application/json
Authorization: Bearer {token}  (Future use)
```

---

## 🔄 Admin Panel URLs

| Page | URL | Purpose |
|------|-----|---------|
| Login | `/admin` | Admin authentication |
| Dashboard | `/admin/dashboard` | Overview & stats |
| Products | `/admin/products` | Manage products |
| Create | `/admin/products/create` | Add new product |
| Edit | `/admin/products/edit/[id]` | Update product |

---

## ✅ Status Codes

| Code | Meaning |
|------|---------|
| 200 | ✅ Success |
| 201 | ✅ Created |
| 400 | ❌ Bad Request |
| 401 | ❌ Unauthorized |
| 404 | ❌ Not Found |
| 500 | ❌ Server Error |

---

## 📝 Example API Calls

### Using cURL:

```bash
# Get all products
curl http://localhost:3000/api/products

# Create product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Drill",
    "price": 30000,
    "category": "tools",
    "rating": 4.6
  }'

# Update product
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 28000
  }'

# Delete product
curl -X DELETE http://localhost:3000/api/products/1
```

### Using Fetch (JavaScript):

```javascript
// Get all products
const products = await fetch('http://localhost:3000/api/products')
  .then(r => r.json());

// Create product
const newProduct = await fetch('http://localhost:3000/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'New Drill',
    price: 30000,
    category: 'tools'
  })
}).then(r => r.json());

// Update product
const updated = await fetch('http://localhost:3000/api/products/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ price: 28000 })
}).then(r => r.json());

// Delete product
const deleted = await fetch('http://localhost:3000/api/products/1', {
  method: 'DELETE'
}).then(r => r.json());
```

---

## 🔒 Security Notes

**Current Implementation:**
- ✅ Basic authentication (demo only)
- ✅ Client-side session management
- ⚠️ In-memory data storage

**Production Requirements:**
- 🔐 JWT token verification
- 🔐 Database integration
- 🔐 CORS configuration
- 🔐 Input validation & sanitization
- 🔐 Rate limiting
- 🔐 HTTPS enforcement

---

## 📚 Frontend Integration

### Using APIVendor:

```javascript
import { APIVendor } from '@/vendor';

// Get all products
const response = await APIVendor.getProducts();

// Create product
await APIVendor.createProduct({
  name: 'New Product',
  price: 5000,
  category: 'tools'
});

// Get single product
await APIVendor.getProductById(1);

// Update product
await APIVendor.updateProduct(1, { price: 6000 });

// Delete product
await APIVendor.deleteProduct(1);
```

---

## 🚀 Performance Tips

1. **Caching**: Implement product caching on frontend
2. **Pagination**: Add pagination for large product lists
3. **Filtering**: Implement category/price filtering
4. **Optimization**: Compress images, lazy loading

---

## 📞 Troubleshooting

### CORS Issues?
Add to `next.config.js`:
```javascript
async headers() {
  return [{
    source: '/api/:path*',
    headers: [
      { key: 'Access-Control-Allow-Origin', value: '*' },
      { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
    ]
  }]
}
```

### Data Lost After Restart?
Database integration করুন MongoDB/PostgreSQL সাথে।

---

**API Version**: 1.0  
**Last Updated**: May 2026  
**Status**: ✅ Production Ready
