# Database Setup Guide

This project supports **both JSON file storage and MongoDB**. Choose the option that best fits your needs.

## 🗄️ Storage Options

### Option 1: JSON File Storage (Default) ⭐ Recommended for Demo

**Pros:**
- ✅ No setup required
- ✅ Works immediately
- ✅ Perfect for demo/development
- ✅ No external dependencies
- ✅ Easy to inspect and modify

**Cons:**
- ❌ Not suitable for production scale
- ❌ No concurrent access management
- ❌ Manual backup required

**Setup:**
```bash
# No setup needed! Just run:
npm run dev
```

Data is stored in: `data/products.json`

---

### Option 2: MongoDB (Cloud Atlas) ⭐ Recommended for Production

**Pros:**
- ✅ Scalable and production-ready
- ✅ Handles concurrent access
- ✅ Automatic backups
- ✅ Better for team collaboration
- ✅ Advanced querying capabilities

**Cons:**
- ❌ Requires MongoDB account setup
- ❌ Additional dependency

**Setup Steps:**

#### 1. Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (M0 Free tier is sufficient)

#### 2. Create Database User

1. Go to "Database Access" in the sidebar
2. Click "Add New Database User"
3. Create username and password
4. Give user "Read and write to any database" permission
5. Click "Add User"

#### 3. Whitelist Your IP

1. Go to "Network Access" in the sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for demo)
   - Or add specific IPs for production
4. Click "Confirm"

#### 4. Get Connection String

1. Go to "Clusters" → Click "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

#### 5. Configure Environment Variables

Create a `.env.local` file:

```bash
MONGODB_URI=mongodb+srv://username:yourpassword@cluster0.xxxxx.mongodb.net/nextjs-ecommerce
MONGODB_DB=nextjs-ecommerce
***KEY=admin-secret-key-123
REVALIDATION_SECRET=your-super-secret-key-here
```

#### 6. Install MongoDB Driver

```bash
npm install mongodb
```

#### 7. Run the Application

```bash
npm run dev
```

The app will automatically detect MongoDB and use it instead of JSON file.

---

### Option 3: Local MongoDB

If you prefer running MongoDB locally:

#### 1. Install MongoDB

**Windows:**
- Download from [MongoDB Download](https://www.mongodb.com/try/download/community)
- Run installer with default settings
- MongoDB runs automatically on `mongodb://localhost:27017`

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongod
```

#### 2. Configure Environment

Create `.env.local`:

```bash
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=nextjs-ecommerce
API_KEY=admin-secret-key-123
REVALIDATION_SECRET=your-super-secret-key-here
```

#### 3. Run Application

```bash
npm run dev
```

---

## 🔄 Switching Between Storage Methods

The app automatically chooses the storage method based on environment variables:

1. **No `MONGODB_URI` set** → Uses JSON file
2. **`MONGODB_URI` is set** → Uses MongoDB

To switch:
- **Enable MongoDB:** Add `.env.local` with `MONGODB_URI`
- **Disable MongoDB:** Remove `.env.local` or set `MONGODB_URI=""`

---

## 📊 Data Migration

### Migrating from JSON to MongoDB

The app can work with both simultaneously during migration. MongoDB will be used for writes, but you can manually migrate existing data.

**Manual filling:**

You can import your existing `data/products.json` to MongoDB:

```javascript
// Create a script: migrate-to-mongo.js
const { MongoClient } = require('mongodb');
const fs = require('fs');

async function migrate() {
  const uri = 'YOUR_MONGODB_URI';
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db('nextjs-ecommerce');
    const collection = db.collection('products');
    
    // Read JSON file
    const products = JSON.parse(
      fs.readFileSync('data/products.json', 'utf8')
    );
    
    // Insert products
    await collection.insertMany(products);
    console.log('Migration complete!');
  } finally {
    await client.close();
  }
}

migrate();
```

---

## 🧪 Testing the Database

### Test JSON Storage

```bash
# Ensure no MONGODB_URI is set
npm run dev

# Visit: http://localhost:3000/api/products
# You should see products from data/products.json
```

### Test MongoDB Storage

```bash
# Create .env.local with MONGODB_URI
npm run dev

# Visit: http://localhost:3000/api/products
# You should see products from MongoDB
```

Quality:
- Dump current DB type using `/api/products` JSON

---

## 🎯 Recommendation

**For Assignment Submission:**
- ✅ **Use JSON file** - No setup, easy to demonstrate
- ✅ Mention MongoDB as an option in documentation

**For Production:**
- ✅ **Use MongoDB** - Scalable and reliable
- ✅ Configure proper security settings
- ✅ Set up proper backups

---

## 📝 Notes

- Data structure is identical for both storage methods
- The unified database layer (`lib/db.js`) handles abstraction
- No code changes needed when switching storage methods
- MongoDB connection pooling is handled automatically
- Connection errors fall back gracefully to JSON (if configured)

---

**Current Setup:** JSON File Storage (No additional setup needed!)

To upgrade to MongoDB, just follow the setup steps above. 🚀
