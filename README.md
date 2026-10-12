# 🛒 ShopKart — MERN Stack E-Commerce Platform

**ShopKart** is a full-stack e-commerce web application built using the MERN stack. It provides a seamless shopping experience with product browsing, wishlist management, cart functionality, secure authentication, and Razorpay payment integration.

🌐 **Live Demo:** https://shop-kart-two-beta.vercel.app  
📦 **GitHub Repository:** https://github.com/AbhayKumarMishra027/ShopKart

## ✨ Features

- **User Authentication** — Customer registration, login, logout, and protected routes.
- **Product Catalog** — Browse products and view detailed product information.
- **Search & Categories** — Find products using search and category filters.
- **Wishlist** — Save favourite products for later.
- **Shopping Cart** — Add, update, and remove products from the cart.
- **Checkout System** — Enter shipping details and initiate checkout.
- **Payment Integration** — Razorpay payment gateway integration with server-side signature verification.
- **Order Management** — View placed orders and track order status.
- **Image Management** — Cloudinary integration for product image storage.
- **Responsive Interface** — A clean shopping experience across supported devices.

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, React Router |
| State Management | Redux |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, HTTP-only cookies |
| Payments | Razorpay |
| Image Storage | Cloudinary |
| API Testing | Postman |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |

## 🏗️ Project Structure

```text
ShopKart/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── vercel.json
│   └── package.json
│
└── README.md
```

## 🚀 Run Locally

### Prerequisites

- Node.js and npm
- MongoDB database
- Cloudinary account
- Razorpay account for payment integration

### 1. Clone the repository

```bash
git clone https://github.com/AbhayKumarMishra027/ShopKart.git
cd ShopKart
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
FRONTEND_URL=http://localhost:5173
```

Start the backend:

```bash
npm start
```

### 3. Configure the frontend

Open a separate terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

## 🔐 Security Notes

- Keep all secrets in environment variables.
- Never commit `.env` files or payment credentials.
- The frontend uses an API base URL to communicate with the backend.
- Payment signatures are verified on the server before an order is marked as paid.
- Protected endpoints require authentication.

## 💳 Payment Integration

ShopKart integrates Razorpay for checkout payments. The backend creates payment orders and verifies payment signatures before updating order and payment statuses.

For local testing, configure valid Razorpay credentials and follow Razorpay's testing guidelines. Never expose the Razorpay secret key in frontend code.

## 🌍 Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB
- **Product Images:** Cloudinary

Live application: https://shop-kart-two-beta.vercel.app

*Note: The backend runs on Render's free instance, which may take some time to respond after a period of inactivity.*

## 🔮 Future Improvements

- Improved cross-browser authentication compatibility
- Stock reservation and inventory management
- Enhanced order tracking
- Automated API regression testing
- Additional product filtering and sorting options

## 👨‍💻 Author

**Abhay Kumar Mishra**

GitHub: [@AbhayKumarMishra027](https://github.com/AbhayKumarMishra027)

---

If you find this project useful, consider giving the repository a ⭐.
