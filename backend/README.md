# Neverland Store Backend

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env` and set your MongoDB URI, JWT secret, etc.
3. Start development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login user
- `GET /api/auth/profile` — Get user profile (auth required)
- `GET /api/games` — List all games
- `POST /api/games` — Create game (admin)
- `PUT /api/games/:id` — Update game (admin)
- `DELETE /api/games/:id` — Delete game (admin)
- `GET /api/cart` — Get user cart (auth)
- `POST /api/cart/add` — Add to cart (auth)
- `POST /api/cart/remove` — Remove from cart (auth)
- `POST /api/cart/clear` — Clear cart (auth)
- `POST /api/orders` — Create order (auth)
- `GET /api/orders` — Get user orders (auth)
- `GET /api/orders/all` — Get all orders (admin)
- `PUT /api/orders/:id/status` — Update order status (admin)
- `POST /api/newsletter/subscribe` — Subscribe to newsletter
- `GET /api/faq` — List FAQs
- `POST /api/faq` — Add FAQ (admin)
- `DELETE /api/faq/:id` — Delete FAQ (admin)
- `GET /api/testimonials` — List testimonials
- `POST /api/testimonials` — Add testimonial (auth)
- `DELETE /api/testimonials/:id` — Delete testimonial (admin)

## Folder Structure
- `/models` — Mongoose models
- `/controllers` — Route logic
- `/routes` — Express routers
- `/middlewares` — Auth, admin, etc.
- `/utils` — Utility functions

---

Feel free to extend for more features!
