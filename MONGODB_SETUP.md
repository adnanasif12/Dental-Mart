# MongoDB Setup Guide for DentalMart

## Quick Start (Free MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Sign Up" and create a free account
3. Verify your email

### Step 2: Create a Free Cluster
1. Click "Create" → "Build a Cluster"
2. Select **M0 Cluster (Free)** - 512MB storage, perfect for testing
3. Choose a region closest to you
4. Click "Create Cluster"
5. Wait 5-10 minutes for cluster to deploy

### Step 3: Get Your Connection String
1. Click "Connect" button
2. Select "Connect your application"
3. Choose **Node.js** driver
4. Copy the connection string
5. Replace `<password>` with your database password
6. Replace `myFirstDatabase` with `dentalmart`

**Example:**
```
mongodb+srv://username:password@cluster0.abc123.mongodb.net/dentalmart?retryWrites=true&w=majority
```

### Step 4: Set Environment Variable

#### For Local Development:
1. Create `.env.local` in `/backend` folder
2. Add this line:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.abc123.mongodb.net/dentalmart?retryWrites=true&w=majority
```

3. Restart your development server:
```bash
npm run dev
```

#### For Vercel Production:
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click **Settings** → **Environment Variables**
4. Add:
   - **Name:** `MONGODB_URI`
   - **Value:** Your MongoDB connection string
5. Click "Save"
6. Redeploy your project

### Step 5: Automatic Data Seeding
- When you first fetch products, the API automatically seeds initial 20 products to MongoDB
- All products are now persistent across deployments!
- You can add new products via the admin panel

## Features After MongoDB Setup

✅ **Persistent Data** - Products survive server restarts and redeployments
✅ **Scalable** - Handle thousands of products efficiently
✅ **Real-time** - Changes reflected immediately
✅ **Fallback** - Works without MongoDB (uses file storage)
✅ **Production Ready** - Works on Vercel, Heroku, or any platform

## Troubleshooting

**Q: "MONGODB_URI environment variable not found"**
- Make sure you added `.env.local` file in `/backend` folder
- Restart your dev server
- For Vercel, check Settings → Environment Variables

**Q: "Connection refused"**
- Check your MongoDB Atlas IP whitelist
- Go to Atlas → Network Access → Add Current IP
- Or click "Allow Access from Anywhere" for testing

**Q: "Authentication failed"**
- Double-check your username and password in connection string
- Make sure special characters are URL encoded
- Reset your password in MongoDB Atlas if needed

**Q: Still using file storage instead of MongoDB?**
- Check that `.env.local` file exists and has correct URI
- Look at server logs: should show "MongoDB connected successfully"
- If not, it's using file storage fallback (still works!)

## API Endpoints

All endpoints work with both MongoDB and file storage:

```
GET    /api/products              - Get all products
POST   /api/products              - Create new product
GET    /api/products/[id]         - Get single product
PUT    /api/products/[id]         - Update product
DELETE /api/products/[id]         - Delete product
```

## Free MongoDB Limits

**M0 Cluster includes:**
- 512 MB storage
- Unlimited connections
- Unlimited data transfer
- Perfect for development

**Upgrade when you need:**
- M2 Cluster: 2GB ($0.29/day)
- M10+: Larger storage and performance

## Need Help?

- MongoDB Docs: https://docs.mongodb.com/
- Atlas Support: https://support.mongodb.com/
- Mongoose Docs: https://mongoosejs.com/docs/
