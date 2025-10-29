# Quick: Create .env.local File

## 🔧 Create This File:

1. **Create a new file** in your project root called `.env.local`

2. **Add this content** (replace with YOUR connection string):

```bash
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/nextjs-ecommerce
MONGODB_DB=nextjs-ecommerce
API_KEY=admin-secret-key-123
REVALIDATION_SECRET=your-super-secret-key
```

3. **Save the file**

4. **Run:** `npm install mongodb`

5. **Restart:** `npm run dev`

---

## ✅ Done!

Your app will now use MongoDB instead of the JSON file!
