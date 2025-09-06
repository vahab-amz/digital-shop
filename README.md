# 🛒 Digital Shop (TypeScript)

A **modern e-commerce platform** built with **Next.js 15 + TypeScript**, providing a seamless shopping experience with real-time updates, secure authentication, and an intuitive admin dashboard.

🌐 **Live Demo**: [digital-shop-eta.vercel.app](https://digital-shop-eta.vercel.app/)

---

## ✨ Features

- 🛒 **Shopping Cart** – Add, update, and remove items in real-time
- 👤 **Authentication** – Secure login & signup with [Clerk](https://clerk.com/)
- 🔒 **Role-Based Access Control** – Admin and User roles with separate dashboards
- 🎨 **Modern UI** – Styled with Tailwind CSS + Shadcn UI components
- 📱 **Responsive Design** – Optimized for mobile, tablet, and desktop
- 🖼️ **Image Upload** – Product image management with Prisma + Upload APIs
- 🔄 **Real-Time Updates** – Powered by React Query for smooth data sync
- ✨ **Form Handling** – Robust forms with React Hook Form + Zod validation
- 🚀 **Server-Side Rendering** – Leveraging Next.js App Router
- 🧰 **TypeScript** – Strict typing across pages, components, hooks, and server code

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) + **TypeScript**
- **Database**: PostgreSQL with [Prisma](https://www.prisma.io/) ORM
- **Authentication**: [Clerk](https://clerk.dev/)
- **State Management**: [React Query](https://tanstack.com/query)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## ⚙️ Getting Started

### Prerequisites

- Node.js `>=18`
- PostgreSQL database
- Clerk account for authentication

### Installation

1. **Clone the repository**
   git clone <repository-url>
   cd digital-shop

2. Install dependencies:
   npm install

3. Set up environment variables:

    # Create .env file and add:

    DATABASE_URL="postgresql://user:password@localhost:5432/digital-shop"
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key
   
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
    NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

5. Generate Prisma Client & run migrations:
   npm run generate
   npm run migrate

6. Start the development server:
   npm run dev

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run prod` - Build and start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run studio` - Open Prisma Studio
- `npm run generate` - Generate Prisma client
- `npm run migrate` - Run database migrations

## Project Structure

```
src/
├── app/                   # Next.js app router pages
├── components/           # Reusable components
├── hooks/               # Custom React hooks
├── lib/                # Utility functions and configurations
├── modules/            # Feature-based modules
└── provider/           # React context providers
```

## Screenshots

### Home Page
![Home page](public/screenshots/home-page.png)

### List of products
![List of products](public/screenshots/products.png)

### Product details
![Product details](public/screenshots/product-details.png)

### Admin panel
![Admin panel](public/screenshots/panel-admin-products.png)

### update product
![update product](public/screenshots/update-product.png)

### Add product
![Add product](public/screenshots/add-product.png)


## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
