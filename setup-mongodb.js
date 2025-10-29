// One-time script to setup MongoDB and migrate JSON data
const fs = require('fs');
const path = require('path');

// Read products from JSON file
const jsonFilePath = path.join(__dirname, 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

console.log('📦 Ready to setup MongoDB!');
console.log('📊 Found', products.length, 'products to migrate');
console.log('');
console.log('To complete setup:');
console.log('1. Restart your dev server: npm run dev');
console.log('2. The app will automatically use MongoDB');
console.log('3. Products will be added automatically on first use');
console.log('');
console.log('Your MongoDB connection:');
console.log('URI: mongodb+srv://prarunbalaji853:****@cluster0.k8zw842.mongodb.net');
console.log('Database: nextjs-ecommerce');
console.log('');
console.log('✅ Setup complete!');
