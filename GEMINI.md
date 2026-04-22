# Project GEMINI Context: Shop (Next.js 14 Agency/Blog)

This project is a modern web application built with Next.js 14, featuring a blog, contact management, and an administrative dashboard. It uses a robust tech stack including MongoDB for data storage and NextAuth.js for secure authentication.

## Project Overview

- **Framework:** Next.js 14 (App Router)
- **Language:** JavaScript
- **Styling:** Tailwind CSS & CSS Modules
- **Database:** MongoDB (via Mongoose)
- **Authentication:** NextAuth.js (v5 Beta) with Credentials and GitHub providers
- **Validation:** Zod
- **Image Storage:** Cloudinary
- **Architecture:** Layered architecture with separated concerns:
    - `src/app`: Routing and page layouts.
    - `src/components`: Modular UI components.
    - `src/lib`: Business logic, data fetching (`data.js`), server actions (`action.js`), and database models (`models.js`).
    - `src/middleware`: Authentication and rate-limiting logic.

## Building and Running

### Prerequisites
- Node.js (v18 or later)
- MongoDB Connection String
- Cloudinary Credentials (for image uploads)
- NextAuth Secret and GitHub OAuth credentials (for authentication)

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

### Production
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

## Development Conventions

### Data Fetching & Mutations
- **Fetching:** Use the functions defined in `src/lib/data.js`. These are intended for use in Server Components.
- **Mutations:** Use Server Actions located in `src/lib/action.js` for handling form submissions and data updates.
- **Validation:** Always validate incoming data using the Zod schemas in `src/lib/validations/index.js`.

### Authentication & Authorization
- **Middleware:** Authentication is enforced via `src/middleware.js`. Admin-only routes are restricted in `src/lib/auth.config.js`.
- **Session Handling:** Use `auth()` (from `src/lib/auth.js`) in Server Components and `useSession()` in Client Components.

### Styling
- Use **Tailwind CSS** for layout and general styling.
- Use **CSS Modules** (`*.module.css`) for component-specific styles where complex scoping is needed.

### Database Models
- **User:** Handles authentication, roles (Admin/User), and profile info.
- **Post:** Blog content, slug-based routing, and author association.
- **Inquiry:** Contact form submissions.

### Image Handling
- Images are uploaded to **Cloudinary** via the `addPost` server action.
- Static assets are stored in the `public/` directory.

## Key Features
- **Blog:** Full CRUD functionality with slug-based SEO-friendly URLs.
- **Admin Dashboard:** Manage users, posts, and view inquiries.
- **Contact System:** Public contact form with backend inquiry storage.
- **Authentication:** Dual-provider support (Credentials & GitHub).
- **Responsive Design:** Optimized for mobile and desktop views.
