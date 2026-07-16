# Restaurant POS — New Order Module

A frontend-only Restaurant POS built for the Divergent Technologies frontend assessment. Lets a user browse a product menu, search and filter it, view product details, manage a cart, apply coupons, and place an order — all backed by the public [DummyJSON](https://dummyjson.com) API.

## Tech stack

- React (Vite)
- JavaScript
- React Router (`react-router-dom`)
- Tailwind CSS
- shadcn/ui
- Axios

No custom backend — all data comes directly from `https://dummyjson.com`.

## Features implemented

- Product grid with image, name, price, rating, stock, and category
- Debounced search (300ms) by product name
- Category filter (native `<select>`, populated from `GET /products/categories`)
- Product details page (`GET /products/{id}`)
- Cart: add / remove / update quantity, persisted to `localStorage`
- Order summary: subtotal, VAT (5%), coupon discount, grand total
- Coupon support: `SAVE10` (10% off), `SAVE20` (20% off), `WELCOME` (flat $5 off)
- Checkout confirmation modal before order submission
- Order submission via `POST /carts/add`
- Loading, empty, and error states across product grid, search, and cart
- Responsive layout (mobile / tablet / desktop)
- Dark mode toggle (bonus)

## Not implemented

- Infinite scroll
- Virtualized list
- Wishlist
- Keyboard shortcuts
- Unit tests

Left out due to the assessment's time constraint — prioritized the required functional list over bonus features.

## Assumptions

The brief didn't specify exact coupon amounts or VAT rate, so I made the following calls, documented here and in `lib/cartUtils.js`:

- VAT rate: 5% of subtotal
- `SAVE10` → 10% off subtotal
- `SAVE20` → 20% off subtotal
- `WELCOME` → flat $5 off subtotal (capped so it can't exceed the subtotal)
- A non-empty search query takes priority over the category filter, rather than combining both DummyJSON's search and category-filter endpoints are separate, so combining them would need extra client-side filtering that felt out of scope

## Project structure

```
src/
  components/
    ui/              → shadcn primitives
    product/         → ProductCard
    cart/            → CartItemRow, OrderSummary, CheckoutModal
    Navbar.jsx
    Hero.jsx
    mode-toggle.jsx
  context/
    CartContext.jsx
    ThemeContext.jsx
  hooks/
    useCart.js
    useTheme.js
    UseDebounce.js
  lib/
    api.js           → all API calls live here
    cartUtils.js      → subtotal / VAT / coupon calculations
  pages/
    Home.jsx
    Cart.jsx
    ProductDetails.jsx
```

## Setup instructions

1. Clone the repo:
   ```
   git clone https://github.com/alfazsozib/pos-system.git
   cd pos-system
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Run the dev server:
   ```
   npm run dev
   ```
4. Open the URL shown in the terminal (usually `http://localhost:5173`).

No environment variables are required — the app calls `https://dummyjson.com` directly.
