# Next.js E-Commerce Demo

A comprehensive Next.js application demonstrating different rendering strategies (SSG, ISR, SSR, and CSR) through an e-commerce product catalog.

## 📋 Project Overview

This project showcases mastery of Next.js rendering strategies by implementing four different rendering approaches across different pages:

| Page | Rendering Type | Description |
|------|---------------|-------------|
| `/` (Home) | SSR (Server-Side Rendering) | Fetches fresh data on every request so new products appear immediately |
| `/products/[slug]` | ISR (Incremental Static Regeneration) | Rebuilds automatically every 60 seconds |
| `/dashboard` | SSR (Server-Side Rendering) | Fetches fresh data on every request |
| `/admin` | CSR (Client-Side Rendering) | Interactive client-side data fetching |

## 🌐 Live Deployments

- https://e-commerce-website-two-pi.vercel.app/
- https://e-commerce-website-czjjqse4k-arunbalajis-projects.vercel.app/
- https://e-commerce-website-git-main-arunbalajis-projects.vercel.app/

## 🚀 Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TalantonCore
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
TalantonCore/
├── data/
│   └── products.json          # Product database
├── pages/
│   ├── api/
│   │   └── products/
│   │       ├── index.js       # GET all, POST product
│   │       └── [slug].js      # GET single, PUT, DELETE
│   ├── _app.js               # App wrapper
│   ├── index.js              # Home page (SSR)
│   ├── products/
│   │   └── [slug].js         # Product detail (ISR)
│   ├── dashboard.js          # Dashboard (SSR)
│   └── admin.js              # Admin panel (CSR)
├── styles/
│   └── globals.css           # Global styles
├── package.json
├── next.config.js
└── README.md
```

## 🎯 Features

### Home Page (/)
- **Rendering:** Server-Side Rendering (SSR)
- Product listing with search functionality
- Client-side filtering by name, description, or category
- Links to individual product pages
- Always fresh data (queries MongoDB on every request)

### Product Detail (/products/[slug])
- **Rendering:** Incremental Static Regeneration (ISR)
- Full product information display
- Auto-regenerates every 60 seconds
- Handles dynamic product updates automatically
- Perfect for pages with infrequently changing data

### Dashboard (/dashboard)
- **Rendering:** Server-Side Rendering (SSR)
- Real-time statistics
- Total product count
- Low stock alerts (inventory < 10)
- Total inventory value
- Last update timestamp
- Always shows fresh data

### Admin Panel (/admin)
- **Rendering:** Client-Side Rendering (CSR)
- Add new products
- Edit existing products
- Load product list on demand
- Form validation
- Interactive user experience
- API authentication required

## 🔌 API Routes

### GET `/api/products`
Fetch all products
- **Method:** GET
- **Response:** Array of products

### GET `/api/products/[slug]`
Fetch a single product by slug
- **Method:** GET
- **Parameters:** slug
- **Response:** Single product object

### POST `/api/products`
Create a new product
- **Method:** POST
- **Headers:** `x-api-key: admin-secret-key-123`
- **Body:** Product object
- **Response:** Created product

### PUT `/api/products/[slug]`
Update an existing product
- **Method:** PUT
- **Headers:** `x-api-key: admin-secret-key-123`
- **Body:** Updated product fields
- **Response:** Updated product

## 📊 Data Model

```json
{
  "id": "string",
  "name": "string",
  "slug": "string",
  "description": "string",
  "price": number,
  "category": "string",
  "inventory": number,
  "lastUpdated": "string (ISO date)"
}
```

## 🔒 Authentication

Protected API endpoints (POST, PUT, DELETE) require an API key:
- **Header:** `x-api-key`
- **Value:** `admin-secret-key-123`

Example:
```javascript
fetch('/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'admin-secret-key-123'
  },
  body: JSON.stringify(productData)
});
```

## 🎨 Rendering Strategies Explained

### Static Site Generation (SSG)
- Pages are pre-rendered at **build time**
- Best for: Content that doesn't change often
- Benefits: Extremely fast, great SEO, CDN-friendly
- Used in: Home page

### Incremental Static Regeneration (ISR)
- Pages are statically generated but **rebuilt periodically**
- Best for: Content that changes occasionally
- Benefits: Fast loading + fresh data
- Used in: Product detail pages

### Server-Side Rendering (SSR)
- Pages are rendered **on the server** for each request
- Best for: Dynamic, user-specific, or real-time data
- Benefits: Always fresh data
- Used in: Dashboard

### Client-Side Rendering (CSR)
- Pages load empty, data is fetched in the **browser**
- Best for: Interactive, on-demand content
- Benefits: Highly interactive, efficient bandwidth
- Used in: Admin panel

## 🧪 Testing

### Test API Routes

```bash
# Get all products
curl http://localhost:3000/api/products

# Get single product
curl http://localhost:3000/api/products/laptop-pro-15

# Create product (requires API key)
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: admin-secret-key-123" \
  -d '{
    "name": "Test Product",
    "slug": "test-product",
    "description": "A test product",
    "price": 99.99,
    "category": "Electronics",
    "inventory": 10
  }'
```

### Verify ISR Revalidation

1. Update a product in `data/products.json`
2. Wait 60 seconds
3. Refresh the product detail page
4. Changes should appear automatically

### Verify SSR

1. Update `data/products.json`
2. Refresh `/dashboard`
3. Statistics should update immediately

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Vercel automatically detects Next.js
4. Deploy!

Or use Vercel CLI:
```bash
npm i -g vercel
vercel
```

## 📝 Notes

- Product data is stored in `data/products.json` for simplicity
- For production, consider using a database (MongoDB, PostgreSQL, etc.)
- API authentication uses a simple API key for demonstration
- Production should use proper authentication (JWT, OAuth, etc.)

## 👤 Author

**Student Name**
- Date: January 2024
- Course: Next.js E-Commerce Assignment

## 📄 License

This project is created for educational purposes.

---

## 🔍 Key Learning Outcomes

✅ Understanding of Next.js rendering strategies  
✅ Implementation of SSG, ISR, SSR, and CSR  
✅ API route development with authentication  
✅ Data fetching and state management  
✅ Dynamic routing in Next.js  
✅ Form handling and validation  
✅ Responsive design principles

---

For detailed implementation report, see `REPORT.md`
