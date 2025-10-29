# 🗄️ Connect to MongoDB Atlas - Step by Step

## 🎯 Goal: Connect Your App to MongoDB Atlas

### Current Setup:
- ✅ App running on http://localhost:3001
- ✅ Using JSON file storage (`data/products.json`)
- 🆕 Ready to switch to MongoDB Atlas

---

## 📋 Step-by-Step Instructions

### Step 1: Get Your MongoDB Connection String

1. **Go to your MongoDB Atlas Dashboard:**
   - Visit: https://cloud.mongodb.com/v2/685bec9ca44aa05bfc5f3b79#/overview
   
2. **Click "Connect" button** on your cluster

3. **Choose "Connect your application"**

4. **Copy the connection string** - It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

5. **Important:** Replace `<username>` and `<password>` with your actual credentials!

---

### Step 2: Whitelist Your IP Address

1. In MongoDB Atlas, go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. For testing, click **"Allow Access from Anywhere"**
   - This adds `0.0.0.0/0` to your whitelist
4. Click **"Confirm"**

---

### Step 3: Create Environment File

I'll create a `.env.local` file for you with your MongoDB connection.

**But first, I need your connection string!**

Please provide:
1. Your complete MongoDB connection string from Step 1
2. Or just the `<username>` and `<password>` if you want me to help format it

---

## 🔧 What Will Happen

Once you provide the connection string, I will:

1. ✅ Create `.env.local` file with your MongoDB URI
2. ✅ Install MongoDB driver
3. ✅ Update the app to use MongoDB
4. ✅ Restart the server
5. ✅ Test the connection

Your existing data from `products.json` can be imported to MongoDB!

---

## 📝 Example Format

Your `.env.local` file will look like:
```bash
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/nextjs-ecommerce
MONGODB_DB=nextjs-ecommerce
API_KEY=admin-secret-key-123
REVALIDATION_SECRET=your-super-secret-revalidation-key-here
```

---

## 🚀 Next Steps

**Please provide your MongoDB connection string, and I'll set everything up for you!**

Or if you prefer to do it manually, create a file called `.env.local` in the root of your project with the connection string.

---

## ⚠️ Important Notes

- Keep your connection string **SECRET** - it contains your password!
- Don't commit `.env.local` to Git (it's already in .gitignore)
- The app will automatically switch from JSON to MongoDB when it detects `MONGODB_URI`

---

## 🎯 What You Need to Share

Please provide:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

Or just tell me:
- Username: ???
- Password: ???
- Cluster name from the connection string

Then I'll do the rest! 🚀
