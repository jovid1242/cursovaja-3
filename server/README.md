# Computer Store Backend

Backend server for a computer hardware store built with Node.js, Express, and SQLite.

## Features

- User authentication (registration and login)
- Role-based access control (admin and user roles)
- Product management (CRUD operations for admins)
- Product listing with pagination, search, and category filtering
- Shopping cart functionality
- Order history
- Database seeding with sample data

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
JWT_SECRET=your-super-secret-key-here
NODE_ENV=development
```

3. Start the server:
```bash
npm start
```

4. Seed the database with sample data:
```bash
npm run seed
```

## API Endpoints

### Authentication
- POST `/api/register` - Register a new user
- POST `/api/login` - Login user

### Products
- GET `/api/products` - Get all products with pagination, search, and category filter
- GET `/api/products/:id` - Get product by ID
- POST `/api/products` - Create new product (admin only)
- PUT `/api/products/:id` - Update product (admin only)
- DELETE `/api/products/:id` - Delete product (admin only)

### Cart
- GET `/api/cart` - Get user's cart items
- POST `/api/cart` - Add item to cart

### Orders
- GET `/api/orders` - Get user's order history
- POST `/api/orders` - Create new order from cart

## Development

To run the server in development mode with auto-reload:
```bash
npm run dev
``` 